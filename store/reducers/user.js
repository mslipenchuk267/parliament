import {
    UPDATE_ACCESS_TOKEN,
    SET_DID_TRY_AUTO_LOGIN,
    ADD_OR_UPDATE_CONTACT
} from '../../constants/ActionTypes';
import Contact from '../../models/contact';

const initialState = {
    accessToken: "",
    accessTokenExpiration: "",
    refreshToken: "",
    refreshTokenExpiration: "",
    contactedIDs: [],
    deviceToken: "",
    userID: "",
    notificationHistory: [],
    tempIDs: [],
    didTryAutoLogin: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case ADD_OR_UPDATE_CONTACT:
            // See if contact's tempID already exists 
            const savedContactIndex = state.contactedIDs.findIndex(savedContact => savedContact.tempID === action.tempID)
            const updatedContactedIDs = [...state.contactedIDs];
            // Update & Add logic --
            if (savedContactIndex >= 0) { // if the savedContactIndex exists, it's already been scanned before
                let lastContact = savedContactIndex[savedContactIndex]
                // Remove the contact we will replace with updates
                updatedContactedIDs.splice(savedContactIndex, 1);
                let updatedContact = new Contact(
                    action.tempID,
                    lastContact.averageRssi + ((action.rssi - lastContact.averageRssi) / lastContact.totalScans + 1), // Update Average rssi
                    lastContact.createdDate,
                    action.date, // updated lastContactDate
                    lastContact.totalScans = lastContact.totalScans + 1
                )
                return {
                    ...state,
                    contactedIDs: state.contactedIDs.concat(updatedContact)
                }
            } else { // Add contact
                let newContact = new Contact(
                    action.tempID,
                    action.rssi,
                    action.date,
                    action.date,
                    1
                )
                return {
                    ...state,
                    contactedIDs: state.contactedIDs.concat(newContact)
                }
            }
        case SET_DID_TRY_AUTO_LOGIN:
            return {
                ...state,
                didTryAutoLogin: true
            }
        case UPDATE_ACCESS_TOKEN:
            return {
                ...state,
                accessToken: newAccessToken,
                accessTokenExpiration: newAccessTokenExpiration
            }
        default:
            return state;
    }
}