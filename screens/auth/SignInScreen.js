import React from 'react';
import { View, StyleSheet, Button,Text,TextInput} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';


const SignInScreen = () => {
    return (<View>
        <Text>SignInScreen  </Text>
        <CustomTextInput placeholder="Enter Username"/>
        <CustomTextInput placeholder="Enter Password" secureTextEntry={true}/>
    </View>
    );

}
const styles = StyleSheet.create({});
export default SignInScreen;