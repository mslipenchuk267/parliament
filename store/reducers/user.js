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
    ADD_TEMP_ID
} from '../../constants/ActionTypes';

const initialState = {
    username: "",
    accessToken: "",
    accessTokenExpiration: "",
    refreshToken: "",
    refreshTokenExpiration: "",
    contactedIDs: [],
    deviceToken: "",
    notificationHistory: [],
    tempIDs: [],
    didTryAutoLogin: false,
}

export default (state = initialState, action) => {
    switch (action.type) {
        case SET_CONTACT_IDS:
            return {
                ...state,
                contactedIDs: action.contactedIDs
            }
        case ADD_TEMP_ID:
            return {
                ...state,
                tempIDs: state.tempIDs.concat(action.tempID)
            }
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
        case AUTHENTICATE:
            return {
                ...state,
                username: action.username,
                accessToken: action.accessToken,
                accessTokenExpiration: action.accessTokenExpiration,
                refreshToken: action.refreshToken,
                refreshTokenExpiration: action.refreshTokenExpiration
            }
        case REFRESH_TOKENS:
            return {
                accessToken: action.accessToken,
                accessTokenExpiration: action.accessTokenExpiration,
                refreshToken: action.refreshToken,
                refreshTokenExpiration: action.refreshTokenExpiration
            }
        case SET_DEVICE_TOKEN:
            return {
                ...state,
                deviceToken: action.deviceToken
            }
        case UNAUTHENTICATE:
            return {
                ...initialState,
                didTryAutoLogin: true
            };
        default:
            return state;
    }
}