import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import { useSelector } from 'react-redux';

/**
 * The NotificationsScreen component houses the UI components 
 * and handler functions for displaying the users 
 * push notification history.
 * @example
 * return (
 *   <NotificationsScreen />
 * )
 */
const NotificationsScreen = () => {
    const notificationHistory = useSelector(state => state.user.notificationHistory);

    return (
        <SafeAreaView>
            <Text>This is the notifications screen</Text>
            <FlatList
                data={notificationHistory}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                <Text>{item.date} and {item.averageRssi}</Text>
                )}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({

});

export default NotificationsScreen;
