import BackgroundService from 'react-native-background-actions'
import { Mutex } from 'async-mutex';
import { BleManager } from 'react-native-ble-plx';
import BLEPeripheral from 'react-native-ble-peripheral';
import Peripheral, { Service, Characteristic } from 'react-native-peripheral';

/**
 * Start background Advertising
 * @example
 * backgroundScanAdvert();  
*/
const backgroundScanAdvert = async () => {
    const mutex = new Mutex();
    try {
        bleManager.startDeviceScan(
            null, //[PARLIAMENT_SERVICE_UUID]
            { allowDuplicates: true },
            async (error, device) => {
                await mutex.runExclusive(async () => {
                    await handleDevice(error, device, dispatch, bleManager);
                });
            }
        )
    } catch (error) {
        console.log('bleManager not start scanning for devices', { error })
    }
    console.log("Start Scanning on ", Platform.OS)

    //Advertise
    if (Platform.OS === 'android') {
        if (BLEPeripheral.isAdvertising()) {
            BLEPeripheral.stop()
        }

        BLEPeripheral.setName('');
        // The contact tracing service UUID
        BLEPeripheral.addService(PARLIAMENT_SERVICE_UUID, true);
        // The 
        //BLEPeripheral.addService('00001200-0000-1000-8000-00805f9b34fa', true);
        const tempID = generateTempID();
        setTempID(tempID);
        BLEPeripheral.addCharacteristicToService(PARLIAMENT_SERVICE_UUID, tempID, 16 | 1, 8)

        BLEPeripheral.start()
            .then(res => {
                console.log("Started Advertising on Android: ", tempID)
            }).catch(error => {
                console.log(error)
            })
    } else {
        //if (Peripheral.isAdvertising()) {
        //    await Peripheral.stopAdvertising()
        //}
        const tempID = generateTempID();
        setTempID(tempID);
        // add tempID to redux state
        await dispatch(userActions.storeTempID(tempID));
        const ch = new Characteristic({
            uuid: tempID,
            value: '', // Base64-encoded string
            properties: ['read'],
            permissions: ['readable'],
        })
        const service = new Service({
            uuid: PARLIAMENT_SERVICE_UUID,
            characteristics: [ch],
        })

        // register GATT services that your device provides
        await Peripheral.addService(service)

        // start advertising to make your device discoverable
        // the contactTracingServiceUUID is only visible for other iOS devices and not for Android devices
        await Peripheral.startAdvertising({
            name: 'PiOS',
            serviceUuids: [PARLIAMENT_SERVICE_UUID, tempID],
        })
        console.log("Started Advertising on iOS: ", tempID)

    }
};

/**
 * Stop background scan Advertising
 * @example
 * stopScanAdvert();  
*/
const stopScanAdvert = async () => {
    bleManager.stopDeviceScan();

    if (Platform.OS === 'android') {
        await BLEPeripheral.stop()
        setTempID("None");
    } else {
        if (Peripheral.isAdvertising()) {
            return await Peripheral.stopAdvertising();
            setTempID("None");
        }
    }
}

/**
 * Stop background scan Advertising
 * @example
 * stopScanAdvert();  
*/
const backgroundOptions = {
    taskName: 'Parliament',
    taskTitle: 'BLE Background Detection',
    taskDesc: 'Running BLE scanning and advertising in the device background',
    // I think this has to be in the android/app/src/main/res folder
    taskIcon: {
        name: 'parliament_owl',
        type: 'mipmap',
    },
    color: '#ffffff',
    parameters: {
        delay: 1000,
    },
};


/**
 * This is for testing BackGroundService after I break something
 * @example
 * veryIntensiveTask();  
*/
const veryIntensiveTask = async () => {
    // Example of an infinite loop task
    await new Promise(async (resolve) => {
        for (let i = 0; i < 10; i++) {
            console.log(i);
        }
    });
};

/**
 * This function start all background service
 * 
*/
export async function startAllBackground() {
    await BackgroundService.start(backgroundScanAdvert, backgroundOptions);
}


/**
 * This function stop all background service 
 * 
*/
export async function stopAllBackground() {
    console.log("Stopping Background Service")
    stopScanAdvert;
    await BackgroundService.stop();
}