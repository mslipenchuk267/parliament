import React from 'react';
import { View, StyleSheet, Button } from 'react-native';


const AuthScreen = () => {
    return (<View>
        <Text>AuthScreen  </Text>

        <Button title="Sign Up" onPress={() => {
            console.log("You click on the Login Button");
            navigation.navigate('SignIn');
        }} />

        <Button title="Login" onPress={() => {
            console.log("You click on the Logout Button");
            navigation.navigate('SignUp');
        }} />
    </View>
    );

}

const styles = StyleSheet.create({});
export default AuthScreen;