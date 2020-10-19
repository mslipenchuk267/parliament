import React from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';


const CustomButton = (props) => {
    return (
        <TouchableOpacity
            onPress={props.handlePress}
        >
            <View style={styles.button}>
                <Text style={styles.buttonText}>
                    {props.title}
                </Text>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 50,
        marginVertical: 20,
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
        fontWeight: '400',
        color: "#007aff"
    }
});
export default CustomButton;