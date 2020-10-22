import React, {useState} from 'react'
import { Text, View, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native'
import CustomButton from '../../Components/CustomButton';

/**
 * The StateSelectorScreen component houses 2 components 
 * - a flatlist listing all the states
 * - a button "Go to testing site" that takes you to the link of highlighted state
 * @example
 * return (
 *   <StateSelectorScreen />
 * )
 */

const StateSelectorScreen = () => {
    //Array containing states and their abbreviations
    const [selectedState, setSelectedState] = useState([
        { stateName: 'Alabama',  stateCode: 'AL'}, 
        { stateName: 'Alaska',  stateCode: 'AK'}, 
        { stateName: 'Arizona',  stateCode: 'AZ'}, 
        { stateName: 'Arkansas',  stateCode: 'AR'}, 
        { stateName: 'California',  stateCode: 'CA'}, 
        { stateName: 'Colorado',  stateCode: 'CO'}, 
        { stateName: 'Connecticuit',  stateCode: 'CT'}, 
        { stateName: 'Delaware',  stateCode: 'DE'}, 
        { stateName: 'Florida',  stateCode: 'FL'}, 
        { stateName: 'Georgia',  stateCode: 'GA'}, 
        { stateName: 'Hawaii',  stateCode: 'HI'},
        { stateName: 'Idaho',  stateCode: 'ID'}, 
        { stateName: 'Illinois',  stateCode: 'IL'},
        { stateName: 'Indiana',  stateCode: 'IN'}, 
        { stateName: 'Iowa',  stateCode: 'IA'}, 
        { stateName: 'Kansas',  stateCode: 'KS'}, 
        { stateName: 'Kenctucky',  stateCode: 'KY'}, 
        { stateName: 'Louisiana',  stateCode: 'LA'}, 
        { stateName: 'Maine',  stateCode: 'ME'}, 
        { stateName: 'Maryland',  stateCode: 'MD'}, 
        { stateName: 'Massachusetts',  stateCode: 'MA'}, 
        { stateName: 'Michigan',  stateCode: 'MI'}, 
        { stateName: 'Minnesota',  stateCode: 'MN'}, 
        { stateName: 'Mississippi',  stateCode: 'MS'}, 
        { stateName: 'Missouri',  stateCode: 'MO'}, 
        { stateName: 'Montana',  stateCode: 'MT'},
        { stateName: 'Nebraska',  stateCode: 'NE'}, 
        { stateName: 'Nevada',  stateCode: 'NV'},
        { stateName: 'New Hampshire',  stateCode: 'NH'},
        { stateName: 'New Jersey',  stateCode: 'NJ'},
        { stateName: 'New Mexico',  stateCode: 'NM'},
        { stateName: 'New York',  stateCode: 'NY'},
        { stateName: 'North Carolina',  stateCode: 'NC'},
        { stateName: 'North Dakota',  stateCode: 'ND'},
        { stateName: 'Ohio',  stateCode: 'OH'},
        { stateName: 'Oklahoma',  stateCode: 'OK'},
        { stateName: 'Oregon',  stateCode: 'OR'},
        { stateName: 'Pennsylvania',  stateCode: 'PA'},
        { stateName: 'Rhode Island',  stateCode: 'RI'},
        { stateName: 'South Carolina',  stateCode: 'SC'},
        { stateName: 'South Dakota',  stateCode: 'SD'},
        { stateName: 'Tennessee',  stateCode: 'TN'},
        { stateName: 'Texas',  stateCode: 'TX'},
        { stateName: 'Utah',  stateCode: 'UT'},
        { stateName: 'Vermont',  stateCode: 'VT'},
        { stateName: 'Virginia',  stateCode: 'VA'},
        { stateName: 'Washington',  stateCode: 'WA'},
        { stateName: 'West Virginia',  stateCode: 'WV'},
        { stateName: 'Wisconsin',  stateCode: 'WI'},
        { stateName: 'Wyoming',  stateCode: 'WY'},
    ]);

    //Manages what occurs when pressing on a state
    const pressManager = (stateCode) => {
        console.log(stateCode);        
    }

    return (
        // <SafeAreaView>
        //     <Text>This is the StateSelectorScreen screen</Text>
        // </SafeAreaView>
        
        /*
        Grabs the states from the array and uses the styling component to display to user.
        Also uses Touchable Opacity to express that the user pressed link by fading into lighter color
        */
        <SafeAreaView style = {styles.container}>
            
            <FlatList
                keyExtractor = {(item) => item.stateCode}
                data={selectedState}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => pressManager(item.stateCode)}>
                        <Text style={styles.item}>{item.stateName}</Text>
                    </TouchableOpacity>   
                )} 
            />

            <CustomButton title='Go to Testing Site' />


        </SafeAreaView>

    )
};

//Styling component of the UI
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: 40,
        paddingHorizontal: 20,
        //alignItems: 'center'
    },
    item: {
        marginTop: 24,
        padding: 12,
        backgroundColor: 'lightgray',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center'
    }
});

export default StateSelectorScreen;