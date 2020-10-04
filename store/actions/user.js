import {
    UPDATE_ACCESS_TOKEN,
    SET_DID_TRY_AUTO_LOGIN,
    ADD_OR_UPDATE_CONTACT
} from '../../constants/ActionTypes';

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
 * This action creator updates the user state
 * by either adding a new contact entry or updating
 * an existing on in the contactedIDs user state.
 * @property {string} tempID - the contacted users temporary ID
 * @property {string} rssi - the connection signal strength at the time of contact
 * @property {Date} date - the date given at the time of contact
 * @return {Action} - an UPDATE_ACCESS_TOKEN action to be dispatched to the user reducer
 * @example  
 * await dispatch(addOrUpdateContact(characteristic[0].uuid, device.rssi, new Date()))
 */
export const addOrUpdateContact = (tempID, rssi, date) => {
    return {
        type: ADD_OR_UPDATE_CONTACT,
        tempID: tempID,
        rssi: rssi,
        date: date
    };
}