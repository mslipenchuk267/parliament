import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, StyleSheet, SafeAreaView, Alert } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput';
import * as userActions from '../../store/actions/user';
import CustomButton from '../../components/CustomButton';
//import { userNameInputValidator, passwordInputValidator } from '../../../../../Downloads/userInputHelper';
import { userNameInputValidator, passwordInputValidator } from '../../helpers/inputValidationHelper'


const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [usernameValid, setUsernameValid] = useState(false);
    const [password, setPassword] = useState('');
    const [passwordValid, setPasswordValid] = useState(false);
    const dispatch = useDispatch();

    const handleUsernameInput = (usernameInput) => {
        setUsername(usernameInput);
        //const isUsernameValid = validateUsername(text)
        //setUsernameValid(isUsernameValid)
        setUsernameValid(userNameInputValidator(usernameInput));
    }
    
    const handlePasswordInput = (passwordInput) => {
        setPassword(passwordInput);
        setPasswordValid(passwordInputValidator(passwordInput));
    }


    const signInButtonHandler = () => {
        if(username && password){
            if(usernameValid && passwordValid){
                dispatch(userActions.login(username, password))
            }
            else{
                Alert.alert("Invalid username or password")
            }
        }
        else{
            Alert.alert("Please complete login form")
        }
        console.log("SignInScreen.js/signInButtonHandler() Pressed Sign In Button");
        // dispatch(userActions.login(username, password))s
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '70%' }}>
                <CustomTextInput
                    placeholder="Username"
                    //onChangeText={(text) => setUsername(text)}
                    onChangeText={(text) => handleUsernameInput(text)}
                    testID="usernameInput"
                />
            </View>
            <View style={{ padding: 10 }}/>
            <View style={{ width: '70%' }}>
                <CustomTextInput
                    placeholder="Password"
                    //onChangeText={(text) => setPassword(text)}
                    onChangeText={(text) => handlePasswordInput(text)}
                    secureTextEntry={true}
                    testID="passwordInput"
                />
            </View>
            <View style={{ padding: 10 }}/>
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