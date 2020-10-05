import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';
import * as SecureStore from 'expo-secure-store';

import * as userActions from '../store/actions/user';
import { getContactedIDs } from '../helpers/secureStoreHelper';

/**
 * The StartupScreen component is responsible for authenticating
 * and retrieving user data saved in persistent storage on 
 * application startup.
 * @example
 * return (
 *   <StartupScreen />
 * )
 */
const StartupScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const tryLogin = async () => {
            // check persistent storage for user data 
            const contactedIDs = await getContactedIDs();
            if (contactedIDs) {
                // set redux state
                dispatch(userActions.setContactIDs(contactedIDs));
            }
            // request to sign in user to user database
            dispatch(userActions.setDidTryAutoLogin());
            return;
        };
        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.container}>
            <Text>This is the startup screen</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "black"
    }
});

export default StartupScreen
