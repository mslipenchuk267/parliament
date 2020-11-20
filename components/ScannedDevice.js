import React from 'react';
import { View, Text } from 'react-native';

const ScannedDevice = (props) => {
    return (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingTop: 3 }} onStartShouldSetResponder={() => true} >
            <Text>{props.tempID}</Text>
            <Text>{props.averageRssi}</Text>
        </View>
    )
}

export default ScannedDevice;