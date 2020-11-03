import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import { blue } from '../constants/colors';


const CustomButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.handlePress}
            style={styles.button}
        >
            <Text style={styles.buttonText}>
                {props.title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 40,
        alignItems: 'center',
        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: blue
    }
});
export default CustomButton;