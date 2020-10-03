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

/**
 * HomeNavigator Component.
 * 
 * Switches the screen to the HomeScreen when
 * selected from the UserNavigator component
 *
 * @property {string} name - The name that displays in the components tab 
 * 
 * @example
 * return (
 *   <HomeNavigator />
 * )
 */
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

/**
 * DiagnosisNavigator Component.
 * 
 * Switches the screen to the DiagnosisScreen when
 * selected from the UserNavigator component
 * 
 * @property {string} name - The name that displays in the components tab 
 * 
 * @example
 * return (
 *   <DiagnosisNavigator />
 * )
 */
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

/**
 * NotificationsNavigator Component.
 *
 * Switches the screen to the NotificationsScreen 
 * when selected from the UserNavigator component
 * 
 * @property {string} name - The name that displays in the components tab 
 * 
 * @example
 * return (
 *   <NotificationsNavigator />
 * )
 */
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

/**
 * SettingsNavigator Component.
 * 
 * Switches the screen to the SettingsScreen when
 * selected from the UserNavigator component
 * 
 * @property {string} name - The name that displays in the components tab 
 * 
 * @example
 * return (
 *   <SettingsNavigator />
 * )
 */
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

/**
 * UserNavigator Component.
 * 
 * Displays bottom tab navigation for the app
 * 
 * Combines the previous 4 navigator components into
 * one larger navigation element that allows the user
 * to switch between screens within the application
 * 
 * @example
 * return (
 *   <UserNavigator />
 * )
 */
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
