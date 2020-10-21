import React from 'react'
import { Text, View, StyleSheet, SafeAreaView } from 'react-native'

/**
 * The StateSelectorScreen component houses 2 components 
 * - a flatlist listing all the states
 * - a button "Go to testing site" that takes you to the link of highlighted state
 * @example
 * return (
 *   <StateSelectorScreen />
 * )
 */

const StateSelectorScreen = () => {
    return (
        <SafeAreaView>
            <Text>This is the StateSelectorScreen screen</Text>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    
});

export default StateSelectorScreen;