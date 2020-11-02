import { Alert } from 'react-native';

/**
 * This function uploads the users temporaryIDs to the database.
 * It first encodes the tempIDs into a JWT array 
 * @param {string array} userJWTtempIDs - this an array of the users generated tempIDs encoded into JWTs to send to the server
 * @param {string} accessToken This is the users JWT accessToken provided by Auth API
 */
export const uploadTempIDs = async (tempIDs, accessToken) => {
    console.log("submitHelper.js/uploadTempIDs() - Inside the function")
    if (tempIDs && accessToken) {
        const userJWTtempIDs = convertToJWTs(tempIDs);
        // Assemble Request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var raw = JSON.stringify({ "accessToken": accessToken, "tempIdTokens": userJWTtempIDs });
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        // Send the request
        const result = await fetch("http://a73906904480049e69678e0cb9be2e22-1728580132.us-east-2.elb.amazonaws.com/submit", requestOptions)
        const resData = await result.json()

        // Error Check
        if (resData.error) {
            // alert user to error
            alert(resData.error)
            return;
        } else if (resData.result) {
            Alert.alert("Successfully uploaded Data!")
            console.log("submitHelper.js/uploadTempIDs() - Received result from server:", resData.result)
        } else {
            console.log("submitHelper.js/uploadTempIDs() - Received unexpected result from server:", resData)
        }
    } else {
        console.log("submitHelper.js/uploadTempIDs() - User does not have a deviceToken or accessToken")
    }

}
