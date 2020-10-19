/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const appNamePlatform = Platform.OS === 'android' ? "parliament_tu" : "parliament"

AppRegistry.registerComponent(appNamePlatform, () => App);
