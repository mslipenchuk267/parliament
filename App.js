import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  StatusBar,
} from 'react-native';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from './store/reducers/user';
import AppNavigator from './navigation/AppNavigator';

const rootReducer = combineReducers({
  user: userReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

/**
 * App Component.
 *
 * @example
 * return (
 *   <App />
 * )
 */
const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
