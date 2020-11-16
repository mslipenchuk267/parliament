import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, TouchableOpacity, Platform } from 'react-native';
import { blue } from '../constants/colors';
import NeumorphView from './NeumorphView';


const CustomButton = (props) => {
    const [isDown, setDown] = useState(false);
    const handlePressIn = useCallback(() => {
        setDown(true);
    }, [setDown]);
    const handlePressOut = useCallback(() => {
        setDown(false);
    }, [setDown]);

    const gradColors = isDown ? ['#E8E8E8', '#F3F3F3'] : ['#ffffff', '#E8E8E8'];

    const TouchComponent = Platform.OS === 'ios' ? TouchableOpacity : Pressable

    return (
        <TouchComponent
            activeOpacity={0.25}
            onPress={props.handlePress}
            onPressIn={handlePressIn}
            onPressOut={handlePressOut}
        >
            <View>
                <NeumorphView style={styles.button} colors={gradColors} >
                    <Text style={styles.buttonText}>
                        {props.title}
                    </Text>
                </NeumorphView>
            </View>

        </TouchComponent>

    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 40,
        paddingVertical: 20,
        paddingHorizontal: 25,
        alignItems: 'center',
        overflow: 'hidden',
        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 7,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: blue
    }
});
export default CustomButton;