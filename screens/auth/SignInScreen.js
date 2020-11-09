import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';
import * as SecureStore from 'expo-secure-store';

import CustomTextInput from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { userNameInputValidator, passwordInputValidator } from '../../helpers/inputValidationHelper'
import { getDeviceToken } from '../../helpers/notificationHelper';
import * as userActions from '../../store/actions/user';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const deviceToken = useSelector(state => state.user.deviceToken)
    const dispatch = useDispatch();

    const handleUsernameInput = (usernameInput) => {
        setUsername(usernameInput);
        setUsernameValid(userNameInputValidator(usernameInput));
    }

    const handlePasswordInput = (passwordInput) => {
        setPassword(passwordInput);
        setPasswordValid(passwordInputValidator(passwordInput));
    }


    const signInButtonHandler = async () => {
        console.log("SignInScreen.js/signInButtonHandler() Pressed Sign In Button with userNameValid", usernameValid, " and passwordValid", passwordValid);
        if (username && password) {
            if (usernameValid && passwordValid.isValid) {
                console.log("username and password valid")
                if (deviceToken) {
                    dispatch(userActions.login(username, password))
                } else {
                    const newDeviceToken = getDeviceToken();
                    dispatch(userActions.setDeviceToken(newDeviceToken));
                    dispatch(userActions.login(username, password));
                }
            }
            else {
                Alert.alert("Invalid username or password")
            }
        }
        else {
            Alert.alert("Please complete login form")
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '70%' }}>
                <CustomTextInput
                    placeholder="Username"
                    onChangeText={(text) => handleUsernameInput(text)}
                    testID="usernameInput"
                />
            </View>
            <View style={{ padding: 10 }} />
            <View style={{ width: '70%' }}>
                <CustomTextInput
                    placeholder="Password"
                    onChangeText={(text) => handlePasswordInput(text)}
                    secureTextEntry={true}
                    testID="passwordInput"
                />
            </View>
            <View style={{ padding: 10 }} />
            <CustomButton title="Login" handlePress={signInButtonHandler} />

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
export default SignInScreen;