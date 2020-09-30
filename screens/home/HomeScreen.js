import React from 'react'
import { Text, View, Button, StyleSheet, SafeAreaView } from 'react-native'
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
