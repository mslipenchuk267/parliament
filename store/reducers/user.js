import {
    UPDATE_ACCESS_TOKEN,
    SET_DID_TRY_AUTO_LOGIN,
    ADD_CONTACT,
    UPDATE_CONTACT,
    SET_CONTACT_IDS,
    AUTHENTICATE,
    UNAUTHENTICATE,
    REFRESH_TOKENS,
    SET_DEVICE_TOKEN
} from '../../constants/ActionTypes';

const initialState = {
    username: "",
    accessToken: "",
    accessTokenExpiration: "",
    refreshToken: "",
    refreshTokenExpiration: "",
    contactedIDs: [    { tempID: "m25wlinci", averageRssi: 45.2345, createdDate: "2020-10-28T12:10:35.484Z", lastContactDate: "2020-10-28T14:10:35.484Z", totalScans: 34 },
    { tempID: "4k898uvub", averageRssi: 96.1543, createdDate: "2020-10-26T12:10:35.484Z", lastContactDate: "2020-10-26T14:10:35.484Z", totalScans: 45 },
    { tempID: "wat0xifq5", averageRssi: 43.3687, createdDate: "2020-09-28T11:47:14.477Z", lastContactDate: "2020-10-26T14:10:35.484Z", totalScans: 30 },
    { tempID: "v7wlenoz2", averageRssi: 22.2345, createdDate: "2020-10-26T12:10:35.484Z", lastContactDate: "2020-10-26T14:10:35.484Z", totalScans: 20 },
    { tempID: "6foc7523b", averageRssi: 53.2345, createdDate: "2020-10-26T12:10:35.484Z", lastContactDate: "2020-10-26T14:10:35.484Z", totalScans: 80 },
    { tempID: "vwvxjfnga", averageRssi: 26.2345, createdDate: "2020-10-26T12:10:35.484Z", lastContactDate: "2020-10-26T14:10:35.484Z", totalScans: 60 },
    { tempID: "pbc4xm6ma", averageRssi: 77.2345, createdDate: "2020-10-26T12:10:35.484Z", lastContactDate: "2020-10-26T14:10:35.484Z", totalScans: 50 },
    { tempID: "vdkpgsu0x", averageRssi: 70.0000, createdDate: "2020-10-26T12:10:35.484Z", lastContactDate: "2020-10-26T14:10:35.484Z", totalScans: 45 }],
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