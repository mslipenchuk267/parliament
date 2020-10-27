


export const parsingToken = (token, contactedIDs) => {

    /*
    FMC data contains identifier and payload
    */

    //Retrieve the payload and parse it into json obejct
    const payload = JSON.stringify(token.payload);
    const payloadjsonObject = JSON.parse(payload);

    // console.log(`The body is : ${getBody(payloadjsonObject)}\n`);
    // console.log(`The title is : ${getTitle(payloadjsonObject)}\n`);
    // console.log(`The infectedIDs is : ${getInfectedIDs(payloadjsonObject)}\n`);
    // console.log(`The 1st is : ${getInfectedIDsByIndex(payloadjsonObject.infectedIDs, 0)}\n`);
    // const InfectedID = getInfectedIDsByIndex(payloadjsonObject.infectedIDs, 0);
    // console.log(`The date is : ${getDataInfectedID(InfectedID)}\n`);
    // console.log(`The temple id is : ${getTempIdInfectedID(InfectedID)}\n`);

    do_matching(contactedIDs, payloadjsonObject.infectedIDs);

}

//working on and debuging---------------------->
export const do_matching = (userInfectedIDs, otherUserInfectedIDs) => {

    const userInfectedIDsLength = userInfectedIDs.length;
    const otherInfectedIDsLength = JSON.parse(otherUserInfectedIDs).length;
    const otherContactedids = JSON.parse(otherUserInfectedIDs);


    var newArray = [];

    for (let i = 0; i < otherInfectedIDsLength; i++) {
        // console.log(otherContactedids[i]);
        for (let j = 0; j < userInfectedIDsLength; j++) {
            if (otherContactedids[i].date === userInfectedIDs[j].date && otherUserInfectedIDs[i].tempId !== userInfectedIDs[j].tempId) {
                newArray.push(otherContactedids[i])
            }

        }

    }

    //filter  --- > debuging
    newArray = newArray.filter(function (val) {
        return userInfectedIDs.indexOf(val) == -1;
    });


    //others 
    console.log("\n users: \n")
    console.log(userInfectedIDs);
    console.log("\n others: \n\n")
    console.log(newArray);
    return newArray;
}

//working on and debuging---------------------->




//Return the body
export const getBody = (currentData) => {
    return currentData.body;
}

//Return the title
export const getTitle = (currentData) => {
    return currentData.title;
}

//Return InfectedIDS
export const getInfectedIDs = (currentData) => {
    return currentData.infectedIDs;
}


//Enter the index return the specific individuals within infectedIDs
export const getInfectedIDsByIndex = (currentData, index) => {
    const current = JSON.parse(currentData)[index];
    const current_to_string = JSON.stringify(current);
    return current_to_string;

}

//Return Infected TempID
export const getTempIdInfectedID = (InfectedID) => {
    const payloadjsonObject = JSON.parse(InfectedID);
    return payloadjsonObject.tempId;
}

//Return Infected Data
export const getDataInfectedID = (InfectedID) => {
    const payloadjsonObject = JSON.parse(InfectedID);
    return payloadjsonObject.date;
}




// {
//     "identifier": "0:1603745493050627%faed78fef9fd7ecd",
//         "payload":
//     {
        // "body": "You may have been exposed to COVID",
        // "from": "279035944613",
        // "google.c.sender.id": "279035944613",
        // "google.delivered_priority": "normal",
        // "google.message_id": "0:1603745493050627%faed78fef9fd7ecd",
        // "google.original_priority": "normal",
        // "google.sent_time": 1603745493039,
        // "google.ttl": 2419200,
        // "infectedIDs":
//         "[{\"date\":\"2020-10-26T20:32:24.482Z\",\"tempId\":\"1984014\"},{\"date\":\"2020-10-26T20:32:24.482Z\",\"tempId\":\"131d13d1\"}]",
//             "title": "Exposure Notification"
//     }
// }



