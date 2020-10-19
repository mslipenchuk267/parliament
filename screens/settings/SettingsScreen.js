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
        dispatch(userActions.logout())
    }

    return (
        <SafeAreaView style={styles.container} >
            <CustomButton title="Logout" handlePress={logoutButtonHandler} />
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
