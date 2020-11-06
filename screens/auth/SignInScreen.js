import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import CustomTextInput from '../../components/CustomTextInput';
import * as userActions from '../../store/actions/user';
import CustomButton from '../../components/CustomButton';

import * as SecureStore from 'expo-secure-store';

const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    //users access and accesstoken exp
    const accessToken = useSelector(state => state.user.accessToken);
    const accessTokenExpiration = useSelector(state => state.user.accessTokenExpiration);

    const signInButtonHandler = async () => {
        console.log("SignInScreen.js/signInButtonHandler() Pressed Sign In Button");
        //TODO: capture userAuth , JSON.stringify 
         var userAuth = 
            {
                "accessToken": typeof(accessToken),
                "accessTokenExpiration": accessTokenExpiration,
                "refreshToken": "test3",
                "refeshTokenExpiration": "test4",
            }
        

        //TODO: save userAuth data into SecureStore
        try {
            await SecureStore.setItemAsync('userAuth', JSON.stringify(userAuth)) //convery to JSON tostring
            console.log("SignInScreen.js/signInButtonHandler() - Saved userAuth to secure store")
        } catch (err) {
            console.log("SignInScreen.js/signInButtonHandler() - Could not save userAuth to secure store, error:", err)
        }

        //PRINT TEST

        try {
            var retrievedUserAuth = await SecureStore.getItemAsync('userAuth');
            if (retrievedUserAuth) {
                const transformedretrievedUserAuth = JSON.parse(retrievedUserAuth);
                console.log( transformedretrievedUserAuth );
            }
        } catch {
            console.log("SignInScreen.js/signInButtonHandler() - Could not parse userAuth from secure store, error:", err)
        }


        dispatch(userActions.login(username, password))
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