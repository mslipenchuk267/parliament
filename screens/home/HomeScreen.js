import React, { useEffect } from 'react';
import { Text, Platform, PermissionsAndroid, View, Button, StyleSheet, SafeAreaView } from 'react-native';
import { BleManager } from 'react-native-ble-plx';
import BLEPeripheral from 'react-native-ble-peripheral';
import Peripheral, { Service, Characteristic } from 'react-native-peripheral';

const bleManager = new BleManager();

/**
 * HomeScreen Component.
 *
 * @example
 * return (
 *   <HomeScreen />
 * )
 */
const HomeScreen = () => {

    /**
     * Begin scanning for devices and handle each device
     * 
     * @function
     * @return  {Promise<void>}  
     * 
     * @example
     * await handleStartContactTracing()     
     */
    const handleStartContactTracing = async () => {
        try {
            bleManager.startDeviceScan(
                null, //['00001200-0000-1000-8000-00805f9b34fb']
                { allowDuplicates: false },
                async (error, device) => {
                    // get services
                    let services = device.serviceUUIDs
                    // check if there are services being advertised
                    if (services && services.includes('00001200-0000-1000-8000-00805f9b34fb')) {
                        console.log("Scanned a device with name: " + device.name + " | " + device.id + " | " + device.rssi)
                        console.log("Services:", services)
                        try {
                            device = await device.connect({ autoConnect: false, timeout: 1000 * 3 })
                        } catch {
                            console.log("Could not connect")
                            return;
                        }

                        console.log("Connected to device: ", device.name)
                        try {
                            device = await device.discoverAllServicesAndCharacteristics()
                            let characteristics = await device.characteristicsForService('00001200-0000-1000-8000-00805f9b34fb')
                            console.log("************************Characteristics:", characteristics[0].uuid)
                        } catch {
                            console.log("Could not get Discover services")
                            return;
                        }

                        try {
                            await bleManager.cancelDeviceConnection(device.id)
                        } catch {
                            console.log("Could not disconnect")
                        }

                    }
                }
            )
        } catch (error) {
            console.log('Could not start scanning for devices', { error })
        }
    }

    /**
     * stop scanning for devices
     * 
     * @return  {void}            
     */
    const handleStopContactTracing = () => {
        bleManager.stopDeviceScan();
    }

    /**
     * start advertising parliament contact tracing service UUID & device key 
     * @return  {Promise<void>}            
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
            if (Peripheral.isAdvertising()) {
                await Peripheral.stopAdvertising()
            }

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
     * stop advertising parliament contact tracing service UUID & device key 
     * @return  {Promise<void>}            
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
