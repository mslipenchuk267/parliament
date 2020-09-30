import React, { useEffect } from 'react'
import { Text, Platform, PermissionsAndroid, View, Button, StyleSheet, SafeAreaView } from 'react-native'
import { BleManager } from 'react-native-ble-plx'

const bleManager = new BleManager();

const HomeScreen = () => {

    const handleStartContactTracing = async () => {
        bleManager.startDeviceScan(
            null,
            { allowDuplicates: true },
            async (error, device) => {
                console.log("Scanned a device with id: " + device.id)
            }
          )
    }

    const handleStopContactTracing = () => {
        bleManager.stopDeviceScan();
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
