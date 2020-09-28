import {
    UPDATE_ACCESS_TOKEN
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
    tempIDs: []
}

export default (state = initialState, action) => {
    switch(action.type) {
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