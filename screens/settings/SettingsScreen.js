import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import DateTimePickerModal from "react-native-modal-datetime-picker";


import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';
import { isRefreshNeeded } from '../../helpers/authHelper';
import * as userActions from '../../store/actions/user';
import { deleteContactedIDs } from '../../helpers/secureStoreHelper';


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
        dispatch(userActions.deleteAccount())
    }

    const addDeviceButtonHandler = () => {
        if (deviceID.length === 12 && date) {
            console.log("SettingsScreen.js/addDeviceButtonHandler() - Pressed Add Device button with valid ID:", deviceID);
            dispatch(userActions.addFakeContact(deviceID, date))
        } else {
            if (!date) {
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
    }

    const showDatePicker = () => {
        setDatePickerVisibility(true);
    };

    const hideDatePicker = () => {
        setDatePickerVisibility(false);
    };

    const handleConfirm = (date) => {
        setDate(date);
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
            <SafeAreaView>
                <View style={{ marginHorizontal: '22%', marginTop: 20 }}>
                    <CustomButton title="Logout" handlePress={logoutButtonHandler} />
                    <CustomButton title="Delete Account" handlePress={deleteAccountButtonHandler} />
                </View>
                <View style={{ marginTop: 20, marginBottom: 10, alignItems: 'center', borderColor: '#a5acae', borderTopWidth: 1.3, paddingTop: 25, marginHorizontal: '5%' }}>
                    <Text style={styles.header} >Bluetooth Mock</Text>
                    <Text style={styles.body}>Enter the last part of the <Text style={{ fontWeight: 'bold' }}>temp ID</Text></Text>
                    <Text style={styles.hint}>( e.g. 00000000-0000-0000-0000-XXXXXXXXXXXX )</Text>
                    <Text style={styles.hint} >
                        <Text style={{ fontStyle: 'italic', fontWeight: 'bold' }}>
                            note:
                        </Text>
                        {" ID is case sensitive"}
                    </Text>
                </View>
                <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: '22%' }}>
                    <CustomTextInput
                        placeholder="XXXXXXXXXXXX"
                        onChangeText={(text) => setDeviceID(text)}
                    />
                </View>
                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                />
                <View style={{ marginTop: 20, marginBottom: 10, marginHorizontal: '22%' }}>
                    <Text style={{ textAlign: 'center', fontSize: 16, fontWeight: 'bold' }}>{date.toLocaleString() || "Set date below"}</Text>
                </View>
                <View style={{ marginHorizontal: '22%' }} >
                    <CustomButton title={"Set Date"} handlePress={showDatePicker} />
                </View>
                <View style={{ marginHorizontal: '22%'}} >
                    <CustomButton title="Add Device" handlePress={addDeviceButtonHandler} />
                </View>
                <View style={{ marginHorizontal: '22%', marginBottom: 20 }} >
                    <CustomButton title="Clear Devices" handlePress={clearDevicesButtonHandler} />
                </View>
            </SafeAreaView>
        </ScrollView>

    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    body: {
        fontSize: 16
    },
    hint: {
        fontSize: 13
    },
    header: {
        fontWeight: 'bold',
        fontSize: 20,
        marginBottom: 20
    }
});

export default SettingsScreen;
