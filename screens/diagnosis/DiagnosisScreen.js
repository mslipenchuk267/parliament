import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';
import CustomButton from '../../Components/CustomButton';
//import { createStackNavigator, createAppContainer } from 'react-navigation';  

//import { Text, Platform, PermissionsAndroid, View, Button, StyleSheet, SafeAreaView } from 'react-native';

/**
 * The DiagnosisScreen component houses the UI components 
 * and handler functions for QR diagnosis code submission
 * and navigating the user to testing site website.
 * @example
 * return (
 *   <DiagnosisScreen />
 * )
 */
const DiagnosisScreen = () => {

    const findCovidTestingButtonHandler = () => {
        //when button is clicked, take user to StateSelectorScreen

    }//end findCovidTestingButtonHandler

    return (
        <SafeAreaView style={styles.container} >
            <CustomButton title='Find COVID testing near me' handlePress={findCovidTestingButtonHandler} />
            <CustomButton title='Submit Covid diagnosis' />
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

export default DiagnosisScreen;
