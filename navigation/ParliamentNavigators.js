import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from '../node_modules/react-native-vector-icons/Entypo';

// UserNavigator screens 
import HomeScreen from '../screens/home/HomeScreen';
import DiagnosisScreen from '../screens/diagnosis/DiagnosisScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
// AuthNavigator screens
import AuthScreen from '../screens/auth/AuthScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';


// UserNavigator Bottom Tab Component
const UserTabNavigator = createBottomTabNavigator();
// UserNavigator Stack Navigators (tabs)
const HomeStackNavigator = createStackNavigator();
const DiagnosisStackNavigator = createStackNavigator();
const NotificationStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();

// AuthNavigator Stack Component 
const AuthStackNavigator = createStackNavigator();

// DiagnosisScreen -> StateSelector Screen
import StateSelectorScreen from '../screens/diagnosis/StateSelectorScreen';
import { blue } from '../constants/colors';
import QRScanningScreen from '../screens/diagnosis/QRScanningScreen';
import QRPositiveScreen from '../screens/diagnosis/QRPositiveScreen';

/**
 * The AuthNavigator is a stack navigator
 * that contains all screens needed for user
 * authentication. It manages the authentication,
 * sign in, and sign up screens. 
 * @example
 * return (
 *   <AuthNavigator />
 * )
 */
export const AuthNavigator = () => {
    return (
        <AuthStackNavigator.Navigator>
            <AuthStackNavigator.Screen
                name="Auth"
                component={AuthScreen}
                options={{ headerShown: false }}
            />
            <AuthStackNavigator.Screen
                name="SignIn"
                component={SignInScreen}
                options={{ headerBackTitle: false, headerTitle: "Sign In" }}
            />
            <AuthStackNavigator.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerBackTitle: false, headerTitle: "Sign Up" }}
            />
        </AuthStackNavigator.Navigator>
    )
}

/**
 * The HomeNavigator represents the home tab
 * in the bottom tab navigator. It manages all the screens
 * meant to be shown in the home tab. 
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
 * The DiagnosisNavigator represents the diagnosis tab
 * in the bottom tab navigator. It manages all the screens
 * meant to be shown in the diagnosis tab. 
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

            <DiagnosisStackNavigator.Screen
                name="StateSelector"
                component={StateSelectorScreen}
                options={{ headerTitle: "US State News", headerBackTitleVisible: false }}
            />

            <DiagnosisStackNavigator.Screen
                name="QRScanning"
                component={QRScanningScreen}
                options={{ headerTitle: "QR Scanner", headerTitleStyle: {color: 'white'}, headerTransparent: true, headerBackTitleVisible: false }}
            />            

            <DiagnosisStackNavigator.Screen
                name="QRPositive" 
                component={QRPositiveScreen}
                options={{ headerTitle: "QRPositiveScreen header title", headerBackTitleVisible: false }}
            />  

        </DiagnosisStackNavigator.Navigator>
    )
}


/**
 * The NotificationsNavigator represents the notifications tab
 * in the bottom tab navigator. It manages all the screens
 * meant to be shown in the notifications tab. 
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
 * The SettingsNavigator represents the settings tab
 * in the bottom tab navigator. It manages all the screens
 * meant to be shown in the settings tab. 
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
 * The UserNavigator represents the 
 * bottom tab navigator. It manages each
 * tabs respective navigators. 
 * @example
 * return (
 *   <UserNavigator />
 * )
 */
export const UserNavigator = () => {
    return (
        <UserTabNavigator.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
                    if (route.name === 'Home') {
                        iconName = 'home'
                    } else if (route.name === 'Diagnosis') {
                        iconName = 'magnifying-glass';
                    } else if (route.name === 'Notifications') {
                        iconName = 'bell';
                    } else if (route.name === 'Settings') {
                        iconName = 'cog';
                    }
                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
            })}
            tabBarOptions={{
                activeTintColor: blue,
                inactiveTintColor: 'gray',
                showLabel: false
            }}
        >
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
