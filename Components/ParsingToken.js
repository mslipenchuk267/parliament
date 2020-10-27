


export const parsingToken = (token, contactedIDs) => {

    //Retrive the json data and parse it
    const payload = JSON.stringify(token.payload);
    const object = JSON.parse(payload);


    console.log(`\n\n`);

    // console.log(`The body is : ${getBody(object)}\n`);
    // console.log(`The title is : ${getTitle(object)}\n`);
    // console.log(`The infectedIDs is : ${getInfectedIDs(object)}\n`);
    // console.log(`The 1st is : ${getInfectedIDsByIndex(object.infectedIDs, 0)}\n`);
    // const InfectedID = getInfectedIDsByIndex(object.infectedIDs, 0);
    // console.log(`The date is : ${getDataInfectedID(InfectedID)}\n`);
    // console.log(`The temple id is : ${getTempIdInfectedID(InfectedID)}\n`);

    // console.log("working")
    do_matching(contactedIDs, object.infectedIDs);

}

//working on and debuging---------------------->
export const do_matching = (others_contactedIDs, mine_contactedIDs) => {
    const other_len = others_contactedIDs.length;
    const mine_len = JSON.parse(mine_contactedIDs).length;
    const mine_contactedids = JSON.parse(mine_contactedIDs);

    var return_array = [];

    for (let i = 0; i < other_len; i++) {
        const other_id = others_contactedIDs[i]
        const other_date = other_id.date;
        const other_templeid = other_id.tempId

        for (let j = 0; j < mine_len; j++) {


            const mine_id = mine_contactedids[j];
            const mine_date = mine_id.date;
            const mine_templeid = mine_id.tempId;

            console.log(`other date ${other_date} mine date ${mine_date}`)
            if (other_date === mine_date) {

                return_array.push(other_templeid);
            }
        }
    }


    console.log(return_array);
    return return_array;
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
    const object = JSON.parse(InfectedID);
    return object.tempId;
}

//Return Infected Data
export const getDataInfectedID = (InfectedID) => {
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



