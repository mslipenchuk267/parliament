import React from 'react';
import { View, StyleSheet, Button } from 'react-native';


const AuthScreen = () => {
    return (<View>
        <Text>AuthScreen  </Text>

        <Button title="Login" onPress={() => {
            console.log("You click on the Login Button");
        }} />

        <Button title="Logout" onPress={() => {
            console.log("You click on the Logout Button");
        }} />
    </View>
    );

}

const styles = StyleSheet.create({});
export default AuthScreen;