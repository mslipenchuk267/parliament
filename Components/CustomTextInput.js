import React from 'react';
import { View, StyleSheet, Button,Text,TextInput } from 'react-native';



const CustomTextInput = (props) => {
    return (
        <View>
            <TextInput placeholder={props.placeholder} style={styles.textInput}/>
        </View>
    );
}


const styles = StyleSheet.create({
    textInput: {
          backgroundColor: 'white',}
  });


export default CustomTextInput; 