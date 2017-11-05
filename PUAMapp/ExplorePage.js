
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import { MapView } from 'expo';
import { lightpurple, darkpurple, pink } from './colors.js';


export default class ExplorePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        } 
    }

    static navigationOptions = {
      title: 'Explore',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: pink},
    };

    renderImages() {
        const { navigate } = this.props.navigation;
        murals = this.props.screenProps.murals || {}
        artists = this.props.screenProps.artists || {}
        return Object.keys(murals).map((key,i) =>{
            lat = parseFloat(murals[key]["Lat"]);
            long = parseFloat(murals[key]["Long"]);
            title = murals[key]["Title"];
            artistName = artists[murals[key]["Artist"]]["name"];

            return(
              <MapView.Marker
                  key={i}
                  title = {title}
                  description = {artistName}
                  coordinate= {{latitude: lat, longitude: long}}
                  pinColor = 'pink'
                  onCalloutPress = { () => { navigate('MuralInfoPage', {mural: murals[key], artist: artists[murals[key]["Artist"]]}) }}
              />
                
            );
        })
    }

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style = {{flex: 1}}>
            <MapView
              style = {{flex: 1 }}
              region = {{
                latitude: 42.5183849,
                longitude: -70.8957987,
                latitudeDelta: 0.015,
                longitudeDelta: 0.015,
              }}>
              {this.renderImages()}
                
            </MapView>
            </View>
        )
    }
}
