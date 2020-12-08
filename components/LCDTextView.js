import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { lightGrey, mediumGrey } from '../constants/colors';

/**
 * The LCDTextView component is a container responsible for unifying
 * styles elements with TextInput functionality.  This component is used 
 * to display text that cannot be further edited by a user.  The 
 * returned text is made to emulate that of a classic liquid crytal display
 * A TextInput is returned.  A usage example can be seen in HomeScreen.js
 * @example
 * return (
 *   <TextInput />
 * )
 */
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