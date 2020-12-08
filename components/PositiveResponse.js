import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomButton from './CustomButton';

/**
 * The PositiveResponse function returns a message to users that
 * they have been infected by COVID and to socially distance after the user
 * has scanned the positive QR Code.
 * @example
 * return (
 *   <PositiveResponse />
 * )
 */
const PositiveResponse = (props) => {
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.title}  >
          Your result was <Text style={styles.titleBold} >Positive</Text>
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.body} >
          Please socially isolate yourself for the next 14 days and follow the advice of your medical professional.
        </Text>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.titleBold} >OPTIONAL:</Text>
        <Text style={styles.body}>
          Help make your community safer by volunteering your anonymous temporary IDs over the past 14 days.
        </Text>
      </View>
      <View style={{...styles.textContainer, marginHorizontal: '15%'}} >
        <CustomButton title={"Volunteer Data"} handlePress={props.handlePress} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.note} >Note:</Text>
        <Text style={styles.body}>
          Your data cannot be used to determine your identity, location, or who you interacted with.
          Other users will simply be alerted of the date and proximity of the potential exposure.
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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
  body: {
    fontSize: 16
  },
  note: {
    fontStyle: "italic",
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default PositiveResponse;