import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { lightGrey, mediumGrey } from '../constants/colors';

const CustomTextView = (props) => {
    return (
        <TextInput
            placeholder={props.placeholder}
            value={props.value}
            secureTextEntry={props.secureTextEntry}
            style={styles.textInput}
            autoCapitalize='none'
            placeholderTextColor='grey'
            autoCompleteType='off'
            onChangeText={props.onChangeText}
            clearButtonMode='while-editing'
            testID={props.testID || null}
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
        //minWidth: '80%',
        fontSize: 16,
    },
});


export default CustomTextView; 