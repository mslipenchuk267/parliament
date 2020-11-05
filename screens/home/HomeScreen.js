import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, Platform, PermissionsAndroid, View, Button, StyleSheet, SafeAreaView, ScrollView, FlatList, StatusBar } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import BLEPeripheral from 'react-native-ble-peripheral';
import Peripheral, { Service, Characteristic } from 'react-native-peripheral';
import { Mutex } from 'async-mutex';
import Icon from '../../node_modules/react-native-vector-icons/Entypo';

import * as userActions from '../../store/actions/user';
import { handleDevice } from '../../helpers/scanHelper';
import { generateTempID, PARLIAMENT_SERVICE_UUID } from '../../helpers/uuidHelper';
import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import CustomTextView from '../../components/CustomTextView';
import LCDView from '../../components/LCDView';
import NeumorphView from '../../components/NeumorphView';
import { offWhite } from '../../constants/colors';
import BackgroundService from 'react-native-background-actions'
import { startAllBackground, stopAllBackground } from '../../helpers/backgroundHelper';

const bleManager = new BleManager();

// const bleManager = new BleManager({
//     restoreStateIdentifier: 'BleInTheBackground',
//     restoreStateFunction: restoredState => {
//       if (restoredState == null) {
//         // BleManager was constructed for the first time.
//       } else {
//         // BleManager was restored. Check `restoredState.connectedPeripherals` property.
//       }
//     },
//   });

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
    const contactedIDs = useSelector(state => state.user.contactedIDs);
    const dispatch = useDispatch();
    const [tempID, setTempID] = useState(null);

    /**
     * Begin scanning for devices and handle each device
     * @return  {Promise<void>}  
     * @example
     * await handleStartContactTracing()     
     */
    const handleStartContactTracing = async () => {
        const mutex = new Mutex();
        try {
            bleManager.startDeviceScan(
                null, //[PARLIAMENT_SERVICE_UUID]
                { allowDuplicates: true },
                async (error, device) => {
                    await mutex.runExclusive(async () => {
                        await handleDevice(error, device, dispatch, bleManager);
                    });
                }
            )
        } catch (error) {
            console.log('bleManager not start scanning for devices', { error })
        }
        console.log("Start Scanning on ", Platform.OS)
    }

    /**
     * Stops the BLE Manager from scanning for devices.
     * @return {void} calls the stopDeviceScan() function on bleManager     
     */
    const handleStopContactTracing = () => {
        bleManager.stopDeviceScan();
    }

    /**
     * Start advertising the contact tracing bluetooth service uuid and 
     * the user temporary id characteristic uuid.
     * @return {Promise<void>} starts bluetooth advertising with peripheral component
     */
    const handleStartAdvertising = async () => {
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
                    console.log("Started Advertising on Android: ", tempID)
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
            console.log("Started Advertising on iOS: ", tempID)

        }
    }

    /**
     * Stops advertising device.
     * @return  {Promise<void>} Stops the peripheral component from advertising        
     */
    const handleStopAdvertising = async () => {
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

    const veryIntensiveTask = async () => {
        const mutex = new Mutex();
        try {
            bleManager.startDeviceScan(
                null, //[PARLIAMENT_SERVICE_UUID]
                { allowDuplicates: true },
                async (error, device) => {
                    await mutex.runExclusive(async () => {
                        await handleDevice(error, device, dispatch, bleManager);
                    });
                }
            )
        } catch (error) {
            console.log('bleManager not start scanning for devices', { error })
        }
        console.log("Start Scanning on ", Platform.OS)

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
            BLEPeripheral.addCharacteristicToService(PARLIAMENT_SERVICE_UUID, tempID, 16 | 1, 8)

            BLEPeripheral.start()
                .then(res => {
                    console.log("Started Advertising on Android: ", tempID)
                }).catch(error => {
                    console.log(error)
                })
        } else {
            //if (Peripheral.isAdvertising()) {
            //    await Peripheral.stopAdvertising()
            //}
            const tempID = generateTempID();
            setTempID(tempID);
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
            console.log("Started Advertising on iOS: ", tempID)

        }

        console.log("Background Tasks Started");
    };

    const handleStartBLE = async () => {
        await BackgroundService.start(veryIntensiveTask, backgroundOptions);
    }

    const handleStopBLE = async () => {
        bleManager.stopDeviceScan();

        if (Platform.OS === 'android') {
            await BLEPeripheral.stop()
            setTempID("None");
        } else {
            if (Peripheral.isAdvertising()) {
                return await Peripheral.stopAdvertising();
                setTempID("None");
            }
        }
        await BackgroundService.stop();
        console.log("Background Tasks Stopped");

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
        <SafeAreaView style={{backgroundColor: offWhite}}>
            <ScrollView
                style={styles.container}
                contentContainerStyle={{
                    alignItems: 'center',
                    backgroundColor: offWhite,
                }}
            >
                <StatusBar barStyle='dark-content' />
                <View style={{ marginTop: 30 }} >
                    <NeumorphView
                        style={styles.linearGradient}
                    >
                        <LCDView>
                            <View style={{ flexBasis: 'auto', height: 130, paddingHorizontal: '2%' }}>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingBottom: 2, borderBottomWidth: 1 }}>
                                    <Text style={styles.lcdLabel}>scanned device</Text>
                                    <Text style={styles.lcdLabel}>signal <Icon name="signal" size={14} color="black" /></Text>
                                </View>
                                <FlatList
                                    data={contactedIDs}
                                    keyExtractor={(item) => item.tempID}
                                    renderItem={({ item }) => (
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 3 }} >
                                            <Text>{item.tempID.substring(item.tempID.length - 12)}</Text>
                                            <Text>{item.averageRssi}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        </LCDView>
                    </NeumorphView>
                    <View style={{ padding: 20 }} />
                    <CustomTextView
                        placeholder={tempID ? tempID.substring(tempID.length - 12) : "Not Advertising"}
                        value={tempID ? tempID.substring(tempID.length - 12) : ""}
                    />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 30 }}>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.label}>advertising</Text>
                            <View style={{ margin: 10 }}>
                                <CustomButton title='Start' handlePress={handleStartAdvertising} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <CustomButton title='Stop' handlePress={handleStopAdvertising} />
                            </View>
                        </View>
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.label}>scanning</Text>
                            <View style={{ margin: 10 }}>
                                <CustomButton title='Start' handlePress={handleStartContactTracing} />
                            </View>
                            <View style={{ margin: 10 }}>
                                <CustomButton title='Stop' handlePress={handleStopContactTracing} />
                            </View>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        height: '100%',
        backgroundColor: offWhite,
    },
    label: {
        fontSize: 18,
        fontWeight: '500'
    },
    linearGradient: {
        paddingVertical: 1,
        paddingHorizontal: 1,
        borderRadius: 15,
        minHeight: 100,
    },
    lcdLabel: {
        fontSize: 16,
    },
});

export default HomeScreen;
