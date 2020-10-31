import React from 'react'
import { Text, Alert, TouchableOpacity, View, StyleSheet, SafeAreaView, StatusBar } from 'react-native'
import QRCodeScanner from 'react-native-qrcode-scanner';

import { CommonActions } from '@react-navigation/native';

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
                // Navigate to qr results screen
                props.navigation.dispatch(
                    CommonActions.navigate({
                        name: 'QRPositive'
                    })
                );
                break
            case 'Negative':
                console.log("QRScanningScreen has scanned a negative result");
                //Alert user on component to keep staying safe
                Alert.alert("Your results were Negative, keep staying safe!")
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
