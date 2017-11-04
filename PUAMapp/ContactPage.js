
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';


export default class ContactPage extends React.Component {
    static navigationOptions = {
      title: 'Contact',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: 'pink'},
    };

    render() {
        return (
            <View>
                <Text>Contact</Text>
            </View>
        )
    }
}



