import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from '../screens/home/HomeScreen';
import DiagnosisScreen from '../screens/diagnosis/DiagnosisScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';

// Bottom Tab Navigator
const UserTabNavigator = createBottomTabNavigator();

// Stack Navigators
const HomeStackNavigator = createStackNavigator();
const DiagnosisStackNavigator = createStackNavigator();
const NotificationStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();

export const HomeNavigator = () => {
    return (
        <HomeStackNavigator.Navigator>
            <HomeStackNavigator.Screen
                name="Home"
                component={HomeScreen}
            />
        </HomeStackNavigator.Navigator>
    )
}

export const DiagnosisNavigator = () => {
    return (
        <DiagnosisStackNavigator.Navigator>
            <DiagnosisStackNavigator.Screen
                name="Submission"
                component={DiagnosisScreen}
            />
        </DiagnosisStackNavigator.Navigator>
    )
}

export const NotificationsNavigator = () => {
    return (
        <NotificationStackNavigator.Navigator>
            <NotificationStackNavigator.Screen
                name="NotificationHistory"
                component={NotificationsScreen}
            />
        </NotificationStackNavigator.Navigator>
    )
}

export const SettingsNavigator = () => {
    return (
        <SettingsStackNavigator.Navigator>
            <SettingsStackNavigator.Screen
                name="Settings"
                component={SettingsScreen}
            />
        </SettingsStackNavigator.Navigator>
    )
}

export const UserNavigator = () => {
    return (
        <UserTabNavigator.Navigator >
            <UserTabNavigator.Screen 
                name="Home"
                component={HomeNavigator}
            />
            <UserTabNavigator.Screen 
                name="Diagnosis"
                component={DiagnosisNavigator}
            />
            <UserTabNavigator.Screen 
                name="Notifications"
                component={NotificationsNavigator}
            />
            <UserTabNavigator.Screen 
                name="Settings"
                component={SettingsNavigator}
            />
        </UserTabNavigator.Navigator>
    )
}