import { Notifications } from 'react-native-notifications';
import Notification from '../models/notification';

export const handleNotification = (notification, contactedIDs) => {
    const infectedIDs = getInfectedIDs(notification);
    const notifications = getNotifications(contactedIDs, infectedIDs);
    const uniqueNotifications = removeDuplicateNotification(notifications)
    return uniqueNotifications;
}

export const getInfectedIDs = (notification) => {
    const infectedIDs = JSON.parse(notification.payload.infectedIDs);
    return infectedIDs;
}

/*
InfectedIDComparison will check the  payLoadFCMInfectedIDs and contactedIDs data see if there is a match. 
If there is, infectedIDComparison will check AverageRssi. If the AverageRssi <= 70. The Id will be push to the array
*/
export const getNotifications = (contactedIDs, infectedIDs) => {
    // Init array that contains notifications where the contactID matched the infectedID and averageRssi <= 70
    var newNotifications = [];

    contactedIDs.forEach((contactedID) => {
        const index = infectedIDs.findIndex(infectedID => infectedID.temp_id === contactedID.tempID)
        if (index >= 0) {
            console.log({ matchedID: index, stats: "match" });
            if (infectedIDs[index].temp_id === contactedID.tempID && contactedID.averageRssi <= 70) {
                const newNotification = new Notification(contactedID.createdDate, contactedID.averageRssi)
                newNotifications.push(newNotification);
            }
        }
    })
    return newNotifications;
}

export const removeDuplicateNotification = (notifications) => {
    uniqueNotifications = []
    notifications.forEach((currentItem) => {
        const index = uniqueNotifications.findIndex(item => onSameDay(item.date, currentItem.date))
        if (index >= 0) {
            if (uniqueNotifications[index].averageRssi > currentItem.averageRssi) {
                uniqueNotifications[index].averageRssi = currentItem.averageRssi
            }
        } else {
            uniqueNotifications.push(currentItem)
        }
    })
    return uniqueNotifications;
}

export const onSameDay = (stringDate1, stringDate2) => {
    const date1 = new Date(stringDate1)
    const date2 = new Date(stringDate2)
    return date1.getFullYear() === date2.getFullYear() && // year matches
        date1.getMonth() === date2.getMonth() && // month matches
        date1.getDate() === date2.getDate(); // day matches
}

export const getDeviceToken = () => {
    Notifications.events().registerRemoteNotificationsRegistered(event => {
        // Set the device token state
        //dispatch(userActions.setDeviceToken(event.deviceToken));
        console.log('*********************** Device Token Received', event.deviceToken)
        return event.deviceToken
    })
    Notifications.events().registerRemoteNotificationsRegistrationFailed(event => {
        console.error(event)
    })
    Notifications.registerRemoteNotifications()
}