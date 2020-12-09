import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon, { Button } from '../node_modules/react-native-vector-icons/Entypo';

// UserNavigator screens 
import HomeScreen from '../screens/home/HomeScreen';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';
import SettingsScreen from '../screens/settings/SettingsScreen';
import QRScanningScreen from '../screens/qr/QRScanningScreen';
import QRResultsScreen from '../screens/qr/QRResultsScreen';
import StateSelectorScreen from '../screens/news/StateSelectorScreen';

// AuthNavigator screens
import AuthScreen from '../screens/auth/AuthScreen';
import SignInScreen from '../screens/auth/SignInScreen';
import SignUpScreen from '../screens/auth/SignUpScreen';

// Design imports
import { blue } from '../constants/colors';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

// UserNavigator Bottom Tab Component
const UserTabNavigator = createBottomTabNavigator();
// UserNavigator Stack Navigators (tabs)
const HomeStackNavigator = createStackNavigator();
const NewsStackNavigator = createStackNavigator();
const QRStackNavigator = createStackNavigator();
const NotificationStackNavigator = createStackNavigator();
const SettingsStackNavigator = createStackNavigator();
// AuthNavigator Stack Component 
const AuthStackNavigator = createStackNavigator();


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
                options={{ headerBackTitle: false, headerTitle: "", headerTransparent: true }}
            />
            <AuthStackNavigator.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ headerBackTitle: false, headerTitle: "", headerTransparent: true }}
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
                options={{ headerShown: false }}
            />
        </HomeStackNavigator.Navigator>
    )
}

/**
 * The NewsNavigator represents the news tab
 * in the bottom tab navigator. It manages all the screens
 * meant to be shown in the news tab. 
 * @example
 * return (
 *   <NewsNavigator />
 * )
 */
export const NewsNavigator = () => {
    return (
        <NewsStackNavigator.Navigator>
            <NewsStackNavigator.Screen
                name="News"
                component={StateSelectorScreen}
            />
        </NewsStackNavigator.Navigator>
    )
}

/**
 * The QRNavigator represents the camera tab
 * in the bottom tab navigator. It manages all the screens
 * meant to be shown in the QR tab. 
 * @example
 * return (
 *   <QRNavigator />
 * )
 */
export const QRNavigator = () => {
    // Use the useNavigation hook so we can navigate 
    // back in the header button in QRResults screen
    const navigation = useNavigation();
    return (
        <QRStackNavigator.Navigator>
            <QRStackNavigator.Screen
                name="QRScanning"
                component={QRScanningScreen}
                options={{
                    headerTitle: "QR Scanner",
                    headerTitleStyle: { color: 'white' },
                    headerTransparent: true,
                    headerBackTitleVisible: false
                }}
            />
            <QRStackNavigator.Screen
                name="QRResults"
                component={QRResultsScreen}
                options={{
                    headerTitle: "QR Results",
                    headerRight: () => (
                        <TouchableOpacity
                            onPress={() => navigation.dispatch(StackActions.replace('QRScanning'))}
                        >
                            <Text style={{color: blue, paddingRight: 15, fontSize: 16 }} >Scan Again</Text>
                        </TouchableOpacity>
                    ),
                }}
            />
        </QRStackNavigator.Navigator>
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
                options={{ headerTitle: "Notifications" }}
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
                    } else if (route.name === 'News') {
                        iconName = 'magnifying-glass';
                    } else if (route.name === 'QRScanning') {
                        iconName = 'camera';
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
                name="News"
                component={NewsNavigator}
            />

            <UserTabNavigator.Screen
                name="QRScanning"
                component={QRNavigator}
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
