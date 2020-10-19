import React from 'react'
import { StyleSheet, SafeAreaView } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../Components/CustomButton';
import { isRefreshNeeded } from '../../helpers/authHelper';
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
    const accessTokenExpiration = useSelector(state => state.user.accessTokenExpiration);
    const dispatch = useDispatch();

    const logoutButtonHandler = async () => {
        console.log("SettingsScreen.js/logoutButtonHandler() - Pressed Logout Button")
        if (isRefreshNeeded(accessTokenExpiration)) {
            await dispatch(userActions.refreshTokens())
        }
        dispatch(userActions.logout())
    }

    const deleteAccountButtonHandler = async () => {
        console.log("SettingsScreen.js/deleteAccountButtonHandler() - Pressed Delete Account Button")
        if (isRefreshNeeded(accessTokenExpiration)) {
            await dispatch(userActions.refreshTokens())
        }
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
