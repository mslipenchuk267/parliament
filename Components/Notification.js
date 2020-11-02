import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../node_modules/react-native-vector-icons/Entypo';

const Notification = (props) => {
    const date = new Date(props.date)

    return (
        <View style={styles.buttonOuter}>
            <View style={styles.buttonInner}>
                <LinearGradient
                    colors={['#fbfbfb', '#e3e3e3']}
                    style={styles.linearGradient}
                    useAngle={true}
                    angle={145}
                    angleCenter={{ x: 0.4, y: 0.4 }}
                >
                    <LinearGradient
                        colors={['#ffffff', '#a5acae']}
                        style={{
                            paddingVertical: 2,
                            paddingHorizontal: 2,
                            borderRadius: 15,
                            minHeight: 100,
                        }}
                        useAngle={true}
                        angle={145}
                        angleCenter={{ x: 0.5, y: 0.5 }}
                    >
                        <LinearGradient
                            colors={['#d8e0d5', '#C5CFC1', '#B7C8B0', '#9DAF93']}
                            style={{
                                paddingVertical: 15,
                                paddingHorizontal: 15,
                                borderRadius: 14,
                                borderWidth: 1,
                                borderColor: '#8E9896',
                            }}
                            useAngle={true}
                            angle={145}
                            angleCenter={{ x: 0.5, y: 0.5 }}
                        >
                            <View style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'flex-end',
                            }}
                            >
                                <Text style={{ ...styles.label, textAlign: 'left' }}>potential exposure</Text>
                                <Text style={{ ...styles.label, textAlign: 'right' }}>signal <Icon name="signal" size={14} color="black" /></Text>
                            </View>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline'
                                }}
                            >
                                <Text style={styles.date}>{date.getDate() + '/' + (date.getMonth() + 1) + '/' + date.getFullYear()}</Text>
                                <Text style={styles.averageRssi}>{props.averageRssi}</Text>
                            </View>
                        </LinearGradient>
                    </LinearGradient>
                </LinearGradient>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    linearGradient: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        borderRadius: 20,
        minHeight: 100,
    },
    buttonOuter: {
        marginTop: 30,
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
    label: {
        fontSize: 16,
        paddingBottom: 10
    },
    date: {
        fontSize: 30,
        fontFamily: 'Helvetica',
        textAlign: 'left'
    },
    averageRssi: {
        fontSize: 24,
        fontFamily: 'Helvetica',
        textAlign: 'right',
    },
    inset: {
        margin: 10,
        flex: 1,
        backgroundColor: 'transparent',
        borderColor: 'white',
        borderWidth: 30,
        overflow: 'hidden',
        shadowColor: 'black',
        shadowRadius: 10,
        shadowOpacity: 1,
    }
});

export default Notification;