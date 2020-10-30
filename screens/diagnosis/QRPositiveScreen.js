import React from 'react'
import { Text, View, StyleSheet, SafeAreaView, Button, Alert } from 'react-native'
import { CommonActions } from '@react-navigation/native';

/**
 * The QRPositiveScreen component houses the UI components 
 * @example
 * return (
 *   <QRPositiveScreen />
 * )
 */

const QRPositiveScreen = (props) => {

    const createTwoButtonAlert = () => {
        Alert.alert(
          "Results: Positive",//title of Alert Message
          "Would you like to submit your data to us?", //Message under title
          [
            {
              text: "No", //text for Alert button
              onPress: () => {
                console.log("Pressed No"); //logs 'Pressed No' to console
                
                  // goes into next screen
                props.navigation.dispatch(
                    CommonActions.navigate({
                       name: 'Home' // .navigate -> key:string
                   })
                );
              }//end onPress No
            },
            { 
              text: "Yes", onPress: () => console.log("Pressed Yes") 
            }
          ],
          { cancelable: false }
        )
        };
        

    return (
        <SafeAreaView>
            <Text>This is the QRPositiveScreen screen</Text>
            <Button title={"Click here for results"} onPress={createTwoButtonAlert} />
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    
});

export default QRPositiveScreen;
