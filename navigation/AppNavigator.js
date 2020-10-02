import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserNavigator } from './ParliamentNavigators';
import StartupScreen from '../screens/StartupScreen';
import { useSelector } from 'react-redux';

/**
 * AppNavigator Component.
 *
 * @example
 * return (
 *   <AppNavigator />
 * )
 */
const AppNavigator = (props) => {
    const didTryAutoLogin = useSelector(state => state.user.didTryAutoLogin);

    return (
        <NavigationContainer>
            { didTryAutoLogin === false && <StartupScreen /> }
            { didTryAutoLogin === true && <UserNavigator /> }
        </NavigationContainer>
    )
}
export default AppNavigator;