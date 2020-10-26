

export const parsing_token = (token) => {

    //Retrive the json data and parse it
    const payload = JSON.stringify(token.payload);
    const object = JSON.parse(payload);

    console.log(`\n\n`);

    // console.log(`The body is : ${GetBody(object)}\n`);
    // console.log(`The title is : ${GetTitle(object)}\n`);
    // console.log(`The infectedIDs is : ${GetInfectedIDs(object)}\n`);
    console.log(`The 1st is : ${GetInfectedIDsByIndex(object.infectedIDs, 0)}\n`);

}




export const GetBody = (CurrentData) => {
    return CurrentData.body;
}
export const GetTitle = (CurrentData) => {
    return CurrentData.title;
}
export const GetInfectedIDs = (CurrentData) => {
    return CurrentData.infectedIDs;
}
export const GetInfectedIDsByIndex = (CurrentData, index) => {
    //CurrentData is a string needs to fix here
    console.log(CurrentData[0]);
    return CurrentData[0];

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



