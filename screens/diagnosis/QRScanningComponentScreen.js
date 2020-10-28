import React, { Component } from 'react'
import { Text, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
/**
 * The QRScanningComponentScreen component houses the UI components 
 * @example
 * return (
 *   <QRScanningComponentScreen />
 * )
 */

class QRScanningComponentScreen extends Component {

    state ={
        qr: ""
    }

    onRead = e => {
        //this.setState( {qr: e.data} )
        console.log(e)
    }

    //Logic to implement QR Scanning

    //Load Camera to Scan QR Code

    //Handle Result of Scan ; possible cases {positive,negative,neither}

    //if result = positive
        //upload {tempID} -> Infection API

    //else if result = negative
        //log negative result
        //Alert user on component to keep staying safe
     
    //else(neither)
        //Alert that QR Code was invalid, try again.
render() {
    return (
        <SafeAreaView>

            <Text>Clicked on "Submit QR Code" button to get here</Text>    
            
            <QRCodeScanner
            onRead={this.onRead}
            />

        </SafeAreaView>
    )
};
}
const styles = StyleSheet.create({
    
});

export default QRScanningComponentScreen;
