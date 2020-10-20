import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';
import CustomButton from '../../Components/CustomButton';

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

    return (
        <SafeAreaView style={styles.container} >
            <CustomButton title='Find COVID testing near me' />
            <CustomButton title='Submit Covid diagnosis' />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    
});

export default DiagnosisScreen;
