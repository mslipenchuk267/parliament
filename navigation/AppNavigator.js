import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserNavigator } from './ParliamentNavigators';

const AppNavigator = (props) => {
    return (
        <NavigationContainer>
            <UserNavigator />
        </NavigationContainer>
    )
}
export default AppNavigator;