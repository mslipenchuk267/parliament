import {saveContactedIDs} from '../helpers/secureStoreHelper'



export const parsingToken = (tokenFromFCM, contactedIDs) => {
    const  matchingInfectedIDs = infectedIDComparison(contactedIDs, tokenFromFCM.payload.infectedIDs);
}



/*
InfectedIDComparison will check the  payLoadFCMInfectedIDs and contactedIDs data see if there is a match. 
If there is, infectedIDComparison will check AverageRssi. If the AverageRssi <= 70. The Id will be push to the array
*/
export const infectedIDComparison = (contactedIDs, payLoadFCMInfectedIDs) => {

    //Get the length of both IDs 
    const contactedIDsLength = contactedIDs.length;
    const payLoadInfectedIDsLength = JSON.parse(payLoadFCMInfectedIDs).length;
    payLoadFCMInfectedIDs = JSON.parse(payLoadFCMInfectedIDs);

    //Initial new array contains InfectedIDs whose average RSSI is <= 70
    var FilterArray = [];

    for (let i = 0; i < payLoadInfectedIDsLength; i++) {
        for (let j = 0; j < contactedIDsLength; j++) {

            //Debug code; remove "//" to test
            // console.log("----------------------------");
            // console.log(payLoadFCMInfectedIDs[i].temp_id);
            // console.log(contactedIDs[j].tempID);


            //Logic 
            if (getTokenFromFCMTemp_id(payLoadFCMInfectedIDs, i) === getContactedIDsTempID(contactedIDs, j) && getContactedIDsAverageRssi(contactedIDs, j) <= 70) {

                FilterArray.push(contactedIDs[j]);
                
            }

        }
    }

    //Filter Remove Duplication within 2 JsonArray. 1: Others, who get infected tokenFromFCM; 2; Current users tokenFromFCM

    /*
    FilterArray = FilterArray.filter((FilterArray, index, contactedIDs) =>
    index === contactedIDs.findIndex((t) => (t.save === FilterArray.save && t.State === FilterArray.State)))
    console.log("JSON ARRAY : \n")
    */

    console.log("\n AverageRssi <= 70 \n -------------------------------");
    console.log(FilterArray);
    return FilterArray;
}


//Get Data from contactedIDs

//Return the tempID by giving index and contactedIDs
export const getContactedIDsTempID = (contactedIDs, index) => {
    return contactedIDs[index].tempID;
}

//Return the averageRssi by giving index and contactedIDs
export const getContactedIDsAverageRssi = (contactedIDs, index) => {
    return contactedIDs[index].averageRssi;
}

//Return the createdDate by giving index and contactedIDs
export const getContactedIDsCreatedDate = (contactedIDs, index) => {
    return contactedIDs[index].createdDate;
}

//Return the lastContactDate by giving index and contactedIDs
export const getContactedIDsLastContactDate = (contactedIDs, index) => {
    return contactedIDs[index].lastContactDate;
}

//Return the totalScans by giving index and contactedIDs
export const getContactedIDsTotalScans = (contactedIDs, index) => {
    return contactedIDs[index].totalScans;
}

//Get Data from payLoadFCMInfectedIDs

//Return the temp_id by giving index and contactedIDs
export const getTokenFromFCMTemp_id = (tokenFromFCM, index) => {
    return tokenFromFCM[index].temp_id;
}

//Return the created_at by giving index and contactedIDs
export const getTokenFromFCMCreated_at = (tokenFromFCM, index) => {
    return tokenFromFCM[index].created_at;

}