import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.
import { fireEvent, render } from '@testing-library/react-native'

import {
  UPDATE_ACCESS_TOKEN
} from '../constants/ActionTypes';
import * as userActions from '../store/actions/user';
import { linkToSite } from '../helpers/deepLinkHelper';
import { filterStates } from '../helpers/filterHelper';
import { states } from '../constants/states';
import StateSelectorScreen from '../screens/diagnosis/StateSelectorScreen';

/*
it('renders correctly', () => {
  renderer.create(<App />);
});
*/


describe('Deep Linking', () => {
  it('should open correctly formatted url', async () => {
    const site = "https://gooogle.com"
    await expect(linkToSite(site)).resolves.not.toThrow()
  })
})

describe('filterState function', () => {
  it('should filter all states that have p in their name', () => {
    const filterResult = filterStates(states, "p");
    const expectedResult = [{stateName: "Mississippi", stateCode: "MS"}, {stateName: "New Hampshire", stateCode: "NH"}, {stateName: "Pennsylvania", stateCode: "PA"}]

    expect(filterResult).toEqual(expectedResult)
  })

  it('should return same results for uppercase and lowercase query', () => {
    const lowerCaseFilterResult = filterStates(states, "n");
    const upperCaseFilterResult = filterStates(states, "N");

    expect(lowerCaseFilterResult).toEqual(upperCaseFilterResult)
  })

  it('should return all states for null query', () => {
    const filterResult = filterStates(states, "");

    expect(filterResult).toEqual(states);
  })
})

describe('StateSelectorScreen', () => {
  it('should display filtered states', () => {
    const {getByTestId, queryByText} = render(<StateSelectorScreen />)
    
    // Give query that should return nothing
    fireEvent.changeText(getByTestId("stateSearchBar"), "new");
    expect(queryByText('New Hampshire')).not.toBeNull();
    expect(queryByText('New Jersey')).not.toBeNull();
    expect(queryByText('New Mexico')).not.toBeNull();
    expect(queryByText('New York')).not.toBeNull();
  })

  it('renders the ListEmptyComponent text when user gives a search query with no results', () => {
    const {getByTestId, queryByText} = render(<StateSelectorScreen />)
    
    // Give query that should return nothing
    fireEvent.changeText(getByTestId("stateSearchBar"), "weefwfwefwe");
    expect(queryByText('no results found 🕵️')).not.toBeNull();
    expect(queryByText('please try another query')).not.toBeNull();
  })
})

describe('Redux Store Updates', () => {
  it('should create an action to update accessToken and accessTokenExpiration', () => {
    const accessToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c"
    const accessTokenExpiration = new Date()

    const expectedAction = {
      type: UPDATE_ACCESS_TOKEN,
      newAccessToken: accessToken,
      newAccessTokenExpiration: accessTokenExpiration
    }
    expect(userActions.updateAccessToken(accessToken, accessTokenExpiration)).toEqual(expectedAction)

  })
})