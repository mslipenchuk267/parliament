export const handleDevice = async (error, device) => {
    let services = device.serviceUUIDs

    // check if there are services being advertised
    if (services && services.includes('00001200-0000-1000-8000-00805f9b34fb')) {
        console.log("Scanned a device with name: " + device.name + " | " + device.rssi)
        console.log("Services:", services)
        await device.characteristicsForService()
        // await bleManager.connectToDevice(device.id)
        //console.log("Connected to device")
        //await bleManager.cancelDeviceConnection(device.id)
        //console.log("Disconnected from device")
    }
}