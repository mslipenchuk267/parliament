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
            Alert.alert("Successfully mocked device with ID:", deviceID);
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
        Alert.alert("Cleared all stored device contacts");
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

    console.log("Set date is ", date)
    return (
        <ScrollView
            style={styles.container}
            contentContainerStyle={{
                alignItems: 'center',
                justifyContent: 'center'
            }}
        >
            <SafeAreaView style={{ alignItems: 'center' }}>
                <View style={{ marginHorizontal: '22%', marginTop: 20, marginBottom: 10 }}>
                    <Text style={styles.header} >account</Text>
                    <CustomButton title="logout" handlePress={logoutButtonHandler} />
                    <View style={{ padding: 10 }} />
                    <CustomButton title="delete account" handlePress={deleteAccountButtonHandler} />
                </View>
                <View style={{ marginTop: 20, marginBottom: 10, borderColor: '#E5E5E5', borderTopWidth: 1.3, paddingTop: 25, marginHorizontal: '5%' }}>
                    <Text style={styles.header} >bluetooth mock</Text>
                    <Text style={styles.body}>1. Enter a <Text style={{ fontWeight: 'bold' }}>device ID</Text></Text>
                    <Text style={styles.hint} >
                        <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                            note:
                        </Text>
                        {" ID must be 12 characters long"}
                    </Text>
                </View>
                <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: '22%', minWidth: '50%' }}>
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
                <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: '22%' }}>
                    <Text style={styles.body}>2. Enter the <Text style={{ fontWeight: 'bold' }}>date</Text> of contact</Text>
                </View>
                <View style={{ marginHorizontal: '22%', marginVertical: 10 }} >
                    <CustomButton title={date ? date.toDateString() : "set date"} handlePress={showDatePicker} />
                </View>
                <View style={{ marginTop: 30, marginBottom: 0, marginHorizontal: '22%' }}>
                    <Text style={styles.body}>3. Add to scanned devices</Text>
                </View>
                <View style={{ marginHorizontal: '22%', marginVertical: 20 }} >
                    <CustomButton title="mock device" handlePress={addDeviceButtonHandler} />
                </View>
                <View style={{ marginVertical: 20, borderColor: '#E5E5E5', borderTopWidth: 1.3, paddingTop: 25, marginHorizontal: '5%', width: '100%' }}>
                    <Text style={styles.header} >device storage</Text>
                    <CustomButton title="clear contacts" handlePress={clearDevicesButtonHandler} />
                </View>
                <View style={{ marginHorizontal: '22%', marginTop: 10, marginBottom: 40 }} >
                    <CustomButton title="clear notifications" handlePress={clearNotificationsHandler} />
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
