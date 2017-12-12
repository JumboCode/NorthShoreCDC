
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Button, StatusBar, Platform} from 'react-native';
import MapView from 'react-native-maps';
import { NavigationActions } from 'react-navigation'
import { lightpurple, darkpurple, pink } from './colors.js';


export default class ExplorePage extends React.Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        // if (Platform.OS === 'ios') this.watchID = navigator.geolocation.watchPosition();
    }

    componentWillUnmount() {
        // if (Platform.OS === 'ios') navigator.geolocation.clearWatch(this.watchID);
    }

    static navigationOptions = ({ navigation }) => (Platform.OS === 'ios' ? {
    headerLeft:   
    <TouchableOpacity style = {{top: 50, left: 15, padding: 50}} onPress={() => navigation.dispatch(NavigationActions.back())} >
    <Image 
    style= {{position: 'absolute', zIndex: 100, maxWidth: 120, maxHeight: 40}}
    source={require('./backbutton.png')} /> 
    </TouchableOpacity>,
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomColor: 'transparent' }
    } : {title: 'Punto Urban Art', headerTintColor: 'white', headerStyle: {backgroundColor: pink},});


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
            <StatusBar barStyle = { Platform.OS === 'ios' ? "dark-content" : "light-content"}/>
            <MapView
              // showsUserLocation={true}
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

