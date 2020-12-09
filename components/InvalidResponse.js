import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


/**
 * The InvalidResponse component is a container responsible for unifying 
 * styles elements with static text output.  This component is used to 
 * display an error message to the user when an invalid QR code is scanned.
 * A usage example can be seen in QRResultsScreen.js
 * @example
 * return (
 *   <View />
 * )
 */

const InvalidResponse = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}  >
                    Unknown Error Occurred
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Please scan QR code again
                </Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    textContainer: {
        paddingHorizontal: 20,
        paddingVertical: 10
    },
    titleBold: {
        fontWeight: 'bold',
        fontSize: 20
    },
    title: {
        fontSize: 20
    },
    note: {
        fontStyle: "italic",
        fontWeight: 'bold',
        fontSize: 20
    }
});

export default InvalidResponse;