import React from 'react';
import LinearGradient from 'react-native-linear-gradient';

const LCDView = (props) => {
    return (
        <LinearGradient
            colors={['#ffffff', '#a5acae']}
            style={{
                paddingVertical: 1,
                paddingHorizontal: 1,
                borderRadius: 11,
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
                    borderRadius: 11,
                    borderWidth: 1,
                    borderColor: '#8E9896',
                }}
                useAngle={true}
                angle={145}
                angleCenter={{ x: 0.5, y: 0.5 }}
            >
                {props.children}
            </LinearGradient>
        </LinearGradient>
    )
};

export default LCDView;