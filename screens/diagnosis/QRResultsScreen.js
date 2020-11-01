import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, Button, Alert, ScrollView } from 'react-native'
import CustomButton from '../../Components/CustomButton';
import InvalidResponse from '../../Components/InvalidResponse';
import NegativeResponse from '../../Components/NegativeResponse';
import PositiveResponse from '../../Components/PositiveResponse';

/**
 * The QRPositiveScreen component houses the UI components 
 * @example
 * return (
 *   <QRPositiveScreen />
 * )
 */
const QRResultsScreen = (props) => {
  // set qrResult from props
  const qrResult = props.route.params?.result ?? "none";

  const handleVolunteerDataPress = () => {
    Alert.alert(
      "Results: Positive",//title of Alert Message
      "Would you like to submit your data to us?", //Message under title
      [
        {
          text: "No", onPress: () => console.log("Pressed No")
        },
        {
          text: "Yes", onPress: () => console.log("Pressed Yes")
        }
      ],
      { cancelable: false }
    )
  };


  return (
    <SafeAreaView style={styles.container}>
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
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  titleBold: {
    fontWeight: 'bold',
    fontSize: 20
  },
  title: {
    fontSize: 20
  },
  note: {
    fontStyle: "italic",
    fontSize: 20
  }
});

export default QRResultsScreen;
