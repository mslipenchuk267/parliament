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
        
        //this.setState( {qr: e.data} )

        console.log(e.data); //logs 'Negative' or 'Positive' or Other data

        qrResult = e.data; //Capture result in variable

        console.log(qrResult); //check to match console.log(e.data) : *RESULT -> match

    }//end onRead(e)


    //Handle Result of Scan ; possible cases {positive,negative,neither}

    const handleQRResults = () => {

        if(this.qrResult == 'Positive') {
            //upload {tempID} -> Infection API
        } else if (this.qrResult == 'Negative') {
            //log negative result
            //Alert user on component to keep staying safe

        } else {
            //Alert that QR Code was invalid, try again.
        }

    }//end handleQRResults()


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
