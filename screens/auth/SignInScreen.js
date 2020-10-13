import React from 'react';
import { View, StyleSheet, Button,Text} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';


const SignInScreen = () => {
    return (<View>
        <Text>SignInScreen  </Text>
        <CustomTextInput placeholder="Enter Username"/>
        <CustomTextInput placeholder="Enter Password"/>
    </View>
    );

}
const styles = StyleSheet.create({});
export default SignInScreen;