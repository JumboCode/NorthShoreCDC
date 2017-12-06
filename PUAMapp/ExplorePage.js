
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import MapView from 'react-native-maps';
import { lightpurple, darkpurple, pink } from './colors.js';


export default class ExplorePage extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.watchID = navigator.geolocation.watchPosition();
    }

    componentWillUnmount() {
        navigator.geolocation.clearWatch(this.watchID);
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
                  pinColor = {pink}
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
              showsUserLocation={true}
              style = {{flex: 1 }}
              region = {{
                latitude: 42.518217,
                longitude: -70.891919,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}>
              {this.renderImages()}
                
            </MapView>
            </View>
        )
    }
}
