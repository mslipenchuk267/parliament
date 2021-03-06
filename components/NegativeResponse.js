import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

/**
 * The NegativeResponse function returns a message to users that
 * they have not been infected by COVID and to stay safe after they
 * scan the Negative QR Code.
 * @example
 * return (
 *   <NegativeResponse />
 * )
 */
const NegativeResponse = (props) => {
    return (
        <View style={styles.container}>
            <View style={styles.textContainer}>
                <Text style={styles.title}  >
                    Your result was <Text style={styles.titleBold} >Negative</Text>
                </Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.title}>
                    Keep social distancing and stay safe!
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

export default NegativeResponse;