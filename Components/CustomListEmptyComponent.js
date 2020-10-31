import React from 'react';
import { View, StyleSheet } from 'react-native';


const CustomListEmptyComponent = (props) => {

    return (
        <View style={styles.container}>
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