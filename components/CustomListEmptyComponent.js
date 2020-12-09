import React from 'react';
import { View, StyleSheet } from 'react-native';


/**
 * The CustomeListEmpty component is a container responsible for unifying 
 * styles elements with List functionality.  The list is returned empty 
 * and later filled with objects by the application as needed.  A usage 
 * example can be found in NotificationScreen.js 
 * @example
 * return (
 *   <View />
 * )
 */

const CustomListEmptyComponent = (props) => {

    return (
        <View style={styles.container} testID="ListEmptyComponent" >
            {props.children}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: '50%'
    }
})

export default CustomListEmptyComponent;