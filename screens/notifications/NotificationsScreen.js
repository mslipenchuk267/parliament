import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar } from 'react-native'
import { useSelector } from 'react-redux';
import Notification from '../../Components/Notification';

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
        <SafeAreaView style={styles.container} >
            <StatusBar barStyle='dark-content'/>
            <FlatList
                contentContainerStyle={styles.sectionContainer}
                data={notificationHistory} // notificationHistory
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <Notification date={item.date} averageRssi={item.averageRssi} />
                )}
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
    },
    sectionContainer: {
        paddingHorizontal: '8%'
    }
});

export default NotificationsScreen;
