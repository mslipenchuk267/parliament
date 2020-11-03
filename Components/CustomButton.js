import React, { useCallback, useState } from 'react';
import { View, Text, StyleSheet, Pressable, ImageBackground, TouchableOpacity } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
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

    return (

                <TouchableOpacity
                    activeOpacity={0.25}
                    onPress={props.handlePress}
                    onPressIn={handlePressIn}
                    onPressOut={handlePressOut}
                >
                    <NeumorphView style={styles.button} colors={gradColors} >
                        <Text style={styles.buttonText}>
                            {props.title}
                        </Text>
                    </NeumorphView>

                </TouchableOpacity>

    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: "white",
        elevation: 10,
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 40,
        alignItems: 'center',
        // shadow
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.32,
        shadowRadius: 5.46,
        elevation: 9,
    },
    buttonText: {
        fontSize: 18,
        fontWeight: '600',
        color: blue
    }
});
export default CustomButton;