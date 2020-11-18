import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Alert, Appearance } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import CustomButton from '../../components/CustomButton';
import CustomTextInput from '../../components/CustomTextInput';
import { isRefreshNeeded } from '../../helpers/authHelper';
import * as userActions from '../../store/actions/user';
import { deleteContactedIDs, deleteNotificationHistory } from '../../helpers/secureStoreHelper';
import { offWhite } from '../../constants/colors';


/**
 * The SettingsScreen component houses the UI components 
 * and handler functions for user account deletion and contact
 * tracing settings.
 * @example
 * return (
 *   <SettingsScreen />
 * )
 */
const SettingsScreen = () => {
    const [deviceID, setDeviceID] = useState('');
    const [date, setDate] = useState('');
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
    const accessTokenExpiration = useSelector(state => state.user.accessTokenExpiration);
    const dispatch = useDispatch();

    const logoutButtonHandler = async () => {
        console.log("SettingsScreen.js/logoutButtonHandler() - Pressed Logout Button")
        if (isRefreshNeeded(accessTokenExpiration)) {
            await dispatch(userActions.refreshTokens())
        }
        dispatch(userActions.logout())
    }

    const deleteAccountButtonHandler = async () => {
        console.log("SettingsScreen.js/deleteAccountButtonHandler() - Pressed Delete Account Button")
        if (isRefreshNeeded(accessTokenExpiration)) {
            await dispatch(userActions.refreshTokens())
        }
        dispatch(userActions.deleteAccount());
    }

    const addDeviceButtonHandler = () => {
        if (deviceID.length === 12 && date) {
            console.log("SettingsScreen.js/addDeviceButtonHandler() - Pressed Add Device button with valid ID:", "00000000-0000-0000-0000-" + deviceID);
            dispatch(userActions.addFakeContact("00000000-0000-0000-0000-" + deviceID, date));
            setDeviceID("");
            setDate("");
            Alert.alert("Successfully added device with ID:", deviceID);
        } else {
            if (deviceID.length != 12 && !date) {
                console.log("SettingsScreen.js/addDeviceButtonHandler() - Pressed Add Device button with no device ID or date", deviceID);
                Alert.alert("Please enter a valid device ID and select a date");
            } else if (!date) {
                console.log("SettingsScreen.js/addDeviceButtonHandler() - Pressed Add Device button with no date", deviceID);
                Alert.alert("Please set a date");
            } else if (deviceID.length != 12) {
                console.log("SettingsScreen.js/addDeviceButtonHandler() - Pressed Add Device button with invalid ID:", deviceID);
                Alert.alert("Please Enter a valid ID");
            } else {
                console.log("SettingsScreen.js/addDeviceButtonHandler() - Pressed Add Device button with invalid ID and no date:", deviceID);
                Alert.alert("Please Enter a valid ID and set a date");
            }
        }
    }

    const clearDevicesButtonHandler = async () => {
        dispatch(userActions.clearContactedIDs());
        await deleteContactedIDs();
        Alert.alert("Removed all scanned device ID's");
    }

    const clearNotificationsHandler = async () => {
        dispatch(userActions.clearNotificationHistory());
        await deleteNotificationHistory();
        Alert.alert("Cleared notifications");
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (newDate) => {
        setDate(newDate);
        hideDatePicker();
    };

    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <SafeAreaView style={{ alignItems: 'center' }}>

                <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: '5%' }}>
                    <Text style={styles.header} >Add Device</Text>

                    <Text style={styles.hint}>Manually enter ID's from other devices here.</Text>
                    <Text style={styles.hint}>ID's from other devices will be added into scanned device</Text>
                    <View style={{padding: 5}}/>

                </View>
                <View style={{ marginTop: 10, marginBottom: 10, marginHorizontal: '22%', minWidth: '50%' }}>

                <Text style={styles.body}>1. Enter a valid device ID</Text>
                    <Text style={styles.hint} >
                        <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                            Note:
                        </Text>
                        {" ID must be 12 characters long"}
                    </Text>

                    <View style={{padding: 5}}/>

                    <CustomTextInput
                        placeholder="000000000000"
                        value={deviceID}
                        onChangeText={(text) => setDeviceID(text)}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    isDarkModeEnabled={Appearance.getColorScheme() === 'dark' ? true : false}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <View style={{ marginTop: 30, marginBottom: 5, marginHorizontal: '22%' }}>
                    <Text style={styles.body}>2. Enter the <Text style={{ fontWeight: 'bold' }}>date</Text> of contact</Text>
                    <Text style={styles.hint} >
                        <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                            Note:
                        </Text>
                        {" Within the past 14 days"}
                    </Text>
                </View>
                <View style={{ marginHorizontal: '22%', marginVertical: -2 }} >
                    <CustomButton title={date ? date.toDateString() : "Set Date"} handlePress={showDatePicker} />
                </View>
                <View style={{ marginTop: 40, marginVertical: -15,  marginHorizontal: '22%' }}>
                    <Text style={styles.body}>3. Add to scanned devices</Text>
                </View>
                <View style={{ marginHorizontal: '22%', marginVertical: 20 }} >
                    <CustomButton title="Add Device" handlePress={addDeviceButtonHandler} />
                </View>
                <View style={{ marginTop: 30, borderColor: '#E5E5E5', borderTopWidth: 1.3, paddingTop: 25, marginHorizontal: '5%', minWidth: '75%' }} />
                <View style={{ marginVertical: 10, marginHorizontal: '5%', width: '100%' }}>
                    <Text style={styles.header} >Device ID's</Text>
                    <CustomButton title="Remove All" handlePress={clearDevicesButtonHandler} />
                </View>

                <View style={{ marginTop: 30, borderColor: '#E5E5E5', borderTopWidth: 1.3, paddingTop: 25, marginHorizontal: '5%', minWidth: '75%' }} />
                <View style={{ marginVertical: 10, marginHorizontal: '5%', width: '100%' }}>
                    <Text style={styles.header} >Notification History</Text>

                    <CustomButton title="Clear History" handlePress={clearNotificationsHandler} />
                    <View style={{ padding: 15 }} />
                </View>

                <View style={{ marginTop: 10, borderColor: '#E5E5E5', borderTopWidth: 1.3, paddingTop: 25, marginHorizontal: '5%', minWidth: '75%' }} />

                <View style={{ marginHorizontal: '22%', marginTop: 10, marginBottom: 10 }}>
                    <Text style={styles.header} >Account</Text>
                    <CustomButton title="Logout" handlePress={logoutButtonHandler} />
                    <View style={{ padding: 10 }} />
                    <CustomButton title="Delete Account" handlePress={deleteAccountButtonHandler} />
                </View>

            </SafeAreaView>
        </ScrollView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: offWhite,
    },
    body: {
        fontSize: 16,
        textAlign: 'left'
    },
    hint: {
        fontSize: 13,
        textAlign: 'left'
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20,
        textAlign: 'center'
    }
});

export default SettingsScreen;
