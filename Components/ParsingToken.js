export const parsingToken = (token, contactedIDs) => {

    /*
    FMC data contains identifier and payload
    */

    //Retrieve the payload and parse it into json obejct
    const payload = JSON.stringify(token.payload);
    const payloadjsonObject = JSON.parse(payload);

    /*
        //Example of calling functions below
        console.log(`The body is : ${getBody(payloadjsonObject)}\n`);
        console.log(`The title is : ${getTitle(payloadjsonObject)}\n`);
        console.log(`The infectedIDs is : ${getInfectedIDs(payloadjsonObject)}\n`);
        console.log(`The 1st is : ${getInfectedIDsByIndex(payloadjsonObject.infectedIDs, 0)}\n`);
        const InfectedID = getInfectedIDsByIndex(payloadjsonObject.infectedIDs, 0);
        console.log(`The date is : ${getDataInfectedID(InfectedID)}\n`);
        console.log(`The temple id is : ${getTempIdInfectedID(InfectedID)}\n`);
    */


    infectedIDComparison(contactedIDs, payloadjsonObject.infectedIDs);
}

//InfectedIDComparison will return a json array which contains people who get infected and filter the user's token 
export const infectedIDComparison = (userInfectedIDs, otherUserInfectedIDs) => {

    //Get the length of jsonArray
    const userInfectedIDsLength = userInfectedIDs.length;
    const otherInfectedIDsLength = JSON.parse(otherUserInfectedIDs).length;

    //Parse otherUserInfectedIDs
    const otherContactedids = JSON.parse(otherUserInfectedIDs);


    //Initial new array contains otherUserInfectedIDs if other users has same day with current user get infected
    var otherNewArray = [];

    for (let i = 0; i < otherInfectedIDsLength; i++) {
        for (let j = 0; j < userInfectedIDsLength; j++) {
            //Check if the date is match 
            if (otherContactedids[i].date === userInfectedIDs[j].date && otherUserInfectedIDs[i].tempId !== userInfectedIDs[j].tempId) {
                otherNewArray.push(otherContactedids[i])
            }
        }
    }

    //Filter Remove Duplication within 2 JsonArray. 1: Others, who get infected token; 2; Current users token
    otherNewArray = otherNewArray.filter((otherNewArray, index, userInfectedIDs) =>
        index === userInfectedIDs.findIndex((t) => (t.save === otherNewArray.save && t.State === otherNewArray.State)))
    console.log(otherNewArray);
    return otherNewArray;
}




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




