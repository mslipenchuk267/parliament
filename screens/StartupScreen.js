import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import * as userActions from '../store/actions/user';

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
