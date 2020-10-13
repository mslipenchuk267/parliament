import React from 'react';
import { View, StyleSheet, Button,Text,TextInput } from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';



const Sign_up_Screen = () => {
    return (<View>
        <CustomTextInput placeholder="Enter Username"/>
        <CustomTextInput placeholder="Enter Password" secureTextEntry={true}/>
        <Button title="Sign Up"/>
    </View>
    );

}

export default Sign_up_Screen; 