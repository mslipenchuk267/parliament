import { CommonActions } from '@react-navigation/native';
import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import { View, StyleSheet, Button,Text,TextInput} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import * as userActions from '../../store/actions/user';


const SignInScreen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const signInButtonHandler = () => {
        dispatch(userActions.attemptLogin(username,password))
    }


    return (<View>
        <CustomTextInput
        placeholder="Enter Username"
        onChangeText={(text) => setUsername(text)}/>
        <CustomTextInput 
        placeholder="Enter Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}/>
        <Button title="Sign In" onPress={signInButtonHandler}/>
    </View>
    );

}
const styles = StyleSheet.create({});
export default SignInScreen;