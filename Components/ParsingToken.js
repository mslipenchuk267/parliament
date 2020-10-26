

export const parsing_token = (token) => {

    //Retrive the json data and parse it
    const payload = JSON.stringify(token.payload);
    const object = JSON.parse(payload);

    console.log(`\n\n`);

    // console.log(`The body is : ${GetBody(object)}\n`);
    // console.log(`The title is : ${GetTitle(object)}\n`);
    // console.log(`The infectedIDs is : ${GetInfectedIDs(object)}\n`);
    // console.log(`The 1st is : ${GetInfectedIDsByIndex(object.infectedIDs, 0)}\n`);
    console.log(`The date is : ${GetDataInfectedID(GetInfectedIDsByIndex(object.infectedIDs, 0))}\n`);
    console.log(`The temple id is : ${GetTempIdInfectedID(GetInfectedIDsByIndex(object.infectedIDs, 0))}\n`);
    
}



//Return the body
export const GetBody = (CurrentData) => {
    return CurrentData.body;
}

//Return the title
export const GetTitle = (CurrentData) => {
    return CurrentData.title;
}

//Return InfectedIDS
export const GetInfectedIDs = (CurrentData) => {
    return CurrentData.infectedIDs;
}


//Enter the index return the specific individuals within infectedIDs
export const GetInfectedIDsByIndex = (CurrentData, index) => {
    const current = JSON.parse(CurrentData)[index];
    const current_to_string = JSON.stringify(current);
    return current_to_string;

}

export const GetTempIdInfectedID = (InfectedID) => {
    const object = JSON.parse(InfectedID);

    return object.tempId;
}

export const GetDataInfectedID = (InfectedID) => {
    const object = JSON.parse(InfectedID);

    return object.date;
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



