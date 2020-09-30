import React, { useEffect } from 'react'
import { Text, Platform, PermissionsAndroid, View, Button, StyleSheet, SafeAreaView } from 'react-native'
import { BleManager } from 'react-native-ble-plx'
import BLEPeripheral from 'react-native-ble-peripheral';

const bleManager = new BleManager();

const HomeScreen = () => {

    const handleStartContactTracing = async () => {
        bleManager.startDeviceScan(
            ['00001200-0000-1000-8000-00805f9b34fb'],
            { allowDuplicates: true },
            async (error, device) => {
                console.log("Scanned a device with name: " + device.name + " | " + device.rssi)
            }
        )
    }

    const handleStopContactTracing = () => {
        bleManager.stopDeviceScan();
    }

    const handleStartAdvertising = () => {
        if (Platform.OS === 'android') {
            BLEPeripheral.setName('Parliament Android');
            BLEPeripheral.addService('00001200-0000-1000-8000-00805f9b34fb', true);
            //BLEPeripheral.addCharacteristicToService('f4c47b4e-18e2-4697-bc39-01de39b9bae5', '76c11234-9b41-4e13-a229-e29059c00e47', 16|1, 8 )

            BLEPeripheral.start()
                .then(res => {
                    console.log(res)
                }).catch(error => {
                    console.log(error)
                })
        }
    }

    const handleStopAdvertising = () => {
        if (Platform.OS === 'android') {
            BLEPeripheral.stop()
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
