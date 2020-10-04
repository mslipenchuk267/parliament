import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Text, Platform, PermissionsAndroid, View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import BLEPeripheral from 'react-native-ble-peripheral';
import Peripheral, { Service, Characteristic } from 'react-native-peripheral';
import { Mutex } from 'async-mutex';

import * as userActions from '../../store/actions/user';
import { handleDevice } from '../../helpers/scanHelper';

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

    const dispatch = useDispatch();

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
                null, //['00001200-0000-1000-8000-00805f9b34fb']
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
            BLEPeripheral.addService('00001200-0000-1000-8000-00805f9b34fb', true);
            // The 
            //BLEPeripheral.addService('00001200-0000-1000-8000-00805f9b34fa', true);
            BLEPeripheral.addCharacteristicToService('00001200-0000-1000-8000-00805f9b34fb', '00001200-0000-1000-8000-00805f9b34fa', 16 | 1, 8)

            BLEPeripheral.start()
                .then(res => {
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
        } else {
            //if (Peripheral.isAdvertising()) {
            //    await Peripheral.stopAdvertising()
            //}

            const ch = new Characteristic({
                uuid: '00001100-0000-1000-8000-00505f8b34fc',
                value: '', // Base64-encoded string
                properties: ['read'],
                permissions: ['readable'],
            })
            const service = new Service({
                uuid: '00001200-0000-1000-8000-00805f9b34fb',
                characteristics: [ch],
            })

            // register GATT services that your device provides
            await Peripheral.addService(service)

            // start advertising to make your device discoverable
            // the contactTracingServiceUUID is only visible for other iOS devices and not for Android devices
            await Peripheral.startAdvertising({
                name: 'PiOS',
                serviceUuids: ['00001200-0000-1000-8000-00805f9b34fb', '00001100-0000-1000-8000-00505f8b34fc'],
            })
            console.log("Started Advertising on iOS")

        }
    }

    /**
     * Stops advertising device.
     * @return  {Promise<void>} Stops the peripheral component from advertising        
     */
    const handleStopAdvertising = async () => {
        if (Platform.OS === 'android') {
            await BLEPeripheral.stop()
        } else {
            if (Peripheral.isAdvertising()) {
                return await Peripheral.stopAdvertising();
            }
        }
    }

    useEffect(() => {
        if (Platform.OS === 'android') {
            // (TODO) lets use require variable to be true for device scanning or advertising to execute
            const granted = PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    title: 'Permission Localisation Bluetooth',
                    message: 'Requirement for Bluetooth',
                    buttonNeutral: 'Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                }
            );
        }
    }, []);

    return (
        <SafeAreaView style={styles.container} >
            <View>
                <Button
                    title='Start Contact Tracing'
                    onPress={handleStartContactTracing}
                />
            </View>
            <View>
                <Button
                    title='Stop Contact Tracing'
                    onPress={handleStopContactTracing}
                />
            </View>
            <View>
                <Button
                    title='Start Advertising'
                    onPress={handleStartAdvertising}
                />
            </View>
            <View>
                <Button
                    title='Stop Advertising'
                    onPress={handleStopAdvertising}
                />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default HomeScreen;
