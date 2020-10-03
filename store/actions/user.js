import {
    UPDATE_ACCESS_TOKEN,
    SET_DID_TRY_AUTO_LOGIN,
    ADD_OR_UPDATE_CONTACT
} from '../../constants/ActionTypes';

export const updateAccessToken = (newAccessToken, newAccessTokenExpiration) => {
    return {
        type: UPDATE_ACCESS_TOKEN,
        newAccessToken: newAccessToken,
        newAccessTokenExpiration: newAccessTokenExpiration
    };
}

export const setDidTryAutoLogin = () => {
    return { type: SET_DID_TRY_AUTO_LOGIN };
}

export const addOrUpdateContact = (tempID, rssi, date) => {
    return {
        type: ADD_OR_UPDATE_CONTACT,
        tempID: tempID,
        rssi: rssi,
        date: date
    };
}