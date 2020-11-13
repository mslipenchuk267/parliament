import React from 'react';
import { fireEvent, render } from '@testing-library/react-native'
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import userReducer from '../store/reducers/user';
import NotificationsScreen from '../screens/notifications/NotificationsScreen';


describe('StateSelectorScreen', () => {
    it('renders the ListEmptyComponent itself when user gives a search query with no results', () => {
        const rootReducer = combineReducers({
            user: userReducer
        })

        const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));


        const { getByTestId } = render(
            <Provider store={store}>
                <NotificationsScreen />
            </Provider>
        )

        // Give query that should return nothing
        expect(getByTestId('ListEmptyComponent')).not.toBeNull();
    })

    it('renders the ListEmptyComponent text when user gives a search query with no results', () => {
        const rootReducer = combineReducers({
            user: userReducer
        })

        const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)));


        const { queryByText } = render(
            <Provider store={store}>
                <NotificationsScreen />
            </Provider>
        )

        // Give query that should return nothing
        expect(queryByText('No exposures 🙏')).not.toBeNull();
        expect(queryByText('Stay safe!')).not.toBeNull();
    })
})
