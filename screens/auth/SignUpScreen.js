import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import { View, StyleSheet, SafeAreaView} from 'react-native';

import CustomTextInput from '../../Components/CustomTextInput';
import * as userActions from '../../store/actions/user';
import CustomButton from '../../Components/CustomButton';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const signUpButtonHandler = () => {
        console.log("SignInScreen.js/signUpButtonHandler() Pressed Sign Up Button");
        dispatch(userActions.attemptSignup(username,password))
    }

    return (
        <SafeAreaView style={styles.container}>
            <CustomTextInput
                placeholder="Username"
                onChangeText={(text) => setUsername(text)} />
            <View style={{ padding: 10 }}></View>
            <CustomTextInput
                placeholder="Password"
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true} />
            <View style={{ padding: 30 }}></View>
            <CustomButton title="Sign Up" handlePress={signUpButtonHandler} />
        </SafeAreaView>
    );

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SignUpScreen; 