import React from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const NeumorphView = (props) => {
    return (
        <View style={styles.buttonOuter}>
            <View style={styles.buttonInner}>
                <LinearGradient
                    colors={props.colors ? props.colors : ['#fbfbfb', '#e3e3e3']}
                    style={props.style}
                    useAngle={true}
                    angle={145}
                    angleCenter={{ x: 0.4, y: 0.4 }}
                >
                    {props.children}
                </LinearGradient>
            </View>
        </View >
    )
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 20,
    },
    buttonOuter: {
        marginTop: 10,
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 10,
        shadowColor: '#d6d6d6',
        shadowOpacity: 1.0,
    },
    buttonInner: {
        shadowOffset: { width: -10, height: -10 },
        shadowRadius: 10,
        shadowColor: '#ffffff',
        shadowOpacity: 1.0
    },
});

export default NeumorphView;