import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Platform, PermissionsAndroid, View, Button, StyleSheet, SafeAreaView, ScrollView, FlatList, StatusBar, KeyboardAvoidingView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import BLEPeripheral from 'react-native-ble-peripheral';
import Peripheral, { Service, Characteristic } from 'react-native-peripheral';
import { Mutex } from 'async-mutex';
import Icon from '../../node_modules/react-native-vector-icons/Entypo';
import Toast from 'react-native-toast-message';

import * as userActions from '../../store/actions/user';
import { handleDevice } from '../../helpers/scanHelper';
import { generateTempID, PARLIAMENT_SERVICE_UUID } from '../../helpers/uuidHelper';
import CustomButton from '../../components/CustomButton';
import LCDView from '../../components/LCDView';
import NeumorphView from '../../components/NeumorphView';
import { offWhite } from '../../constants/colors';
import BackgroundService from 'react-native-background-actions'
import { startAllBackground, stopAllBackground } from '../../helpers/backgroundHelper';
import LCDTextView from '../../components/LCDTextView';
import ScannedDevice from '../../components/ScannedDevice';

// const bleManager = new BleManager();
const bleManager = new BleManager({
    restoreStateIdentifier: 'BleInTheBackground',
    restoreStateFunction: restoredState => {
        if (restoredState == null) {
            // BleManager was constructed for the first time.
        } else {
            // BleManager was restored. Check `restoredState.connectedPeripherals` property.
        }
    },
});

/**
 * The HomeScreen component houses the UI components 
 * and handler functions for starting and stopping
 * contact tracing.
 * @example
 * return (
 *   <HomeScreen />
 * )
 */

const HomeScreen = () => {
    const [isContactTracingOn, setIsContactTracingOn] = useState(false);
    const contactedIDs = useSelector(state => state.user.contactedIDs);
    const dispatch = useDispatch();
    const [tempID, setTempID] = useState(null);

    /**
     * Begin scanning for devices and handle each device
     * @return  {Promise<void>}  
     * @example
     * await handleStartForegroundScanning()     
     */
    const handleStartForegroundScanning = async () => {
        const mutex = new Mutex();
        try {
            bleManager.startDeviceScan(
                Platform.OS == 'ios' ? [PARLIAMENT_SERVICE_UUID] : null, //[PARLIAMENT_SERVICE_UUID]
                { allowDuplicates: true },
                async (error, device) => {
                    await mutex.runExclusive(async () => {
                        await handleDevice(error, device, dispatch);
                    });
                }
            )
        } catch (error) {
            console.log('HomeScreen.js/handleStartForegroundScanning() - (error) bleManager not start scanning for devices', { error })
        }
        console.log("HomeScreen.js/handleStartForegroundScanning() - Started Scanning on ", Platform.OS)
    }

    /**
     * Stops the BLE Manager from scanning for devices.
     * @return {void} calls the stopDeviceScan() function on bleManager     
     */
    const handleStopForegroundScanning = () => {
        bleManager.stopDeviceScan();
        console.log("HomeScreen.js/handleStopForegroundScanning() - Stopped Scanning on ", Platform.OS)
    }

    /**
     * Start advertising the contact tracing bluetooth service uuid and 
     * the user temporary id characteristic uuid.
     * @return {Promise<void>} starts bluetooth advertising with peripheral component
     */
    const handleStartForegroundAdvertising = async () => {
        if (Platform.OS === 'android') {
            if (BLEPeripheral.isAdvertising()) {
                BLEPeripheral.stop()
            }

            BLEPeripheral.setName('');
            // The contact tracing service UUID
            BLEPeripheral.addService(PARLIAMENT_SERVICE_UUID, true);
            // The 
            //BLEPeripheral.addService('00001200-0000-1000-8000-00805f9b34fa', true);
            const tempID = generateTempID();
            setTempID(tempID);
            dispatch(userActions.storeTempID(tempID));
            BLEPeripheral.addCharacteristicToService(PARLIAMENT_SERVICE_UUID, tempID, 16 | 1, 8)

            BLEPeripheral.start()
                .then(res => {
                    console.log("HomeScreen.js/handleStartForegroundAdvertising() - Started Advertising on Android: ", tempID)
                }).catch(error => {
                    console.log(error)
                })
        } else {
            //if (Peripheral.isAdvertising()) {
            //    await Peripheral.stopAdvertising()
            //}
            const tempID = generateTempID();
            setTempID(tempID);
            dispatch(userActions.storeTempID(tempID));
            // add tempID to redux state
            await dispatch(userActions.storeTempID(tempID));
            const ch = new Characteristic({
                uuid: tempID,
                value: '', // Base64-encoded string
                properties: ['read'],
                permissions: ['readable'],
            })
            const service = new Service({
                uuid: PARLIAMENT_SERVICE_UUID,
                characteristics: [ch],
            })

            // register GATT services that your device provides
            await Peripheral.addService(service)

            // start advertising to make your device discoverable
            // the contactTracingServiceUUID is only visible for other iOS devices and not for Android devices
            await Peripheral.startAdvertising({
                name: 'PiOS',
                serviceUuids: [PARLIAMENT_SERVICE_UUID, tempID],
            })
            console.log("HomeScreen.js/handleStartForegroundAdvertising() - Started Advertising on iOS: ", tempID)

        }
    }

    /**
     * Stops advertising device.
     * @return  {Promise<void>} Stops the peripheral component from advertising        
     */
    const handleStopForegroundAdvertising = async () => {
        if (Platform.OS === 'android') {
            await BLEPeripheral.stop()
            setTempID("");
        } else {
            if (Peripheral.isAdvertising()) {
                await Peripheral.stopAdvertising();
                setTempID("");
            }
        }
    }


    const backgroundOptions = {
        taskName: 'Parliament',
        taskTitle: 'BLE Background Detection',
        taskDesc: 'Running BLE scanning and advertising in the device background',
        // I think this has to be in the android/app/src/main/res folder
        taskIcon: {
            name: 'parliament_owl',
            type: 'mipmap',
        },
        color: '#ffffff',
        parameters: {
            delay: 1000,
        },
    };

    /**
     * Executes Scanning and Advertising activities with a promise.
     * This is needed for Android background tasks.
     * @return  {Promise<void>}  
     * @example
     * await BackgroundService.start(veryIntensiveTask, backgroundOptions);  
     */
    const veryIntensiveTask = async () => {
        await new Promise(async (resolve) => {
            handleStartForegroundBLE();
            console.log("HomeScreen.js/veryIntensiveTask() - Background Scanning & Advertising Tasks Started");
        });
    };

    /**
     * Starts Scanning and Advertising activities
     * @return  {void}  
     * @example
     * handleStartForegroundBLE();    
     */
    const handleStartForegroundBLE = async () => {
        handleStartForegroundAdvertising();
        handleStartForegroundScanning();
    }

    /**
     * Stops Scanning and Advertising activities
     * @return  {void}  
     * @example
     * handleStopForegroundBLE();    
     */
    const handleStopForegroundBLE = async () => {
        handleStopForegroundAdvertising();
        handleStopForegroundScanning();
    }

    /**
     * Handles bluetooth radio 'on' button.
     * This starts the ios foreground advertising
     * and Android background advertising.
     * It prohibits user from user starting 
     * advertising and scanning if they hasn't been stopped yet.
     * @return  {void}  
     * @example
     * <Button title="start BLE" onPress={handleStartBackgroundBLE} />
     */
    const handleStartBackgroundBLE = async () => {
        if (!isContactTracingOn) {
            await BackgroundService.start(veryIntensiveTask, backgroundOptions);
            console.log("HomeScreen.js/handleStartBackgroundBLE() - Background Scanning & Advertising Tasks Started");
            setIsContactTracingOn(true);
            Toast.show({
                text1: 'Bluetooth Status',
                text2: 'Started scanning and advertising',
                visibilityTime: 2000
            });
        } else {
            Toast.show({
                text1: 'Bluetooth Status',
                text2: 'Bluetooth is already on',
                type: 'info',
                visibilityTime: 1500
            });
        }
    }
    
    /**
     * Handles bluetooth radio 'off' button.
     * This stops the ios foreground advertising
     * and Android background advertising.
     * It prohibits user from user stopping 
     * advertising and scanning if they hasn't been started yet.
     * @return  {void}  
     * @example
     * <Button title="stop BLE" onPress={handleStopBackgroundBLE} />
     */
    const handleStopBackgroundBLE = async () => {
        if (isContactTracingOn) {
            await BackgroundService.stop();
            handleStopForegroundBLE();
            console.log("HomeScreen.js/handleStopBackgroundBLE() - Background Scanning & Advertising Tasks Stopped");
            setIsContactTracingOn(false);
            Toast.show({
                text1: 'Bluetooth Status',
                text2: 'Stopped scanning and advertising',
                visibilityTime: 2000
            });
        } else {
            Toast.show({
                text1: 'Bluetooth Status',
                text2: 'Bluetooth is not on',
                type: 'info',
                visibilityTime: 1500
            });
        }
    }

    useEffect(() => {
        if (Platform.OS === 'android') {
            // (TODO) lets use require variable to be true for device scanning or advertising to execute
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permission Localization Bluetooth',
                    message: 'Requirement for Bluetooth',
                    buttonNeutral: 'Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
        }
    }, []);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS == "ios" ? "padding" : "height"}
            style={{ flex: 1 }}
        >
            <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                <SafeAreaView style={styles.container}>
                    <StatusBar barStyle='dark-content' />
                    <View style={{ width: '70%', justifyContent: 'center' }} >
                        <View style={{ justifyContent: 'space-between', alignItems: 'center', paddingBottom: '6%' }}>
                            <Text style={{ ...styles.label, fontSize: 28 }}>Parliament</Text>
                        </View>
                        <NeumorphView
                            style={styles.linearGradient}
                        >
                            <LCDView>
                                <View style={{ flexBasis: 'auto', height: 100, paddingHorizontal: '2%' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 2, borderBottomWidth: 1 }}>
                                        <Text style={styles.lcdLabel}>scanned device</Text>
                                        <Text style={styles.lcdLabel}>signal <Icon name="bar-graph" size={12} color="black" /></Text>
                                    </View>
                                    <ScrollView keyboardShouldPersistTaps='never'>
                                        {contactedIDs.map(function (data) {
                                            return (
                                                <ScannedDevice key={data.tempID} tempID={data.tempID.substring(data.tempID.length - 12)} averageRssi={data.averageRssi} />
                                            )
                                        })}
                                    </ScrollView>
                                </View>
                            </LCDView>
                        </NeumorphView>
                        <View style={{ padding: 15 }} />
                        <View style={{ justifyContent: 'space-between', alignItems: 'center' }}>
                            <Text style={styles.label}>bluetooth radio</Text>
                        </View>
                        <View style={{ padding: 5 }} />
                        <NeumorphView
                            style={styles.linearGradient}
                        >
                            <LCDView>
                                <View style={{ flexBasis: 'auto', paddingHorizontal: '4%', height: Platform.OS === 'android' ? 45 : null, justifyContent: 'center' }}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 2, borderBottomWidth: 1, marginBottom: Platform.OS === 'android' ? null : 5, marginTop: Platform.OS === 'android' ? 15 : null }}>
                                        <Text style={styles.lcdLabel}>status</Text>
                                        <Text style={styles.lcdLabel}>device id</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Platform.OS === 'android' ? -7 : null }}>
                                        <Icon name="signal" size={14} color={isContactTracingOn ? "black" : "grey"} />
                                        <LCDTextView
                                            placeholder={tempID ? tempID.substring(tempID.length - 12) : Platform.OS == 'android' ? "- - - - - - - - - - - -" : "------------"}
                                            value={tempID ? tempID.substring(tempID.length - 12) : ""}
                                        />
                                    </View>
                                </View>
                            </LCDView>
                        </NeumorphView>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center', paddingTop: '6%' }}>
                            <View style={{ margin: 10 }}>
                                <CustomButton title='on' handlePress={handleStartBackgroundBLE} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <CustomButton title='off' handlePress={handleStopBackgroundBLE} />
                            </View>
                        </View>
                    </View>
                </SafeAreaView>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        backgroundColor: offWhite,
        alignItems: 'center',
        justifyContent: 'center'
    },
    label: {
        fontSize: 18,
        fontWeight: '500'
    },
    linearGradient: {
        paddingVertical: 2,
        paddingHorizontal: 1,
        borderRadius: 12,
    },
    lcdLabel: {
        fontSize: 16,
    },
});

export default HomeScreen;