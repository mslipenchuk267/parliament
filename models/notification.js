/**
 * The contact class describes the information needed to describe
 * making contact with another parliament user.
 * @property {string} averageRssi - the average connection strength during the interaction
 * @property {Date} createdDate - the date given at the time of first contact
 * @return {Class} - returns a Contact class instance
 * @example  
 * // Adding a new contact
 * let newContact = new Contact(tempID, device.rssi, new Date(), new Date(), 1)
 * // Updating a new contact
 * lew updatedRssiAverage = (action.rssi - lastContact.averageRssi) / lastContact.totalScans + 1
 * let newContact = new Contact(characteristic[0].uuid, updatedRssiAverage,oldContact.createdDate, new Date(), oldContact.totalScans +1)
 */
class Notification {
    constructor(date, averageRssi) {
        this.date = date,
        this.averageRssi = averageRssi
    }
};

export default Notification;