import {
    UPDATE_ACCESS_TOKEN,
    SET_DID_TRY_AUTO_LOGIN,
    ADD_CONTACT,
    UPDATE_CONTACT,
    SET_CONTACT_IDS,
    AUTHENTICATE,
    UNAUTHENTICATE,
    REFRESH_TOKENS,
    SET_DEVICE_TOKEN,
    ADD_TEMP_ID,
    UPDATE_NOTIFICATION_HISTORY,
    SET_NOTIFICATION_HISTORY,
    CLEAR_CONTACTED_IDS,
    CLEAR_NOTIFICATION_HISTORY
} from '../../constants/ActionTypes';
import { deleteContactedIDs, saveContactedIDs, deleteUserAuth, saveUserAuth, deleteNotificationHistory, saveNotificationHistory } from '../../helpers/secureStoreHelper';
import Contact from '../../models/contact';
import { uploadDeviceToken } from '../../helpers/authHelper';

export const storeTempID = (tempID) => {
    return { type: ADD_TEMP_ID, tempID: tempID }
}

export const updateNotificationHistory = (matchedContacts) => {
    return async (dispatch, getState) => {
        dispatch({ type: UPDATE_NOTIFICATION_HISTORY, matchedContacts: matchedContacts });
        // deleteNotificationHistory from secore store
        await deleteNotificationHistory();
        const notificationHistory = [...getState().user.notificationHistory]
        await saveNotificationHistory(notificationHistory);
    }
}

export const setNotificationHistory = (notificationHistory) => {
    return { type: SET_NOTIFICATION_HISTORY, notificationHistory: notificationHistory }
}


export const setContactIDs = (contactedIDs) => {
    return { type: SET_CONTACT_IDS, contactedIDs: contactedIDs }
}

/**
 * This action creator updates the user state
 * with a refreshed access token provided by the
 * authentication API.
 * @property {string} newAccessToken - the refreshed access token
 * @property {Date} newAccessTokenExpiration - the expiration date of the refreshed access token
 * @return {Action} - an UPDATE_ACCESS_TOKEN action to be dispatched to the user reducer
 * @example  
 * await dispatch(updateAccessToken())
 */
export const updateAccessToken = (newAccessToken, newAccessTokenExpiration) => {
    return {
        type: UPDATE_ACCESS_TOKEN,
        newAccessToken: newAccessToken,
        newAccessTokenExpiration: newAccessTokenExpiration
    };
}

/**
 * This action creator sets that the user did
 * try to auto login on the startup screen.
 * This is what lets us display the user navigator.
 * @return {Action} - an SET_DID_TRY_AUTO_LOGIN action to be dispatched to the user reducer
 * @example  
 * await dispatch(setDidTryAutoLogin())
 */
export const setDidTryAutoLogin = () => {
    return { type: SET_DID_TRY_AUTO_LOGIN };
}

export const addFakeContact = (tempID, date) => {
    return async (dispatch, getState) => {
        const savedContactIndex = getState().user.contactedIDs.findIndex(savedContact => savedContact.tempID === tempID)
        // Determine if we add a new contact or update an existing one
        if (savedContactIndex >= 0) { // if the savedContactIndex exists, it's already been scanned before
            alert("This ID has already been added")
        } else {
            let newContact = new Contact(
                tempID,
                11.11,
                date,
                date,
                1 // first scan
            )
            dispatch({ type: ADD_CONTACT, newContact: newContact });
        }
        await deleteContactedIDs();
        const contactedIDs = [...getState().user.contactedIDs];
        await saveContactedIDs(contactedIDs);
    }
}

export const clearContactedIDs = () => {
    return { type: CLEAR_CONTACTED_IDS }
}

export const clearNotificationHistory = () => {
    return { type: CLEAR_NOTIFICATION_HISTORY }
}

/**
 * This action creator determines if the passed in tempID
 * is already in the contactedIDs user state and then either
 * dispatches an ADD_CONTACT action or UPDATE_CONTACT action.
 * @property {string} tempID - the contacted users temporary ID
 * @property {string} rssi - the connection signal strength at the time of contact
 * @property {Date} date - the date given at the time of contact
 * @return {Action} - an UPDATE_ACCESS_TOKEN action to be dispatched to the user reducer
 * @example  
 * await dispatch(addOrUpdateContact(characteristic[0].uuid, device.rssi, new Date()))
 */
export const addOrUpdateContact = (tempID, rssi, date) => {
    return async (dispatch, getState) => {
        const savedContactIndex = getState().user.contactedIDs.findIndex(savedContact => savedContact.tempID === tempID)
        const updatedContactedIDs = [...getState().user.contactedIDs];
        // Determine if we add a new contact or update an existing one
        if (savedContactIndex >= 0) { // if the savedContactIndex exists, it's already been scanned before
            let lastContact = updatedContactedIDs[savedContactIndex]
            console.log("Last Contact:", lastContact)
            // incrementally update this contacts averageRssi
            const updatedAverageRssi = lastContact.averageRssi + ((rssi - lastContact.averageRssi) / (lastContact.totalScans + 1))
            let updatedContact = new Contact(
                tempID,
                lastContact.averageRssi = updatedAverageRssi,
                lastContact.createdDate,
                lastContact.lastContactDate = date, // updated lastContactDate
                lastContact.totalScans = lastContact.totalScans + 1
            )
            console.log("Updated Contact:", updatedContact)
            try {
                await dispatch({ type: UPDATE_CONTACT, updatedContact: updatedContact });
            } catch {
                console.log("Could not dispatch updateContact")
            }
        } else { // tempID does not already exist in contactedIDs 
            let newContact = new Contact(
                tempID,
                rssi,
                date,
                date,
                1 // first scan
            )
            try {
                await dispatch({ type: ADD_CONTACT, newContact: newContact });
            } catch {
                console.log("Could not dispatch addContact")
            }
        }
        //await deleteContactedIDs();
        //const contactedIDs = [...getState().user.contactedIDs];
        await saveContactedIDs(getState().user.contactedIDs);
    }

}

export const addNewContact = (newContact) => {
    return { type: ADD_CONTACT, newContact: newContact }
}

export const updateContact = (updatedContact) => {
    return { type: UPDATE_CONTACT, updatedContact: updatedContact }
}

export const login = (username, password) => {
    return async (dispatch, getState) => {
        console.log("store/actions/user.js/login() - Received Params:", username, password)
        // Assemble http request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "username": username, "password": password });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // Send Request
        const result = await fetch("http://a87713a1fd4b64cd4b788e8a1592de07-1206905140.us-west-2.elb.amazonaws.com/login", requestOptions)
        // Format result
        const resData = await result.json()

        // Error Check
        if (resData.error) {
            // alert user to error
            alert(resData.error)
            return;
        }
        console.log("store/actions/user.js/login() - Login Request Successful")
        await dispatch(authenticate(
            resData.auth.accessToken,
            resData.auth.accessTokenExpiration,
            resData.auth.refreshToken,
            resData.auth.refreshTokenExpiration
        ))
        // Upload device token to AUTH api, need accessToken to do so
        uploadDeviceToken(getState().user.deviceToken, getState().user.accessToken);
        // Save userAuth data from database to secure store
        var userAuth = {
            "accessToken": resData.auth.accessToken,
            "accessTokenExpiration": resData.auth.accessTokenExpiration,
            "refreshToken": resData.auth.refreshToken,
            "refreshTokenExpiration": resData.auth.refreshTokenExpiration,
        }
        await deleteUserAuth();
        await saveUserAuth(userAuth);
    }
}

export const signup = (username, password) => {
    return async (dispatch, getState) => {
        console.log("store/actions/user.js/signup() - Received Params:", username, password)
        // Assemble http request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "username": username, "password": password });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // Send Request
        const result = await fetch("http://a87713a1fd4b64cd4b788e8a1592de07-1206905140.us-west-2.elb.amazonaws.com/users", requestOptions)
        // Format result
        const resData = await result.json()

        // Error Check
        if (resData.error) {
            // alert user to error
            alert(resData.error)
            return;
        }
        console.log("store/actions/user.js/signup() - Signup Request Successful")
        dispatch(authenticate(
            resData.auth.accessToken,
            resData.auth.accessTokenExpiration,
            resData.auth.refreshToken,
            resData.auth.refreshTokenExpiration
        ))
        // Upload device token to AUTH api, need accessToken to do so
        uploadDeviceToken(getState().user.deviceToken, getState().user.accessToken);
        // Save userAuth data from database to secure store
        var userAuth = {
            "accessToken": resData.auth.accessToken,
            "accessTokenExpiration": resData.auth.accessTokenExpiration,
            "refreshToken": resData.auth.refreshToken,
            "refreshTokenExpiration": resData.auth.refreshTokenExpiration,
        }
        await deleteUserAuth();
        await saveUserAuth(userAuth);
    }

}

export const logout = () => {
    return async (dispatch, getState) => {
        const accessToken = getState().user.accessToken;
        // Assemble http request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "accessToken": accessToken });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // Send Request
        const result = await fetch("http://a87713a1fd4b64cd4b788e8a1592de07-1206905140.us-west-2.elb.amazonaws.com/logout", requestOptions)
        // Format result
        const resData = await result.json()

        // Error Check
        if (resData.error) {
            // alert user to error
            alert(resData.error)
            return;
        }
        // reset user authentication data
        console.log("store/actions/user.js/logout() - Logout Request Successful")
        dispatch({ type: UNAUTHENTICATE });
        // remove the userAuth data from the secure store
        await deleteUserAuth();
    }
}

export const deleteAccount = () => {
    return async (dispatch, getState) => {
        const accessToken = getState().user.accessToken;
        const refreshToken = getState().user.refreshToken;
        // Assemble http request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "accessToken": accessToken, "refreshToken": refreshToken });

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const result = await fetch("http://a87713a1fd4b64cd4b788e8a1592de07-1206905140.us-west-2.elb.amazonaws.com/delete", requestOptions)
        // Format result
        const resData = await result.json()

        // Error Check
        if (resData.error) {
            // alert user to error
            alert(resData.error)
            return;
        }
        // reset user authentication data
        console.log("store/actions/user.js/deleteAccount() - Delete Request Successful")
        dispatch({ type: UNAUTHENTICATE });
        // remove the contactedIDs data from the secure store
        await deleteContactedIDs();
        await deleteNotificationHistory();
        // remove the userAuth data from the secure store
        await deleteUserAuth();
    }
}

export const refreshTokens = () => {
    return async (dispatch, getState) => {
        const refreshToken = getState().user.refreshToken
        // Assemble Request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "refreshToken": refreshToken });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // Send Request
        const result = await fetch("http://a87713a1fd4b64cd4b788e8a1592de07-1206905140.us-west-2.elb.amazonaws.com/refresh", requestOptions)
        // Format result
        const resData = await result.json()

        // Error Check
        if (!resData.auth.accessToken) {
            // alert user to error
            //alert(resData.error)
            await deleteUserAuth();
            return;
        }
        console.log("store/actions/user.js/refreshTokens() - Refresh Request Successful")
        dispatch(refresh(
            resData.auth.accessToken,
            resData.auth.accessTokenExpiration,
            resData.auth.refreshToken,
            resData.auth.refreshTokenExpiration
        ))// save new userAuth data to to secure store
        // Save userAuth data from database to secure store
        var userAuth = {
            "accessToken": resData.auth.accessToken,
            "accessTokenExpiration": resData.auth.accessTokenExpiration,
            "refreshToken": resData.auth.refreshToken,
            "refreshTokenExpiration": resData.auth.refreshTokenExpiration,
        }
        const deviceKey = getState().user.deviceToken;
        if (deviceKey) {
            await uploadDeviceToken(getState().user.deviceToken, resData.auth.accessToken);
        }
        await deleteUserAuth();
        await saveUserAuth(userAuth);
    }
}

export const setDeviceToken = (deviceToken) => {
    return { type: SET_DEVICE_TOKEN, deviceToken: deviceToken }
}

export const authenticate = (accessToken, accessTokenExpiration, refreshToken, refreshTokenExpiration) => {
    return {
        type: AUTHENTICATE,
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessTokenExpiration: accessTokenExpiration,
        refreshTokenExpiration: refreshTokenExpiration
    };
}

export const refresh = (accessToken, accessTokenExpiration, refreshToken, refreshTokenExpiration) => {
    return {
        type: REFRESH_TOKENS,
        accessToken: accessToken,
        refreshToken: refreshToken,
        accessTokenExpiration: accessTokenExpiration,
        refreshTokenExpiration: refreshTokenExpiration
    };
}