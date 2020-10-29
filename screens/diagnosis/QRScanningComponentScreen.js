import React, { Component } from 'react'
import { Text, Alert, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
/**
 * The QRScanningComponentScreen component houses the UI components 
 * @example
 * return (
 *   <QRScanningComponentScreen />
 * )
 */

const QRScanningComponentScreen = () => {

        qrResult = "" //empty string for now, declared outside for scope

    handleScan = e => {
    
        qrResult = e.data; //Capture result in variable

        console.log(qrResult); //logs result to console

        //Handle Result of Scan ; possible 3 cases { positive, negative, (!positive && !negative) }
        if(this.qrResult == 'Positive') {

            //upload {tempID} -> Infection API

        } else if (this.qrResult == 'Negative') {

            //Alert user on component to keep staying safe
            Alert.alert("Your results were Negative, keep staying safe!")

        } else {

            //Alert that QR Code was invalid, try again.
            Alert.alert("QR Code was invalid, try again.")
            
        }

    }//end onRead(e)

    return (
        <SafeAreaView>

            <Text>Clicked on "Submit QR Code" button to get here</Text>    
            
            <QRCodeScanner onRead={this.handleScan}/>

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    
});

export default QRScanningComponentScreen;
