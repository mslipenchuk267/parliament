import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserNavigator } from './ParliamentNavigators';
import StartupScreen from '../screens/StartupScreen';
import { useSelector } from 'react-redux';

/**
 * The AppNavigator is the root navigation component. 
 * The AppNavigator wraps the startup screen component
 * and user navigatior in a navigation container.
 * It also ensures that the startup screen is the first 
 * component to render. 
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
