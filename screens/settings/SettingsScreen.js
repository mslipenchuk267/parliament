import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import {useDispatch} from 'react-redux';
import CustomButton from '../../Components/CustomButton';
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
        console.log("SettingsScreen.js/logoutButtonHandler() - Pressed Logout Button")
        dispatch(userActions.logout())
    }

    const deleteAccountButtonHandler = () => {
        console.log("SettingsScreen.js/deleteAccountButtonHandler() - Pressed Delete Account Button")
        dispatch(userActions.deleteAccount())
    }

    return (
        <SafeAreaView style={styles.container} >
            <CustomButton title="Logout" handlePress={logoutButtonHandler} />
            <CustomButton title="Delete Account" handlePress={deleteAccountButtonHandler} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default SettingsScreen;
