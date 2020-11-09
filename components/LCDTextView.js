import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { lightGrey, mediumGrey } from '../constants/colors';

const LCDTextView = (props) => {
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
            testID={props.testID || null}
        />
    );
}


const styles = StyleSheet.create({
    textInput: {
        backgroundColor: "transparent",
        borderColor: "grey",
        //minWidth: '80%',
        fontSize: 16,
    },
});


export default LCDTextView; 