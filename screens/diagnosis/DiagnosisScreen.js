import React from 'react'
import { StyleSheet, SafeAreaView, View, StatusBar } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import CustomButton from '../../components/CustomButton';
import { offWhite } from '../../constants/colors';

/**
 * The DiagnosisScreen component houses the UI components 
 * and handler functions for QR diagnosis code submission
 * and navigating the user to testing site website.
 * @example
 * return (
 *   <DiagnosisScreen />
 * )
 */
const DiagnosisScreen = (props) => {

    const handleNewsSiteButton = () => {
        // when button is clicked, take user to StateSelectorScreen
        console.log("DiagnosisScreen.js/handleNewsSiteButton() - Pressed Find News Button");
        // goes into next screen
        props.navigation.dispatch(
            CommonActions.navigate({
                name: 'StateSelector' // .navigate -> key:string
            })
        );
    }

    const handleSubmitQRCodeButton = () => {
        // when button is clicked, take user to QRScanningtScreen
        console.log("DiagnosisScreen.js/handleSubmitQRCodeButton() - Pressed Submit QR Button");
        // goes into next screen
        props.navigation.dispatch(
            CommonActions.navigate({
                name: 'QRScanning' // .navigate -> key:string
            })
        );
    }


    return (
        <SafeAreaView style={styles.container} >
            <StatusBar barStyle='dark-content' />
            <View>
                <CustomButton title='Find News in Your State' handlePress={handleNewsSiteButton} />
                <View style={{ padding: 20 }} />
                <CustomButton title='Submit QR Code' handlePress={handleSubmitQRCodeButton} />
            </View>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: offWhite,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default DiagnosisScreen;
