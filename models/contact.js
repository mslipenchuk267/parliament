/**
 * The contact class describes the information needed to describe
 * making contact with another parliament user.
 * @property {string} tempID - the contacted users temporary ID
 * @property {string} averageRssi - the average connection strength during the interaction
 * @property {Date} createdDate - the date given at the time of first contact
 * @property {Date} lastContactDate - the date given at the time of most recent contact
 * @property {int} totalScans - the total amount of times the same device was scanned. This is also used to incrementally update the averageRssi.
 * @return {Class} - returns a Contact class instance
 * @example  
 * // Adding a new contact
 * let newContact = new Contact(tempID, device.rssi, new Date(), new Date(), 1)
 * // Updating a new contact
 * lew updatedRssiAverage = (action.rssi - lastContact.averageRssi) / lastContact.totalScans + 1
 * let newContact = new Contact(characteristic[0].uuid, updatedRssiAverage,oldContact.createdDate, new Date(), oldContact.totalScans +1)
 */
class Contact {
    constructor(tempID, averageRssi, createdDate, lastContactDate, totalScans ) {
        this.tempID = tempID;
        this.averageRssi = averageRssi,
        this.createdDate = createdDate,
        this.lastContactDate = lastContactDate, 
        this.totalScans = totalScans
    }
};

export default Contact;