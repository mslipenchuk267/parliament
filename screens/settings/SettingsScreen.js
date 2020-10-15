import React from 'react'
import { Text, StyleSheet, SafeAreaView,Button } from 'react-native'
import {useDispatch} from 'react-redux';
import * as userActions from '../../store/actions/user';


/**
 * The SettingsScreen component houses the UI components 
 * and handler functions for user account deletion and contact
 * tracing settings.
 * @example
 * return (
 *   <SettingsScreen />
 * )
 */
const SettingsScreen = () => {

    const dispatch = useDispatch();
    const logoutButtonHandler = () => {
        dispatch(userActions.logout())
    }

    return (
        <SafeAreaView>
            <Text>This is the settings screen</Text>
            <Button title="Logout" onPress={logoutButtonHandler}/>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    
});

export default SettingsScreen;
