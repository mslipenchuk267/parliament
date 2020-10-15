import React,{useState} from 'react';
import {useDispatch} from 'react-redux';
import { View, StyleSheet, Button,Text,TextInput} from 'react-native';
import CustomTextInput from '../../Components/CustomTextInput';
import * as userActions from '../../store/actions/user';





const Sign_up_Screen = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();
    const signUpButtonHandler = () => {
        dispatch(userActions.attemptSignup(username,password))
    }

    return (<View>
        <CustomTextInput
        placeholder="Enter Username"
        onChangeText={(text) => setUsername(text)}/>
        <CustomTextInput 
        placeholder="Enter Password"
        onChangeText={(text) => setPassword(text)}
        secureTextEntry={true}/>
        <Button title="Sign Up" onPress={signUpButtonHandler}/>
    </View>
    );

}

export default Sign_up_Screen; 