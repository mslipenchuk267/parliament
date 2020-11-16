import React, { useState } from 'react';
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard } from 'react-native';

import CustomListEmptyComponent from '../../components/CustomListEmptyComponent';
import CustomTextInput from '../../components/CustomTextInput';
import { blue, lightGrey, mediumGrey, offWhite } from '../../constants/colors';
import { states, newsSiteLink } from '../../constants/states';
import { linkToSite } from '../../helpers/deepLinkHelper';
import { filterStates } from '../../helpers/filterHelper';

/**
 * The StateSelectorScreen component lets users select and search for their
 * state and get redirected to news about that state in their native browser.
 * @example
 * return (
 *   <StateSelectorScreen />
 * )
 */
const StateSelectorScreen = () => {
    const [filteredStates, setFilteredStates] = useState(states)

    //Manages what occurs when pressing on a state
    const handleStateButton = async (stateName) => {
        console.log("StateSelectorScreen.js/handleStateButton() - Pressed a FlatList item with stateName:", stateName);
        // Assemble state news site link
        const stateNewsLink = newsSiteLink + stateName.replace(/\s+/g, '-').toLowerCase();
        // Deep link to news site
        await linkToSite(stateNewsLink);
    }

    const handleSearchInput = (searchQuery) => {
        // if user provides query, check for matches in all state items
        updatedFilteredStates = filterStates(states, searchQuery)
        setFilteredStates(updatedFilteredStates)
    }

    return (
        <TouchableWithoutFeedback
            onPress={() => {
                Keyboard.dismiss();
            }}
        >
            <SafeAreaView style={styles.container}>
                <View style={{width: '80%'}}>
                    <CustomTextInput
                        placeholder="Look up your state"
                        onChangeText={(text) => handleSearchInput(text)}
                        testID="stateSearchBar"
                    />
                </View>
                <View style={styles.listContainer}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        keyExtractor={(item) => item.stateCode}
                        data={filteredStates}
                        ListEmptyComponent={
                            <CustomListEmptyComponent>
                                <Text style={styles.listEmptyText}>no results found 🕵️</Text>
                                <Text style={styles.listEmptyText}>please try another query</Text>
                            </CustomListEmptyComponent>
                        }
                        renderItem={({ item }) => (
                            <TouchableOpacity style={styles.stateButton} onPress={handleStateButton.bind(this, item.stateName)} >
                                <Text style={styles.stateText} >{item.stateName}</Text>
                            </TouchableOpacity>
                        )}
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    )
};

//Styling component of the UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: offWhite,
        justifyContent: 'center',
        alignItems: 'center'
    },
    listContainer: {
        width: '80%',
        marginVertical: 20,
        height: '80%',
        borderColor: mediumGrey,
        borderWidth: 1,
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
    },
    listEmptyText: {
        paddingTop: 10
    }
});

export default StateSelectorScreen;