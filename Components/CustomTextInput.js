import React from 'react';
import { View, StyleSheet, Button,Text,TextInput } from 'react-native';



const CustomTextInput = (props) => {
    return (
        <View>
            <TextInput
            placeholder={props.placeholder} 
            secureTextEntry={props.secureTextEntry}
            style={styles.textInput}
            onChangeText={props.onChangeText}
            />
        </View>
    );
}


const styles = StyleSheet.create({
    textInput: {
          backgroundColor: 'white',}
  });


export default CustomTextInput; 