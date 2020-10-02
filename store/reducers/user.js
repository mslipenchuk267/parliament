/**
 * initialState variables
 */
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

/**
 * Helps to check if user has tried logging in
 * Exceptions: Null when the user is not authenticated or logs out
 * This is a function that process 
 * @param: state and action
 * the default value of state is initial state
 * json is created by action creator 
 */
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