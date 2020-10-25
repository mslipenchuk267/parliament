import React from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';

import { blue, lightGrey, mediumGrey } from '../../constants/colors';
import { states, newsSiteLink } from '../../constants/states';
import { linkToSite } from '../../helpers/deepLinkHelper';

/**
 * The StateSelectorScreen component houses 2 components 
 * - a flatlist listing all the states
 * @example
 * return (
 *   <StateSelectorScreen />
 * )
 */

const StateSelectorScreen = () => {
    //Manages what occurs when pressing on a state
    const handleStateButton = async (stateName) => {
        console.log("StateSelectorScreen.js/handleStateButton() - Pressed a state button with state:", stateName);
        // Assemble state news site link
        const stateNewsLink = newsSiteLink + stateName.replace(/\s+/g, '-').toLowerCase();
        // Deep link to news site
        await linkToSite(stateNewsLink);
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.titleContainer} >
                <Text style={styles.titleText} >
                    View US State News for:
                </Text>
            </View>
            {/*
                Grabs the states from the array and uses the styling component to display to user.
                Also uses Touchable Opacity to express that the user pressed link by fading into lighter color
                */}
            <View style={styles.listContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    showsHorizontalScrollIndicator={false}
                    keyExtractor={(item) => item.stateCode}
                    data={states}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.stateButton} onPress={handleStateButton.bind(this, item.stateName)} >
                            <Text style={styles.stateText} >{item.stateName}</Text>
                        </TouchableOpacity>
                    )}
                />
            </View>

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
        //paddingTop: 2,
        //paddingBottom: 25,
    },
    titleText: {
        fontSize: 18,
    },
    listContainer: {
        width: '80%',
        marginVertical: 20,
        maxHeight: '80%',
        borderColor: mediumGrey,
        borderWidth: 2,
        borderRadius: 10,
        backgroundColor: lightGrey,
    },
    stateButton: {
        marginVertical: 10,
        marginHorizontal: '10%',
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
        elevation: 2
    },
    stateText: {
        fontSize: 28,
        textAlign: 'center',
        color: blue
    }
});

export default StateSelectorScreen;