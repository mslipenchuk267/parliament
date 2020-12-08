import * as SecureStore from 'expo-secure-store';

/**
 * This function deletes the userAuth json saved in persistent storage
 * if it exists
 * @return {Promise<void>} 
 */
export const deleteUserAuth = async () => {
    try {
        await SecureStore.deleteItemAsync('userAuth')
        console.log("secureStoreHelper.js/deleteUserAuth() - Deleted userAuth from secure store")
    } catch (err) {
        console.log("secureStoreHelper.js/deleteUserAuth() - Could not delete userAuth from secure store, error:", err)
    }
}

/**
 * This function prepares and saves the userAuth json
 * to the secure store.
 * @param {Array} userAuth 
 */
export const saveUserAuth = async (userAuth) => {
    try {
        await SecureStore.setItemAsync('userAuth', JSON.stringify(userAuth))
        console.log("secureStoreHelper.js/saveUserAuth() - Saved userAuth to secure store")
    } catch (err) {
        console.log("secureStoreHelper.js/saveUserAuth() - Could not save userAuth to secure store, error:", err)
    }
}

/**
 * This function gets the userAuth json saved to the secure store. 
 * @return {Promise<Array>} contactedIDs - returns contactedIDs saved in redux store
 */
export const getUserAuth = async () => {
    try {
        const userAuth = await SecureStore.getItemAsync('userAuth');
        if (userAuth) {
            const transformedUserAuth = JSON.parse(userAuth);
            console.log("secureStoreHelper.js/getUserAuth() - Retrieved userAuth from secure store", transformedUserAuth)
            return transformedUserAuth;
        }
    } catch {
        console.log("secureStoreHelper.js/getUserAuth() - Could not get userAuth from secure store, error:", err)
    }
}

/**
 * This function prepares and saves the contactedIDs array
 * to the secure store.
 * @param {Array} contactedIDs 
 */
export const saveContactedIDs = async (contactedIDs) => {
    try {
        await SecureStore.setItemAsync('contactedIDs', JSON.stringify(contactedIDs))
        console.log("secureStoreHelper.js/saveContactedIDs() - Saved contactedIDs to secure store")
    } catch (err) {
        console.log("secureStoreHelper.js/saveContactedIDs() - Could not save contactedIDs to secure store, error:", err)
    }
}

/**
 * This function gets the contactedIDs saved to the secure store. 
 * @return {Promise<Array>} contactedIDs - returns contactedIDs saved in redux store
 */
export const getContactedIDs = async () => {
    try {
        const contactedIDs = await SecureStore.getItemAsync('contactedIDs');
        if (contactedIDs) {
            const transformedContactedIds = JSON.parse(contactedIDs);
            console.log("secureStoreHelper.js/getContactedIDs() - Retrieved contactedIDs from secure store", transformedContactedIds)
            return transformedContactedIds;
        }
    } catch {
        console.log("secureStoreHelper.js/getContactedIDs() - Could not get contactedIDs from secure store, error:", err)
    }
}

/**
 * This function deletes the contactedIDs array saved in persistent storage
 * if it exists
 * @return {Promise<void>} 
 */
export const deleteContactedIDs = async () => {
    try {
        await SecureStore.deleteItemAsync('contactedIDs')
        console.log("secureStoreHelper.js/deleteContactedIDs() - Deleted contactedIDs from secure store")
    } catch (err) {
        console.log("secureStoreHelper.js/deleteContactedIDs() - Could not delete contactedIDs from secure store, error:", err)
    }
}
/**
 * This function deletes the notification historys
 * if it exists
 * @return {Promise<void>} 
 */

export const deleteNotificationHistory = async () => {
    try {
        await SecureStore.deleteItemAsync('notificationHistory')
        console.log("secureStoreHelper.js/deleteNotificationHistory() - Deleted NotificationHistory from secure store")
    } catch (err) {
        console.log("secureStoreHelper.js/deleteNotificationHistory() - Could not delete NotificationHistory from secure store, error:", err)
    }
}

/**
 * This function gets the notification historys
 * if it exists
 * @return {Promise<void>} return the notification history 
 */
export const getNotificationHistory = async () => {
    try {
        const notificationHistory = await SecureStore.getItemAsync('notificationHistory');
        if (notificationHistory) {
            const transformedNotificationHistory = JSON.parse(notificationHistory);
            console.log("secureStoreHelper.js/getNotificationHistory() - Retrieved notificationHistory from secure store", transformedNotificationHistory)
            return transformedNotificationHistory;
        }
    } catch {
        console.log("secureStoreHelper.js/getNotificationHistory() - Could not get notificationHistory from secure store, error:", err)
    }
}

/**
 * This function will save the notification historys
 * @return {Promise<void>} 
 */
export const saveNotificationHistory = async (notificationHistory) => {
    try {
        await SecureStore.setItemAsync('notificationHistory', JSON.stringify(notificationHistory))
        console.log("secureStoreHelper.js/saveNotificationHistory() - Save saveNotificationHistory from secure store")
    } catch (err) {
        console.log("secureStoreHelper.js/saveNotificationHistory() - Could not Save saveNotificationHistory from secure store, error:", err)
    }
}

