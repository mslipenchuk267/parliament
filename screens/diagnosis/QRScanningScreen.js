import React, { useEffect, useState } from 'react'
import { Text, Alert, TouchableOpacity, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';

import { StackActions } from '@react-navigation/native';

/**
 * The QRScanningScreen component houses the UI components 
 * @example
 * return (
 *   <QRScanningScreen />
 * )
 */
const QRScanningScreen = (props) => {

    const handleScan = (result) => {
        // Extract result data
        qrResult = result.data;
        switch (qrResult) {
            case 'Positive':
                console.log("QRScanningScreen has scanned a positive result, redirecting to QRPositiveScreen component");
                // Replace screen in stack to stop qr scanner from still being in focus
                //  this fixes issue of qr scanner still scanning even if we just navigate to another screen
                props.navigation.dispatch(
                    StackActions.replace('QRResults', { result: qrResult })
                );
                break
            case 'Negative':
                console.log("QRScanningScreen has scanned a negative result");
                //Alert user on component to keep staying safe
                // Replace screen in stack to stop qr scanner from still being in focus
                //  this fixes issue of qr scanner still scanning even if we just navigate to another screen
                props.navigation.dispatch(
                    StackActions.replace('QRResults', { result: qrResult })
                );
                break
            default:
                Alert.alert("QR Code was invalid, try again.");
                break;
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle={'light-content'} />
            <QRCodeScanner
                reactivateTimeout={3000}
                fadeIn={false}
                reactivate={true}
                showMarker={true}
                markerStyle={styles.qrMarker}
                onRead={handleScan}
                bottomContent={
                    <View>
                        <Text style={styles.qrBottomContent}>please scan your QR code</Text>
                    </View>
                }
            />
        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'black'
    },
    qrMarker: {
        //borderColor: 'white',
        borderRadius: 15,
        borderWidth: 3,
        opacity: 0.6
    },
    qrBottomContent: {
        color: "white",
        fontSize: 16
    }
});

export default QRScanningScreen;
