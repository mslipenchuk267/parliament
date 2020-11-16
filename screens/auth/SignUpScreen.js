import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView, Text, Alert } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { userNameInputValidator, passwordInputValidator } from '../../helpers/inputValidationHelper'
import { getDeviceToken } from '../../helpers/notificationHelper';
import * as userActions from '../../store/actions/user';

const SignUpScreen = () => {
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const deviceToken = useSelector(state => state.user.deviceToken)
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
                if (deviceToken) {
                    dispatch(userActions.signup(username, password))
                } else {
                    const newDeviceToken = getDeviceToken();
                    dispatch(userActions.setDeviceToken(newDeviceToken));
                    dispatch(userActions.signup(username, password))
                }
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
            <View style={{alignItems: 'flex-start'}}>
                <Text>Password Requirements:</Text>
                <Text style={{ color: passwordValid.lengthValid ? '#34c759' : 'grey', paddingTop: 3 }} >
                                    10 to 24 characters long
                </Text>
                <Text style={{ color: passwordValid.caseValid ? '#34c759' : 'grey', paddingTop: 3 }} >
                    Mixture of uppercase and lowercase
                </Text>
                <Text style={{ color: passwordValid.numberValid ? '#34c759' : 'grey', paddingTop: 3, paddingBottom: 10 }} >
                    Mixture of letters and numbers
                </Text>
            </View>
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