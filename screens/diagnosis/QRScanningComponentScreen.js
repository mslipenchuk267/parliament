import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'

/**
 * The QRScanningComponentScreen component houses the UI components 
 * @example
 * return (
 *   <QRScanningComponentScreen />
 * )
 */

const QRScanningComponentScreen = () => {
    return (
        <SafeAreaView>
            <Text>Clicked on "Submit QR Code" button to get here</Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    
});

export default QRScanningComponentScreen;
