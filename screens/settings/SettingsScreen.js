import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Alert, Appearance, StatusBar } from 'react-native'
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

    /**
     * Handles user pressing logout button.
     * It refreshes the user's access and refresh token
     * if needed and then dispatches the logout actionCreator.
     * @return  {void}  
     * @example
     * <Button title='logout' onPress={logoutButtonHandler} />
     */
    const logoutButtonHandler = async () => {
        console.log("SettingsScreen.js/logoutButtonHandler() - Pressed Logout Button")
        if (isRefreshNeeded(accessTokenExpiration)) {
            await dispatch(userActions.refreshTokens())
        }
        dispatch(userActions.logout())
    }

    /**
     * Handles user pressing delete account button.
     * It refreshes the user's access and refresh token
     * if needed and then dispatches the deleteAccount actionCreator.
     * @return  {void}  
     * @example
     * <Button title='delete account' onPress={logoutButtonHandler} />
     */
    const deleteAccountButtonHandler = async () => {
        console.log("SettingsScreen.js/deleteAccountButtonHandler() - Pressed Delete Account Button")
        if (isRefreshNeeded(accessTokenExpiration)) {
            await dispatch(userActions.refreshTokens())
        }
        dispatch(userActions.deleteAccount());
    }

    /**
     * Handles user pressing add device button.
     * It validates that user has input all required
     * information for mocking a device and then adds this device to
     * redux store and async storage via dispatching the 
     * addFakeContact actionCreator.
     * @return  {void}  
     * @example
     * <Button title='add device' onPress={addDeviceButtonHandler} />
     */
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

    /**
     * Handles user pressing remove devices button.
     * It removes all of the contactedIDs from the redux store and 
     * async storage.
     * @return  {void}  
     * @example
     * <Button title='remove all' onPress={clearDevicesButtonHandler} />
     */
    const clearDevicesButtonHandler = async () => {
        dispatch(userActions.clearContactedIDs());
        await deleteContactedIDs();
        Alert.alert("Removed all scanned device ID's");
    }

    /**
     * Handles user pressing remove notification history button.
     * It clears the notificationHistory redux state and async storage.
     * @return  {void}  
     * @example
     * <Button title='remove all' onPress={clearNotificationsHandler} />
     */
    const clearNotificationsHandler = async () => {
        dispatch(userActions.clearNotificationHistory());
        await deleteNotificationHistory();
        Alert.alert("Cleared notifications");
    }

    /**
     * Handles bringing up the modal date picker component.
     * @return  {void}  
     * @example
     * <Button title='set date' onPress={showDatePicker} />
     */
    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    /**
     * Handles closing the modal date picker component.
     * @return  {void}  
     * @example
     * <DateTimePickerModal ... onCancel={hideDatePicker} />
     */
    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    /**
     * Handles the user setting and confirming a 
     * date time in the DateTimePickerModal.
     * @return  {void}  
     * @example
     * <DateTimePickerModal ... onConfirm={handleConfirm} />
     */
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
                <StatusBar barStyle='dark-content' />
                <View style={styles.section}>
                    <View style={styles.sectionHeader}>
                        <Text style={styles.header} >Add Device</Text>
                        <Text style={{ ...styles.body, textAlign: 'center', color: 'grey', fontSize: 14 }}>Fake scanning a device by manually entering its ID and date of contact.</Text>
                        <View style={{ padding: 3 }} />
                        <Text style={{ ...styles.body, textAlign: 'center', color: 'grey', fontSize: 14 }}>The device will be added to the scanned device display in the home screen.</Text>
                    </View>
                    <View style={styles.mockStep}>
                        <Text style={styles.body}>1. Enter a valid device ID</Text>
                        <Text style={styles.hint} >
                            <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                                Note:
                        </Text>
                            {" ID must be 12 characters long"}
                        </Text>
                        <View style={{ padding: 10 }} />
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
                    <View style={styles.mockStep}>
                        <Text style={styles.body}>2. Enter the <Text style={{ fontWeight: 'bold' }}>date</Text> of contact</Text>
                        <Text style={styles.hint} >
                            <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                                Note:
                        </Text>
                            {" Within the past 14 days"}
                        </Text>
                        <View style={{ padding: 5 }} />
                        <CustomButton title={date ? date.toDateString() : "Set Date"} handlePress={showDatePicker} />
                    </View>
                    <View style={{ ...styles.mockStep, marginBottom: 0 }}>
                        <Text style={styles.body}>3. Add to scanned devices</Text>
                        <View style={{ padding: 5 }} />
                        <CustomButton title="Add Device" handlePress={addDeviceButtonHandler} />
                    </View>
                </View>
                <View style={styles.divider} />
                <View style={styles.section}>
                    <Text style={styles.header} >Scanned Devices</Text>
                    <CustomButton title="Remove All" handlePress={clearDevicesButtonHandler} />
                </View>
                <View style={styles.divider} />
                <View style={styles.section}>
                    <Text style={styles.header} >Notification History</Text>
                    <CustomButton title="Clear History" handlePress={clearNotificationsHandler} />
                </View>
                <View style={styles.divider} />
                <View style={styles.section}>
                    <Text style={styles.header} >Account</Text>
                    <CustomButton title="Logout" handlePress={logoutButtonHandler} />
                    <View style={{ padding: 15 }} />
                    <CustomButton title="Delete Account" handlePress={deleteAccountButtonHandler} />
                    <View style={{ padding: 10 }} />
                </View>
            </SafeAreaView>
        </ScrollView >

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
    },
    divider: {
        marginTop: 10,
        borderColor: '#E5E5E5',
        borderTopWidth: 1.3,
        marginHorizontal: '5%',
        minWidth: '75%'
    },
    section: {
        marginTop: 30,
        marginBottom: 30
    },
    sectionHeader: {
        marginBottom: 10,
        marginHorizontal: '10%'
    },
    mockStep: {
        marginHorizontal: '20%',
        marginVertical: 20
    }
});

export default SettingsScreen;
