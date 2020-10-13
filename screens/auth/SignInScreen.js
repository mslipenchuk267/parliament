import React from 'react';
import { View, StyleSheet, Button,Text,TextInput} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';


const SignInScreen = () => {
    return (<View>
        <CustomTextInput placeholder="Enter Username"/>
        <CustomTextInput placeholder="Enter Password" secureTextEntry={true}/>
        <Button title="Sign In"/>
    </View>
    );

}
const styles = StyleSheet.create({});
export default SignInScreen;