import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, StyleSheet, SafeAreaView, Button, Alert, ScrollView, StatusBar } from 'react-native'

import InvalidResponse from '../../components/InvalidResponse';
import NegativeResponse from '../../components/NegativeResponse';
import PositiveResponse from '../../components/PositiveResponse';
import * as userActions from '../../store/actions/user';
import { uploadTempIDs } from '../../helpers/submissionHelper';
import { isRefreshNeeded } from '../../helpers/authHelper';
import { offWhite } from '../../constants/colors';

/**
 * The QRPositiveScreen component houses the UI components 
 * @example
 * return (
 *   <QRPositiveScreen />
 * )
 */
const QRResultsScreen = (props) => {
  const tempIDs = useSelector(state => state.user.tempIDs);
  const accessToken = useSelector(state => state.user.accessToken);
  const accessTokenExpiration = useSelector(state => state.user.accessTokenExpiration);
  const dispatch = useDispatch();

  // set qrResult from props
  const qrResult = props.route.params?.result ?? "none";

  const handleVolunteerDataPress = async () => {
    Alert.alert(
      "Volunteer Data", //title of Alert Message
      "Are you sure you want to submit your data?", //Message under title
      [
        {
          text: "No", onPress: () => console.log("QRResultsScreen.js/handleVolunteerDataPress() - User Pressed No")
        },
        {
          text: "Yes", onPress: async () => {
            console.log("QRResultsScreen.js/handleVolunteerDataPress() - User Pressed Yes")
            console.log("QRResultsScreen.js/handleVolunteerDataPress() - User's accessToken expiration is", accessTokenExpiration)
            //if (isRefreshNeeded(accessTokenExpiration)) {
            await dispatch(userActions.refreshTokens());
            //}
            await uploadTempIDs(tempIDs, accessToken);
          }
        }
      ],
      { cancelable: false }
    )
  };


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle='dark-content' />
      <ScrollView contentContainerStyle={styles.container}>
        {qrResult === 'Positive' &&
          // Display response for positive result
          <PositiveResponse handlePress={handleVolunteerDataPress} />
        }
        {qrResult === 'Negative' &&
          // Display response for negative result
          <NegativeResponse />
        }
        {qrResult === 'none' &&
          // Display response for invalid result
          <InvalidResponse />
        }
      </ScrollView>
    </SafeAreaView>
  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: offWhite,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default QRResultsScreen;
