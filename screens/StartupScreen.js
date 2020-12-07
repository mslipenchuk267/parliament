import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import * as userActions from '../store/actions/user';
import { deleteUserAuth, getContactedIDs, getUserAuth, getNotificationHistory } from '../helpers/secureStoreHelper';
import { offWhite } from '../constants/colors';

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
            // check persistent storage for stored contacted IDs
            const contactedIDs = await getContactedIDs();
            if (contactedIDs) {
                // set redux state
                dispatch(userActions.setContactIDs(contactedIDs));
            }

            // check persistent storage for stored notification history
            const notificationHistory = await getNotificationHistory();
            if (notificationHistory) {
                // set redux state
                dispatch(userActions.setNotificationHistory(notificationHistory));
            }

            // check persistent storage for userAuth json
            const userAuth = await getUserAuth();
            if (userAuth) {
                // check if refreshToken expired
                if (new Date(userAuth.refreshTokenExpiration) < new Date()) {
                    // User must login manually
                    // this boots them into the AuthNavigator
                    dispatch(userActions.setDidTryAutoLogin());
                    return;
                } else {
                    // Set the users redux state so that we can then refresh their tokens right after
                    dispatch(userActions.authenticate(
                        userAuth.accessToken,
                        userAuth.accessTokenExpiration,
                        userAuth.refreshToken,
                        userAuth.refreshTokenExpiration
                    ));
                    try {
                        await dispatch(userActions.refreshTokens())
                    } catch (error) {
                        dispatch(userActions.setDidTryAutoLogin());
                        return;
                    }
                    // User's auth state is set updated in redux and secure store, lets boot user into UserNavigator
                    dispatch(userActions.setDidTryAutoLogin());
                    return;
                }
            } else {
                // No userAuth to set, boot user into the AuthNavigator
                dispatch(userActions.setDidTryAutoLogin());
                return;
            }
        };

        tryLogin();
    }, [dispatch]);

    return (
        <View style={styles.container} />
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: offWhite
    }
});

export default StartupScreen