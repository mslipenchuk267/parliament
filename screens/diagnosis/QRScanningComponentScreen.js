import React, { Component } from 'react'
import { Text, Alert, TouchableOpacity, View, StyleSheet, SafeAreaView } from 'react-native'
import { CommonActions } from '@react-navigation/native';

import { blue } from '../../constants/colors';

import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';
/**
 * The QRScanningComponentScreen component houses the UI components 
 * @example
 * return (
 *   <QRScanningComponentScreen />
 * )
 */

const QRScanningComponentScreen = (props) => {

        qrResult = "" //empty string for now, declared outside for scope

    const handleScan = (e) => {
    
        qrResult = e.data; //Extract and Capture result in variable

        //Handle Result of Scan ; possible 3 cases { positive, negative, (!positive && !negative) }
        if(qrResult == 'Positive') {

            console.log(qrResult); //logs result to console

            Alert.alert("Your results were Positive.") //Alert user on physical device
            
            //Navigate to QRPositiveScreen
            console.log("QRScanningComponentScreen has scanned a positive result, redirecting to QRPositiveScreen component"); //log function to console

            // goes into next screen
            props.navigation.dispatch(
                CommonActions.navigate({
                   name: 'QRPositive' // .navigate -> key:string
               })
            );

            //upload {tempID} -> Infection API

        } else if (qrResult == 'Negative') {

            console.log(qrResult); //logs result to console

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

            
            <QRCodeScanner 
            reactivateTimeout={number=5000}
            reactivate={true}
            showMarker={true} 
            markerStyle={{borderColor: blue, borderRadius:10}}
            onRead={handleScan}
            />

        </SafeAreaView>
    )

}

const styles = StyleSheet.create({
    
});

export default QRScanningComponentScreen;
