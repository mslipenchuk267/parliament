import 'react-native';
import React from 'react';
import App from '../App';
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

import {
  UPDATE_ACCESS_TOKEN
} from '../constants/ActionTypes';
import * as userActions from '../store/actions/user';

it('renders correctly', () => {
  renderer.create(<App />);
});

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