import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { lightGrey, mediumGrey } from '../constants/colors';

const CustomTextInput = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            secureTextEntry={props.secureTextEntry}
            style={styles.textInput}
            autoCapitalize='none'
            placeholderTextColor='grey'
            onChangeText={props.onChangeText}
        />
    );
}


const styles = StyleSheet.create({
    textInput: {
        backgroundColor: lightGrey,
        borderColor: mediumGrey,
        borderWidth: 1,
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 10,
        width: '75%',
        fontSize: 16
    },
});


export default CustomTextInput; 