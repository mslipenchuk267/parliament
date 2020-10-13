import React from 'react';
import { View, StyleSheet, Button,Text,TextInput } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';



const Sign_up_Screen = () => {
    return (<View>
        <Text>Sign_up_Screen  </Text>
        <CustomTextInput placeholder="Enter Username"/>
        <CustomTextInput placeholder="Enter Password"/>
    </View>
    );

}

export default Sign_up_Screen; 