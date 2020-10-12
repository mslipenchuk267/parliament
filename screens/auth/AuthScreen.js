import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

import { CommonActions } from '@react-navigation/native';




const AuthScreen = (props) => {
    return (<View>
        <Text>AuthScreen  </Text>

        <Button title="Sign Up" onPress={() => {
            console.log("You click on the Login Button");
            // props.navigation.dispatch(
            //     CommonActions.navigate({
            //         name: 'SignIn'
            //     })
            // );
        }} />

        <Button title="Login" onPress={() => {
            console.log("You click on the Logout Button");
            // props.navigation.dispatch(
            //     CommonActions.navigate({
            //         name: 'SignUp'
            //     })
            // );
        }} />
    </View>
    );

}

const styles = StyleSheet.create({});
export default AuthScreen;