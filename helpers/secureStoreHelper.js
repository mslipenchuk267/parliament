import * as SecureStore from 'expo-secure-store';

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