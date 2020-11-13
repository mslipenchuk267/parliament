import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.
import { fireEvent, render } from '@testing-library/react-native'

import {
  UPDATE_ACCESS_TOKEN
} from '../constants/ActionTypes';
import * as userActions from '../store/actions/user';
import { linkToSite } from '../helpers/deepLinkHelper';

/*
it('renders correctly', () => {
  const renderedApp = render(<App />);
});
*/

describe('Deep Linking Smoke Test', () => {
  it('should open correctly formatted url', async () => {
    const site = "https://gooogle.com"
    await expect(linkToSite(site)).resolves.not.toThrow()
  })
})

describe('Redux Store Smoke Test', () => {
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