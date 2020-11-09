import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput';
import * as userActions from '../../store/actions/user';
import CustomButton from '../../components/CustomButton';

import * as SecureStore from 'expo-secure-store';
import { getDeviceToken } from '../../helpers/notificationHelper';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const deviceToken = useSelector(state => state.user.deviceToken)
    const dispatch = useDispatch();

    const signInButtonHandler = async () => {
        console.log("SignInScreen.js/signInButtonHandler() Pressed Sign In Button");
        if (deviceToken) {
            dispatch(userActions.login(username, password))

        } else {
            const newDeviceToken = getDeviceToken();
            dispatch(userActions.setDeviceToken(newDeviceToken));
            dispatch(userActions.login(username, password))
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ width: '70%' }}>
                <CustomTextInput
                    placeholder="Username"
                    onChangeText={(text) => setUsername(text)}
                />
            </View>
            <View style={{ padding: 10 }}/>
            <View style={{ width: '70%' }}>
                <CustomTextInput
                    placeholder="Password"
                    onChangeText={(text) => setPassword(text)}
                    secureTextEntry={true}
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