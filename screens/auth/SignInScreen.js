import { CommonActions } from '@react-navigation/native';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ImageBackground, Pressable, View, StyleSheet, Button, Text, TextInput } from 'react-native';

import CustomTextInput from '../../Components/CustomTextInput';
import * as userActions from '../../store/actions/user';
import { owlImage } from '../../helpers/imageHelper';


const SignInScreen = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const signInButtonHandler = () => {
        dispatch(userActions.attemptLogin(username, password))
    }

    return (
        <View >
            <ImageBackground source={owlImage} style={{ width: '100%', height: '100%' }}>
                <View style={{ padding: 70 }}></View>
                <View style={styles.textInputShape}>
                    <CustomTextInput
                        placeholder="Enter Username"
                        onChangeText={(text) => setUsername(text)} />
                </View>
                <View style={{ padding: 10 }}></View>
                <View style={styles.textInputShape}>
                    <CustomTextInput
                        placeholder="Enter Password"
                        onChangeText={(text) => setPassword(text)}
                        secureTextEntry={true} />
                </View>
                <View style={{ padding: 10 }}></View>
                <View style={styles.containSizing}>
                    <Pressable
                        onPress={signInButtonHandler}
                        style={({ pressed }) => [
                            {
                                backgroundColor: pressed
                                    ? "#479cfe"
                                    : "#fe479c"
                            },
                            styles.buttonShape
                        ]}>
                        <Text style={styles.buttonText}>
                            Sign in
                    </Text>
                    </Pressable>
                </View>
            </ImageBackground>
        </View>
    );

}
const styles = StyleSheet.create({
    textInputShape: {
        elevation: 10,
        paddingVertical: 2,
        paddingHorizontal: 5,
        backgroundColor: "#497bfe",

    },
    containSizing: {
        alignItems: "center",
        justifyContent: "center",
        padding: 10
    },

    buttonShape: {
        elevation: 10,
        borderRadius: 15,
        paddingVertical: 20,
        paddingHorizontal: 50
    },
    buttonText: {
        fontSize: 18,
        color: "#000",
        fontWeight: "bold",
        alignSelf: "center",
        textTransform: "uppercase"
    }
});
export default SignInScreen;