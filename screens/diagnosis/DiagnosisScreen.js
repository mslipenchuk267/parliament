import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'

/**
 * DiagnosisScreen Component.
 * returns a SafeAreaView allowing the user to see an explanation of Diagnosis
 * This will also contain the QR Scanner and the testing site linking component
 * @example
 * return (
 *   <DiagnosisScreen />
 * )
 */
const DiagnosisScreen = () => {
    return (
        <SafeAreaView>
            <Text>This is the diagnosis screen</Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    
});

export default DiagnosisScreen;
