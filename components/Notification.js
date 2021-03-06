import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Icon from '../node_modules/react-native-vector-icons/Entypo';
import LCDView from './LCDView';
import NeumorphView from './NeumorphView';

/**
 * The Notification function visually displays the notifications
 * that the user receives which can be seen in the tab provided for it. 
 * @example
 * return (
 *   <Notification />
 * )
 */
const Notification = (props) => {
    const date = new Date(props.date)

    return (
        <View style={styles.viewOuter}>
            <View style={styles.viewInner}>
                <NeumorphView
                    style={styles.linearGradient}
                >
                    <LCDView>
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
                    </LCDView>
                </NeumorphView>
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
    viewOuter: {
        marginTop: 30,
        shadowOffset: { width: 10, height: 10 },
        shadowRadius: 10,
        shadowColor: '#d6d6d6',
        shadowOpacity: 1.0,
    },
    viewInner: {
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