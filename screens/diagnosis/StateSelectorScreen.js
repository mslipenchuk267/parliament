import React, { useState, useCallback } from 'react'
import { Linking, Button, Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'

import CustomButton from '../../Components/CustomButton';
import { blue, lightGrey, mediumGrey } from '../../constants/colors';
import { states } from '../../constants/states';

/**
 * The StateSelectorScreen component houses 2 components 
 * - a flatlist listing all the states
 * - a button "Go to testing site" that takes you to the link of highlighted state
 * @example
 * return (
 *   <StateSelectorScreen />
 * )
 */

//URL to be navigated to when button is clicked 
const testingWebsiteURL = "https://www.hhs.gov/coronavirus/community-based-testing-sites/index.html#";

const StateSelectorScreen = () => {
    //Manages what occurs when pressing on a state
    const handleStateButton = async (stateCode) => {
        console.log("StateSelectorScreen.js/handleStateButton() - Pressed a state button with state code:", stateCode);
        // Assemble state testing site link
        const stateTestingLink = testingWebsiteURL + stateCode.toLowerCase();
        // Deep link to testing site
        const supported = await Linking.canOpenURL(stateTestingLink);
        if (supported) {
            // Opening the link with native browser, if the URL scheme is "http" the web link should be opened
            // by some browser in the mobile
            try {
                await Linking.openURL(stateTestingLink);
            } catch (err) {
                console.error('An error occurred', err);
            }
        } else {
            //handles broken URL, without http, etc.
            Alert.alert(`Don't know how to open this URL: ${stateTestingLink}`);
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer} >
                <Text style={styles.titleText} >
                    View available Testing Sites for:
                </Text>
            </View>
            {/*
                Grabs the states from the array and uses the styling component to display to user.
                Also uses Touchable Opacity to express that the user pressed link by fading into lighter color
                */}
            <FlatList
                style={styles.listContainer}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item) => item.stateCode}
                data={states}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.stateButton} onPress={handleStateButton.bind(this, item.stateCode)} >
                        <Text style={styles.stateText} >{item.stateName}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>

    )
};

//Styling component of the UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        paddingTop: 25,
        paddingBottom: 25,
    },
    titleText: {
        fontSize: 18,
    },
    listContainer: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        marginBottom: 50,
        borderColor: mediumGrey,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: lightGrey
    },
    stateButton: {
        marginBottom: 20,
        padding: 12,
        backgroundColor: "white",
        borderRadius: 10,
        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    stateText: {
        fontSize: 28,
        textAlign: 'center',
        color: blue
    }
});

export default StateSelectorScreen;