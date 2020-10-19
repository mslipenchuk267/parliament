import React from 'react';
import { Pressable, ImageBackground, View, StyleSheet, Button, Text } from 'react-native';

import { CommonActions } from '@react-navigation/native';


//const image = { uri: '../../images/vectorowl.PNG' };

const AuthScreen = (props) => {
    return (<View>
        <ImageBackground source={require('../../assets/images/parliament_owl.png')}  style={{width: '100%', height: '100%'}}>
            <View style={{padding:70}}></View>
            <View style={styles.containSizing}>
                <Pressable
                    onPress={() => {
                        console.log("You click on the Login Button");
                        props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'SignIn'
                                })
                            );
                    }}
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
            <View style={styles.containSizing}>
                <Pressable
                    onPress={() => {
                        console.log("You click on the SignUp Button");
                        props.navigation.dispatch(
                            CommonActions.navigate({
                                name: 'SignUp'
                            })
                        );
                    }}
                    style={({ pressed }) => [
                    {
                        backgroundColor: pressed
                        ? "#479cfe" 
                        : "#a947fe"
                    },
                    styles.buttonShape
                    ]}>
                    <Text style={styles.buttonText}>
                        Sign up
                    </Text>
                </Pressable>
            </View>
        </ImageBackground>
    </View>
    );

}

const styles = StyleSheet.create({
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
export default AuthScreen;