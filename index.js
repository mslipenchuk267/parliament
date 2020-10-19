/**
 * @format
 */

import {AppRegistry, Platform} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

const appNamePlatform = Platform.OS === 'ios' ? "parliament" : "parliament_temple"

AppRegistry.registerComponent(appNamePlatform, () => App);
