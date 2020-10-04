import {
    UPDATE_ACCESS_TOKEN,
    SET_DID_TRY_AUTO_LOGIN,
    ADD_CONTACT,
    UPDATE_CONTACT
} from '../../constants/ActionTypes';

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
        case ADD_CONTACT:
            return {
                ...state,
                contactedIDs: state.contactedIDs.concat(action.newContact)
            }
        case UPDATE_CONTACT:
            // remove the now outdated contact entry so we can replace it
            const contactedIndex = state.contactedIDs.findIndex(contact => contact.tempId === action.updatedContact.tempID)
            const updatedContactIDs = [...state.contactedIDs];
            // Make sure that the contact actually exists
            if (contactedIndex >= 0) {
                updatedContactIDs.splice(contactedIndex, 1); // remove old contact entry
                updatedContactIDs.splice(contactedIndex, 0, action.updatedContact); // replace with updated contact entry
                return {
                    ...state,
                    contactedIDs: updatedContactIDs
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
                accessToken: action.newAccessToken,
                accessTokenExpiration: action.newAccessTokenExpiration
            }
        default:
            return state;
    }
}