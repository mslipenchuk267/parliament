import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { lightGrey, mediumGrey } from '../constants/colors';


/**
 * The CustomeTextImput component is a container responsible for unifying
 * styles elements with TextInput functionality.  This component is used 
 * to display text that can be further edited by a user.  A TextInput is 
 * returned.  A usage example can be seen in SignInScreen.js
 * @example
 * return (
 *   <TextInput />
 * )
 */

const CustomTextInput = (props) => {
    return (
        <TextInput
            value={props.value ? props.value : null}
            placeholder={props.placeholder}
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
        fontSize: 16
    },
});


export default CustomTextInput; 