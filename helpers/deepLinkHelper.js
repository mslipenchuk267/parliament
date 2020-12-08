import { Linking } from 'react-native';

/**
     * Open the link for testing site
     * @example
     * linkToSite();  
*/

export const linkToSite = async (siteLink) => {
    const supported = await Linking.canOpenURL(siteLink);
    if (supported) {
        // Opening the link with native browser, if the URL scheme is "http" the web link should be opened
        // by some browser in the mobile
        try {
            await Linking.openURL(siteLink);
        } catch (err) {
            console.error('An error occurred', err);
        }
    } else {
        //handles broken URL, without http, etc.
        Alert.alert(`Don't know how to open this URL: ${siteLink}`);
    }
}