import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';
import CustomButton from '../../Components/CustomButton';
//import { createStackNavigator, createAppContainer } from 'react-navigation';  
import { CommonActions } from '@react-navigation/native';

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
const DiagnosisScreen = (props) => {

    const findCovidTestingButtonHandler = () => {
        //when button is clicked, take user to StateSelectorScreen
        console.log("DiagnosisScreen.js/findCovidTestingButtonHandler() Pressed Find COVID testing near me");

        //goes into next screen
         props.navigation.dispatch(
             CommonActions.navigate({
                name: 'StateSelectorScreen' // .navigate -> key:string
            })
         );
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
