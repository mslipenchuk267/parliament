import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import CustomButton from '../../Components/CustomButton';

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

    return (
        <SafeAreaView style={styles.container} >
            <CustomButton title='Find News in Your State' handlePress={handleNewsSiteButton} />
            <CustomButton title='Submit QR Code' />
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
