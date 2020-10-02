import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserNavigator } from './ParliamentNavigators';
import StartupScreen from '../screens/StartupScreen';
import { useSelector } from 'react-redux';

/**
 * AppNavigator Component.
 * Adds routing and navigation to the entire React-Native app
 * 
 * This is called by the main app function and wraps the entire
 * app within the NavigationContainer
 * 
 * Allows us to easily move between screens of the application
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