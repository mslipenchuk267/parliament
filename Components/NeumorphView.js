import React from 'react';
import { StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const NeumorphView = (props) => {
    return (
        <LinearGradient
            colors={props.colors ? props.colors : ['#fbfbfb', '#e3e3e3']}
            style={props.style}
            useAngle={true}
            angle={145}
            angleCenter={{ x: 0.4, y: 0.4 }}
        >
            {props.children}
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 20,
    }
});

export default NeumorphView;