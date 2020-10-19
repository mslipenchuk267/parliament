
/**
 * This function determines if the accessToken needs to be refreshed.
 * This should be called before trying to upload a device key,
 * logging out, or deleting account. 
 * @param {boolean} accessTokenExpiration 
 * @example 
 * if (isRefreshNeeded(accessTokenExpiration)) {
 *  // refresh token
 * }
 */
export const isRefreshNeeded = (accessTokenExpiration) => {
    if (new Date() >= new Date(accessTokenExpiration)) {
        return true;
    } else {
        return false;
    }
}