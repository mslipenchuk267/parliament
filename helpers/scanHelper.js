import * as userActions from '../store/actions/user';
import { PARLIAMENT_SERVICE_UUID } from './uuidHelper';


/**
   * this function connect to bluetooth advertising device, collect the data and extra the temple ID 
   * @return  {void}  
   * @example
   * handleDevice
*/
export const handleDevice = async (error, device, dispatch, bleManager) => {
    // get services and rssi
    let services = device.serviceUUIDs
    let rssi = device.rssi
    // check if there are services being advertised
    if (services && services.includes(PARLIAMENT_SERVICE_UUID)) {
        console.log("Scanned a device with name: " + device.name + " | " + device.id + " | " + rssi)

        console.log("Services:", services)
        try {
            device = await device.connect({ timeout: 1000 * 5 })
        } catch {
            console.log("Could not connect to:", device.name)
        }

        console.log("Connected to device: ", device.name)
        try {
            device = await device.discoverAllServicesAndCharacteristics()
            let characteristics = await device.characteristicsForService(PARLIAMENT_SERVICE_UUID)
            console.log("************************Characteristic:", characteristics[0].uuid, " for device:", device.name)
            // Save or update the contacted device in the redux 
            try {
                await dispatch(userActions.addOrUpdateContact(characteristics[0].uuid, rssi, new Date()))
                console.log("Finished dispatching addOrUpdateContact() action creator")
            } catch {
                console.log("Could not dispatch addOrUpdateContact() action creator")
            }
        } catch {
            console.log("Could not get Discover services on:", device.name)
        }
        // try {
        //     await bleManager.cancelDeviceConnection(device.id)
        //     console.log("Disconnected from device: ", device.name)
        // } catch {
        //     console.log("Could not disconnect from device: ", device.name)
        // }

    }
}