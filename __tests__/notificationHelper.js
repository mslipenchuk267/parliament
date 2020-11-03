import Notification from '../models/notification';
import { getNotifications, handleNotification, getInfectedIDs, removeDuplicateNotification, onSameDay } from '../helpers/notificationHelper';


describe('handleNotification', () => {
    it('should handle notification payload and return the correct unique notifications', () => {
        const mockNotification = {
            "payload": {
                "infectedIDs": "[{\"temp_id\":\"00000000-0000-0000-0000-905f5a19f5e9\",\"created_at\":\"2020-11-01T18:23:24.731Z\"},{\"temp_id\":\"00000000-0000-0000-0000-80df5b1111f2\",\"created_at\":\"2020-11-02T18:23:24.731Z\"},{\"temp_id\":\"00000000-0000-0000-0000-711fabfa2122\",\"created_at\":\"2020-11-03T18:23:24.731Z\"}]"
            }
        }
        const contactedIDs = [
            { "averageRssi": 80, "createdDate": "2020-11-03T18:23:24.731Z", "lastContactDate": "2020-11-03T18:23:24.731Z", "tempID": "00000000-0000-0000-0000-711fabfa2122", "totalScans": 1 },
            { "averageRssi": 20, "createdDate": "2020-11-02T18:23:24.731Z", "lastContactDate": "2020-11-02T18:23:24.731Z", "tempID": "00000000-0000-0000-0000-80df5b1111f2", "totalScans": 1 },
            { "averageRssi": 10, "createdDate": "2020-11-02T18:23:24.731Z", "lastContactDate": "2020-11-02T18:23:24.731Z", "tempID": "00000000-0000-0000-0000-80df5b1111f2", "totalScans": 1 },
            { "averageRssi": 9, "createdDate": "2020-11-01T18:23:24.731Z", "lastContactDate": "2020-11-01T18:23:24.731Z", "tempID": "00000000-0000-0000-0000-905f5a19f5e9", "totalScans": 1 },
            { "averageRssi": 21, "createdDate": "2020-11-01T18:23:24.731Z", "lastContactDate": "2020-11-01T18:23:24.731Z", "tempID": "00000000-0000-0000-0000-905f5a19f5e9", "totalScans": 1 }
        ]
        const result = handleNotification(mockNotification, contactedIDs);
        expectedResult = [new Notification("2020-11-02T18:23:24.731Z", 10), new Notification("2020-11-01T18:23:24.731Z", 9)];
        expect(result).toEqual(expectedResult)
    })

})

describe('getInfectedIDs', () => {
    it('should correctly parse stringified infectedIDs inside the payload of a notification', () => {
        const mockNotification = {
            "payload": {
                "infectedIDs": "[{\"temp_id\":\"00000000-0000-0000-0000-2a07d2ee2956\",\"created_at\":\"2020-11-02T15:53:33.630Z\"},{\"temp_id\":\"00000000-0000-0000-0000-1f375fe3a86b\",\"created_at\":\"2020-11-02T17:10:29.678Z\"},{\"temp_id\":\"00000000-0000-0000-0000-905f5a19f5e9\",\"created_at\":\"2020-11-02T18:09:26.610Z\"},{\"temp_id\":\"00000000-0000-0000-0000-f08332357cc6\",\"created_at\":\"2020-11-02T18:22:23.752Z\"},{\"temp_id\":\"00000000-0000-0000-0000-f08332357cc6\",\"created_at\":\"2020-11-02T18:22:23.758Z\"},{\"temp_id\":\"00000000-0000-0000-0000-00000000-0000-0000-0000-7bc89e49e0c9\",\"created_at\":\"2020-11-02T18:38:38.047Z\"},{\"temp_id\":\"00000000-0000-0000-0000-46b6418ead27\",\"created_at\":\"2020-11-02T18:38:38.056Z\"}]"
            }
        }
        const parsedInfectedIDs = getInfectedIDs(mockNotification)
        const expectedOutput = JSON.parse("[{\"temp_id\":\"00000000-0000-0000-0000-2a07d2ee2956\",\"created_at\":\"2020-11-02T15:53:33.630Z\"},{\"temp_id\":\"00000000-0000-0000-0000-1f375fe3a86b\",\"created_at\":\"2020-11-02T17:10:29.678Z\"},{\"temp_id\":\"00000000-0000-0000-0000-905f5a19f5e9\",\"created_at\":\"2020-11-02T18:09:26.610Z\"},{\"temp_id\":\"00000000-0000-0000-0000-f08332357cc6\",\"created_at\":\"2020-11-02T18:22:23.752Z\"},{\"temp_id\":\"00000000-0000-0000-0000-f08332357cc6\",\"created_at\":\"2020-11-02T18:22:23.758Z\"},{\"temp_id\":\"00000000-0000-0000-0000-00000000-0000-0000-0000-7bc89e49e0c9\",\"created_at\":\"2020-11-02T18:38:38.047Z\"},{\"temp_id\":\"00000000-0000-0000-0000-46b6418ead27\",\"created_at\":\"2020-11-02T18:38:38.056Z\"}]");
        expect(parsedInfectedIDs).toEqual(expectedOutput)
    })
})

describe('getNotifications', () => {
    it('should return contact if IDs match and averageRssi <= 70', () => {
        const contactedIDs = [
            { "averageRssi": 50, "createdDate": "2020-11-02T18:23:24.731Z", "lastContactDate": "2020-11-02T18:23:24.731Z", "tempID": "00000000-0000-0000-0000-905f5a19f5e9", "totalScans": 1 }
        ]
        const infectedIDs = [{ "temp_id": "00000000-0000-0000-0000-905f5a19f5e9", "created_at": "2020-11-02T18:23:24.731Z" }];
        const notifications = getNotifications(contactedIDs, infectedIDs);
        const expectedOutput = [new Notification("2020-11-02T18:23:24.731Z", 50)]
        expect(notifications).toEqual(expectedOutput)
    })

    it('should not return contact if IDs match and averageRssi > 70', () => {
        const contactedIDs = [
            { "averageRssi": 71, "createdDate": "2020-11-02T18:23:24.731Z", "lastContactDate": "2020-11-02T18:23:24.731Z", "tempID": "00000000-0000-0000-0000-905f5a19f5e9", "totalScans": 1 }
        ]
        const infectedIDs = [{ "temp_id": "00000000-0000-0000-0000-905f5a19f5e9", "created_at": "2020-11-02T18:23:24.731Z" }];
        const notifications = getNotifications(contactedIDs, infectedIDs);
        const expectedOutput = []
        expect(notifications).toEqual(expectedOutput)
    })

    it('should not return contact if IDs do not match and averageRssi <= 70', () => {
        const contactedIDs = [
            { "averageRssi": 50, "createdDate": "2020-11-02T18:23:24.731Z", "lastContactDate": "2020-11-02T18:23:24.731Z", "tempID": "00000000-0000-0000-0000-905f5a19f5e9", "totalScans": 1 }
        ]
        const infectedIDs = [{ "temp_id": "00000000-0000-0000-0000-815d5b19e3b4", "created_at": "2020-11-02T18:23:24.731Z" }];
        const notifications = getNotifications(contactedIDs, infectedIDs);
        const expectedOutput = []
        expect(notifications).toEqual(expectedOutput)
    })

    it('should not return contact if IDs do not match and averageRssi > 70', () => {
        const contactedIDs = [
            { "averageRssi": 71, "createdDate": "2020-11-02T18:23:24.731Z", "lastContactDate": "2020-11-02T18:23:24.731Z", "tempID": "00000000-0000-0000-0000-905f5a19f5e9", "totalScans": 1 }
        ]
        const infectedIDs = [{ "temp_id": "00000000-0000-0000-0000-815d5b19e3b4", "created_at": "2020-11-02T18:23:24.731Z" }];
        const notifications = getNotifications(contactedIDs, infectedIDs);
        const expectedOutput = []
        expect(notifications).toEqual(expectedOutput)
    })
})

describe('removeDuplicateNotifications', () => {
    it('should return 1 notification per day', () => {
        const duplicatedNotifications = [new Notification("2020-11-02T18:23:24.731Z", 10.10), new Notification("2020-11-02T15:23:24.731Z", 11.11), new Notification("2020-11-01T15:23:24.731Z", 22.22)]
        const result = removeDuplicateNotification(duplicatedNotifications)
        const expectedResult = [new Notification("2020-11-02T18:23:24.731Z", 10.10), new Notification("2020-11-01T15:23:24.731Z", 22.22)]
        expect(result).toEqual(expectedResult)
    })

    it('should update a unique notification\'s averagRssi if the duplicate\'s averageRssi is smaller', () => {
        const duplicatedNotifications = [new Notification("2020-11-02T18:23:24.731Z", 10.10), new Notification("2020-11-01T15:23:24.731Z", 22.22), new Notification("2020-11-02T15:23:24.731Z", 11.11),]
        const result = removeDuplicateNotification(duplicatedNotifications)
        expect(result[0].averageRssi).toEqual(10.10)
    })

    it('should keep a unique notification\'s averagRssi if the duplicate\'s averageRssi is larger', () => {
        const duplicatedNotifications = [new Notification("2020-11-02T18:23:24.731Z", 9.9), new Notification("2020-11-01T15:23:24.731Z", 22.22), new Notification("2020-11-02T15:23:24.731Z", 10.10),]
        const result = removeDuplicateNotification(duplicatedNotifications)
        expect(result[0].averageRssi).toEqual(9.9)
    })

    it('should keep a unique notification\'s averagRssi if the duplicate\'s averageRssi is equal', () => {
        const duplicatedNotifications = [new Notification("2020-11-02T18:23:24.731Z", 10.10), new Notification("2020-11-01T15:23:24.731Z", 22.22), new Notification("2020-11-02T15:23:24.731Z", 10.10),]
        const result = removeDuplicateNotification(duplicatedNotifications)
        expect(result[0].averageRssi).toEqual(10.10)
    })
})

describe('onSameDay', () => {
    it('should return true if provided date strings on same day', () => {
        const date1 = "2020-11-02T18:23:24.731Z"
        const date2 = "2020-11-02T12:13:24.731Z"
        const result = onSameDay(date1, date2)

        expect(result).toEqual(true)
    })

    it('should return false if provided dates are not on same day', () => {
        const date1 = "2020-11-02T18:23:24.731Z"
        const date2 = "2020-11-01T12:13:24.731Z"
        const result = onSameDay(date1, date2)

        expect(result).toEqual(false)
    })
})