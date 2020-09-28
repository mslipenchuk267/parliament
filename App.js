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


const rootReducer = combineReducers({
  user: userReducer
})

const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));

const App = () => {
  return (
    <Provider store={store}>
      <View>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <View>
            <Text>Is this working</Text>
          </View>
        </SafeAreaView>
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({

});

export default App;
