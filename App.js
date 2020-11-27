import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
  YellowBox,
  LogBox,
} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './store/reducers/user';
import AppNavigator from './navigation/AppNavigator';
import PushNotificationManager from './components/PushNotificationManager';
import Toast from 'react-native-toast-message';
LogBox.ignoreLogs([
  'Require cycle:', // issued by the fetch() function -> doesn't affect anything
  'VirtualizedLists should never be nested' // issued by the scanned device flat list in lcdview on homescreen
])


const rootReducer = combineReducers({
  user: userReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

/**
 * This is the first component called at 
 * application start and is the parent 
 * component of the app.
 * This component wraps the parent navigator
 * with a Redux Provider.
 * 
 * @example
 * return (
 *   <App />
 * )
 */
const App = () => {
  return (
    <Provider store={store}>
      <PushNotificationManager>
        <AppNavigator />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </PushNotificationManager>
    </Provider>
  );
};

export default App;
