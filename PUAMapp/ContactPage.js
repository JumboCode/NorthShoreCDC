
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';


export default class ContactPage extends React.Component {
    static navigationOptions = {
      title: 'Contact',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: pink},
    };

    render() {
        return (
            <View>
                <Text>Contact</Text>
            </View>
        )
    }
}



