import * as userActions from '../store/actions/user';

export const handleDevice = async (error, device, dispatch, bleManager) => {
    // get services
    let services = device.serviceUUIDs
    // check if there are services being advertised
    if (services && services.includes('00001200-0000-1000-8000-00805f9b34fb')) {
        console.log("Scanned a device with name: " + device.name + " | " + device.id + " | " + device.rssi)
        console.log("Services:", services)
        try {
            device = await device.connect({ timeout: 1000 * 5 })
        } catch {
            console.log("Could not connect to:", device.name)
        }

        console.log("Connected to device: ", device.name)
        try {
            device = await device.discoverAllServicesAndCharacteristics()
            let characteristics = await device.characteristicsForService('00001200-0000-1000-8000-00805f9b34fb')
            console.log("************************Characteristic:", characteristics[0].uuid, " for device:", device.name)
            // Save or update the contacted device in the redux 
            try {
                await dispatch(userActions.addOrUpdateContact(characteristics[0].uuid, device.rssi, new Date()))
                console.log("Dispatched addOrUpdateContact() action creator")
            } catch {
                console.log("Could not dispatch addOrUpdateContact() action creator")
            }
        } catch {
            console.log("Could not get Discover services on:", device.name)
        }
        //while (device.isConnected()) {
            try {
                await bleManager.cancelDeviceConnection(device.id)
                console.log("Disconnected from device: ", device.name)
            } catch {
                console.log("Could not disconnect from device: ", device.name)
            }
        //}

    }
}