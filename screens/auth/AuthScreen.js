import React from 'react';
import { View, StyleSheet, Button, Text } from 'react-native';

import { CommonActions } from '@react-navigation/native';




const AuthScreen = (props) => {
    console.log(props.navigation)
    return (<View>
        <Text>AuthScreen  </Text>

        <Button title="Sign In" onPress={() => {
            console.log("You click on the Login Button");
            props.navigation.dispatch(
                CommonActions.navigate({
                    name: 'SignIn'
                })
            );
        }} />

        <Button title="SignUp" onPress={() => {
            console.log("You click on the SignUp Button");
            props.navigation.dispatch(
                CommonActions.navigate({
                    name: 'SignUp'
                })
            );
        }} />
    </View>
    );

}

const styles = StyleSheet.create({});
export default AuthScreen;