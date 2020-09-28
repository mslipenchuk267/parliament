import {
    UPDATE_ACCESS_TOKEN,
    SET_DID_TRY_AUTO_LOGIN
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
    switch(action.type) {
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