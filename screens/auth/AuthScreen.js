import React from 'react';
import { View, Text, StyleSheet, StatusBar, Image, SafeAreaView } from 'react-native';
import { CommonActions } from '@react-navigation/native';

import { owlImage } from '../../helpers/imageHelper';
import CustomButton from '../../Components/CustomButton';


const AuthScreen = (props) => {
    const handleLoginButtonPress = () => {
        console.log("AuthScreen.js/handleSignInButtonPress() Pressed Login Button");
        props.navigation.dispatch(
            CommonActions.navigate({
                name: 'SignIn'
            })
        );
    }

    const handleSignUpButtonPress = () => {
        console.log("AuthScreen.js/handleSignUpButtonPress() Pressed Sign Up Button");
        props.navigation.dispatch(
            CommonActions.navigate({
                name: 'SignUp'
            })
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Image source={owlImage} style={styles.image} />
            <Text style={styles.titleText}>Welcome to Parliament</Text>
            <View style={styles.buttonContainer}>
                <CustomButton title="Login" handlePress={handleLoginButtonPress} />
                <CustomButton title="Sign Up" handlePress={handleSignUpButtonPress} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttonContainer: {
        alignItems: "center",
        justifyContent: "center",
    },
    titleContainer: {
    },
    titleText: {
        fontSize: 30,
        paddingVertical: 30
    },
    image: {
        width: 138,
        height: 205,
        marginBottom: 10
    }
});

export default AuthScreen;