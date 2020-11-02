import React, { useState } from 'react'
import { StyleSheet, SafeAreaView, View, Text, Alert } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import CustomButton from '../../Components/CustomButton';
import CustomTextInput from '../../Components/CustomTextInput';
import { isRefreshNeeded } from '../../helpers/authHelper';
import * as userActions from '../../store/actions/user';


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
        if (deviceID.length === 12) {
            console.log("SettingsScreen.js/addDeviceButtonHandler() - Pressed Add Device button with valid ID:", deviceID);
            dispatch(userActions.addFakeContact(deviceID))
        } else {
            console.log("SettingsScreen.js/addDeviceButtonHandler() - Pressed Add Device button with invalid ID:", deviceID);
            Alert.alert("Please Enter a valid ID");
        }
    }

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
                    <Text style={styles.body}>Please enter the last part of the temp ID</Text>
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
                <View style={{ marginHorizontal: '22%' }} >
                    <CustomButton title="Add Device" handlePress={addDeviceButtonHandler} />
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
        fontSize: 20
    }
});

export default SettingsScreen;
