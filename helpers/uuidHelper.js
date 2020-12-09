export const PARLIAMENT_SERVICE_UUID = '00001200-0000-1000-8000-00805f9b34fb';

/**
 * This function generates a random hexadecimal string of length 12
 * This is used to c
 * @return  {UID}  
 */
export const generateTempID = () => {
    const str = Math.floor(Math.random() * Math.pow(16, 12)).toString(16);
    const deviceKey = "0".repeat(12 - str.length) + str;
    return '00000000-0000-0000-0000-' + deviceKey;
}