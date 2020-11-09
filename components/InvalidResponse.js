import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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