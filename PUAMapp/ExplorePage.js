
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Button, StatusBar, Platform} from 'react-native';
import MapView, {Polyline} from 'react-native-maps';
import { NavigationActions } from 'react-navigation'
import { lightpurple, darkpurple, pink } from './colors.js';
import MapViewDirections from 'react-native-maps-directions';

const polylines = [ 
  {
    latitude: 42.518351, 
    longitude: -70.8909514 
  },
  //{latitude: 42.518214, longitude: 70.892871},
  {
    latitude: 42.5185239, 
    longitude: -70.8910845
  },
  //{latitude: 42.5185389, longitude: 70.8911709},
  {
    latitude: 42.5183255, 
    longitude: -70.8934113
  }
                      ]

var _mapView: MapView;

export default class ExplorePage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        
       
      }

        
    }

    componentDidMount() {
        // if (Platform.OS === 'ios') this.watchID = navigator.geolocation.watchPosition();
    }

    componentWillUnmount() {
        // if (Platform.OS === 'ios') navigator.geolocation.clearWatch(this.watchID);
    }


    static navigationOptions = ({ navigation }) => 
    (Platform.OS === 'ios' ? {headerLeft:   
    <TouchableOpacity style = {{top: 25, left: -25, padding: 40}} onPress={() => navigation.dispatch(NavigationActions.back())} >
    <Image style= {{position: 'relative', zIndex: 100, maxWidth: 120, maxHeight: 40}} source={require('./assets/images/backbutton.png')} /> 

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

    toggleTour() {

      console.log("start button pressed");
      this.props.screenProps.tourState()
     
    
    }

    tourNext () {
        murals = this.props.screenProps.murals || {}
        Lat = 0
        Lon = 0
        
        this.props.screenProps.changeMarker();
        //console.log(this.props.screenProps.currMarker)

        Object.keys(murals).map((key,i) =>{

          if (murals[key]["Index"] == this.props.screenProps.currMarker){
            Lat = parseFloat(murals[key]["Lat"]);
            Lon = parseFloat(murals[key]["Long"]);
          }

        })
        
      console.log(this.props.screenProps.currMarker)

         _mapView.animateToCoordinate({
            latitude: Lat,
            longitude: Lon,
          }, 1000)

    }

    getCurrCoordsLat(){
      murals = this.props.screenProps.murals || {}
      Lat = 42.518217
      Object.keys(murals).map((key,i) =>{

          if (murals[key]["Index"] == this.props.screenProps.currMarker){
            Lat = parseFloat(murals[key]["Lat"]);
            return Lat;
          }

        })
      return Lat;

    }

    getCurrCoordsLong(){
      murals = this.props.screenProps.murals || {}
      Lon = -70.891919
      Object.keys(murals).map((key,i) =>{

          if (murals[key]["Index"] == this.props.screenProps.currMarker){
            Lon = parseFloat(murals[key]["Long"]);
            return Lon;
          }

        })

      return Lon;

    }

    temp() {
      console.log("prev or next");
    }



    

    render() {
        const { navigate } = this.props.navigation;
       
        return (
            <View style = {{flex: 1}}>
            <StatusBar barStyle = { Platform.OS === 'ios' ? "dark-content" : "light-content"}/>
            <MapView
              style = {{flex: 1 }}
              ref = {(mapView) => { _mapView = mapView; }}
              region = {{
                latitude: this.props.screenProps.tourStarted == false ? 42.518217 : this.getCurrCoordsLat() ,
                longitude: this.props.screenProps.tourStarted == false ? -70.891919 : this.getCurrCoordsLong() ,
                latitudeDelta: this.props.screenProps.tourStarted == false ? 0.005 : 0.0001,
                longitudeDelta: this.props.screenProps.tourStarted == false ? 0.005 : 0.0001,
              }}>
              {this.renderImages()}
             {/*  <Polyline
              coordinates={polylines}
              strokeColor="#000"
              fillColor="rgba(255,0,0,0.5)"
              strokeWidth={3}
            />*/}
            <MapViewDirections
              origin= {polylines[0]}
              destination= {polylines[1]}
              apikey="AIzaSyBJaE850Gj_kT7KhTb__ifb6vA01TKmA3w"
              strokeWidth={3}
              strokeColor="hotpink"
              />
            </MapView>
            {console.log(this.props.screenProps.tourStarted)}
          {this.props.screenProps.tourStarted ? 
            <View>
             <Button 
            title="prev"
            onPress={()=>this.temp()}
            >  </Button>
             <Button 
            title="next"
            onPress = {()=>this.tourNext()} >  
            </Button>
            <Button 
            title="end tour"
            onPress={()=>this.toggleTour()}
            >  </Button>
            </View>
            :
            <Button 
            title="start tour"
            onPress={()=>this.toggleTour()}>  
            </Button>}
          </View>
        )
    }
}




