import {
    UPDATE_ACCESS_TOKEN
} from '../../constants/ActionTypes';

export const updateAccessToken = (newAccessToken, newAccessTokenExpiration) => {
    return {
        type: UPDATE_ACCESS_TOKEN,
        newAccessToken: newAccessToken,
        newAccessTokenExpiration: newAccessTokenExpiration
    }
}