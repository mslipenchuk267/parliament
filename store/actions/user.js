import {
    UPDATE_ACCESS_TOKEN,
    SET_DID_TRY_AUTO_LOGIN,
    ADD_CONTACT,
    UPDATE_CONTACT,
    SET_CONTACT_IDS,
    AUTHENTICATE,
    LOGOUT
} from '../../constants/ActionTypes';
import { deleteContactedIDs, saveContactedIDs } from '../../helpers/secureStoreHelper';
import Contact from '../../models/contact';

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
        await deleteContactedIDs();
        const contactedIDs = [...getState().user.contactedIDs];
        await saveContactedIDs(contactedIDs);
    }

}

export const addNewContact = (newContact) => {
    return { type: ADD_CONTACT, newContact: newContact }
}

export const updateContact = (updatedContact) => {
    return { type: UPDATE_CONTACT, updatedContact: updatedContact }
}

export const attemptLogin = (username, password) => {
    return async (dispatch) => {
        console.log("in attemptLogin action creator with",username,password)
        dispatch(authenticate(username,"mocktoken","mockrefreshtoken","mockexpiration","mockrefreshexpiration"))

    }

}

export const attemptSignup = (username, password) => {
    return async (dispatch) => {
        console.log("in attemptSignup action creator with",username,password)
        dispatch(authenticate(username,"mocktoken","mockrefreshtoken","mockexpiration","mockrefreshexpiration"))

    }

}

export const logout = () =>{
    console.log("in logout action creator")
    return {type: LOGOUT};

}

export const authenticate = (username,accessToken,refreshToken,accessTokenExpiration,refreshTokenExpiration) => 
{
    return {type: AUTHENTICATE, username: username, accessToken:accessToken, refreshToken:refreshToken,accessTokenExpiration:accessTokenExpiration,refreshTokenExpiration:refreshTokenExpiration};
}