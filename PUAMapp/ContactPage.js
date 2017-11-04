
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';


export default class ContactPage extends React.Component {
    static navigationOptions = {
      title: 'Contact',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: pink},
    };

    renderArtists() {
    
   
   
    
    const { navigate } = this.props.navigation;
        artists = this.props.screenProps.artists || {}
        return Object.keys(artists).map((key,i) =>{
            name = key
              return(
       

        <Text key={i} > {name} </Text>
              );
        })
  }

    render() {
        return (
            <View>
                 {this.renderArtists()}
            </View>
        )
    }
}



