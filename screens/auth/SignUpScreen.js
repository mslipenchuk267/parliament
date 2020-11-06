import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput';
import * as userActions from '../../store/actions/user';
import CustomButton from '../../components/CustomButton';
import { userNameInputValidator, passwordInputValidator } from '../../helpers/inputValidationHelper'

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const dispatch = useDispatch();

    const handleUserNameInput = (userNameInput) => {
        setUsername(userNameInput);
        setUsernameValid(userNameInputValidator(userNameInput));
    }

    const handlePasswordInput = (passwordInput) => {
        setPassword(passwordInput);
        setPasswordValid(passwordInputValidator(passwordInput));
    }

    const signUpButtonHandler = async () => {
        console.log("SignUpScreen.js/signUpButtonHandler() - Pressed Sign Up Button with userNameValid", usernameValid, " and passwordValid", passwordValid);
        if (username && password) {
            if (usernameValid && passwordValid.isValid) {
                await dispatch(userActions.signup(username, password))
            }
            else {
                Alert.alert("Invalid username or password")
            }
        }
        else {
            Alert.alert("Please complete Sign Up form")
        }
    }

    return (


        <SafeAreaView style={styles.container}>
            <View style={{ width: '70%' }}>
                <CustomTextInput
                    placeholder="Username"
                    onChangeText={(text) => handleUserNameInput(text)}
                />
            </View>
            <View style={{ padding: 10 }} />
            <View style={{ width: '70%' }}>
                <CustomTextInput
                    placeholder="Password"
                    onChangeText={(text) => handlePasswordInput(text)}
                    secureTextEntry={true}
                />
            </View>
            <View style={{ padding: 10 }} />
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