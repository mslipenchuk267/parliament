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

/**
 * This function contacts the AUTH api to upload the 
 * users deviceToken granted that they have one. 
 * @example 
 * if (isRefreshNeeded(accessTokenExpiration)) {
 *  // refresh token
 * }
 */
export const uploadDeviceToken = async (deviceToken, accessToken) => {
    console.log("authHelper.js/uploadDeviceToken() - Inside the function")
    
    if (deviceToken && accessToken) {
        // Assemble Request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "accessToken": accessToken, "deviceKey": deviceToken });
        console.log(raw);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        //
        const result = await fetch("http://a87713a1fd4b64cd4b788e8a1592de07-1206905140.us-west-2.elb.amazonaws.com/device_key", requestOptions)
        const resData = await result.json()

        // Error Check
        if (resData.error) {
            // alert user to error
            alert(resData.error)
            return;
        }
        console.log("authHelper.js/uploadDeviceToken() - Device Token Post Successful");
    } else {
        console.log("authHelper.js/uploadDeviceToken() - User does not have a deviceToken or accessToken")
        throw new Error("Please restart application")
    }

}