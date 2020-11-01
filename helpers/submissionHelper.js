export const uploadTempIDs = async (tempIDs, accessToken) => {
    console.log("submissionHelper.js/uploadTempIDs() - Inside the function", tempIDs, accessToken)

    if (tempIDs && accessToken) {
        // Assemble Request
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "accessToken": accessToken, "tempIDs": tempIDs });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        const result = await fetch("http://a73906904480049e69678e0cb9be2e22-1728580132.us-east-2.elb.amazonaws.com/submit", requestOptions)
        const resData = await result.json()

        // Error Check
        if (resData.error) {
            // alert user to error
            alert(resData.error)
            return;
        }

        console.log("submissionHelper.js/uploadDeviceToken() - tempIDs Post Successful. Response from server:", resData.result);
        alert("Successfully Uploaded Data");
    } else {
        console.log("submissionHelper.js/uploadDeviceToken() - User does not have a tempIDs or accessToken")
        alert("Unknown error occurred, please try again.");
    }
}