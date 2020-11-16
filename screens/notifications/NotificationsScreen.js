import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList, StatusBar } from 'react-native'
import { useSelector } from 'react-redux';
import CustomListEmptyComponent from '../../components/CustomListEmptyComponent';
import Notification from '../../components/Notification';
import { offWhite } from '../../constants/colors';
import NotificationClass from '../../models/notification';

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
    //const notificationHistory = useSelector(state => state.user.notificationHistory);

    return (
        <SafeAreaView style={styles.container} >
            <StatusBar barStyle='dark-content'/>
            <FlatList
                contentContainerStyle={styles.sectionContainer}
                data={useSelector(state => state.user.notificationHistory)} // notificationHistory [new NotificationClass("2020-11-02T18:23:24.731Z", 10), new NotificationClass("2020-11-01T18:23:24.731Z", 9)]
                keyExtractor={(item) => item.date.toString()}
                renderItem={({ item }) => (
                    <Notification date={item.date} averageRssi={item.averageRssi} />
                )}
                ListEmptyComponent={
                    <CustomListEmptyComponent>
                        <Text style={styles.listEmptyText}>No exposures 🙏</Text>
                        <Text style={styles.listEmptyText}>Stay safe!</Text>
                    </CustomListEmptyComponent>
                }
            />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: offWhite,
    },
    sectionContainer: {
        paddingHorizontal: '8%',
        justifyContent: 'center'
    },
    listEmptyText: {
        paddingTop: 10,
        fontSize: 16
    }
});

export default NotificationsScreen;
