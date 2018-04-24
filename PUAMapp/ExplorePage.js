import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  StatusBar,
  Platform,
  Alert
} from "react-native";
import { Permissions } from "expo";
//import { MapView } from "expo";
import { NavigationActions } from "react-navigation";
import { lightpurple, darkpurple, pink } from "./colors.js";
import { Feather } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';


import  MapView, {Polyline} from 'react-native-maps';


// This triggers asking the user for location permissions.
// This won't do anything if the permission is already granted.
Permissions.askAsync(Permissions.LOCATION);

export default class ExplorePage extends React.Component {
    constructor(props) {
        super(props);
        self = this; 
        initialLat = 42.518217;
        initialLong = -70.891919;
        initialDelta = 0.005;
        this.markers = []

      this.tourNext = this.tourNext.bind(this);
 }


  static navigationOptions = ({ navigation}) => {
    return Platform.OS === "ios"
      ? {
          headerLeft: (
            <TouchableOpacity
              style={{ top: 30, left: -25, padding: 40 }}
              onPress={() => {navigation.dispatch(NavigationActions.back())}}
            >
              <View
                style={{
                  position: "relative",
                  flexDirection: "row",
                  backgroundColor: 'white',
                  zIndex: 100,
                  marginTop: -15,
                  width: 120,
                  height: 40,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 6,
                  shadowOffset: { width: 1, height: 1 },
                  shadowRadius: 2,
                  shadowOpacity: 0.6,
                }}
              >
                <Feather name="chevron-left" size={25} color={pink} style={{marginBottom: 1}}/>
                <Text style={{fontWeight: 'bold', fontSize: 17, color: pink}}>  Back </Text>
              </View>
            </TouchableOpacity>
          ),
          headerStyle: {
            position: "absolute",
            backgroundColor: "transparent",
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            borderBottomColor: "transparent"
          }
        }
      : {
          title: "Punto Urban Art",
          headerTintColor: "white",
          headerStyle: { backgroundColor: pink }
        };
  }
  
  // Returns true if we came from the gallery's mural info page ("see mural on map" button)
  didComeFromGallery() {
    return (this.props.navigation.state.params && this.props.navigation.state.params.muralID);
  }
  
  renderMarkers() {
    const { navigate } = this.props.navigation;

    murals = this.props.screenProps.murals || {};
    artists = this.props.screenProps.artists || {};
    
    defaultMuralID = '';
    if (this.props.navigation.state.params && this.props.navigation.state.params.muralID) {
      defaultMuralID = this.props.navigation.state.params.muralID;
    }
    

    return Object.keys(murals).map((key, i) => {
      lat = parseFloat(murals[key]["Lat"]);
      long = parseFloat(murals[key]["Long"]);
      title = murals[key]["Title"];
      artistName = artists[murals[key]["Artist"]]["name"];

      setRefLambda = (function (ref) {
        this.calloutToMakeVisible = ref
      }).bind(this);
      
      return (
        <MapView.Marker
          key={i}
          title={title}
          description={artistName}
          coordinate={{ latitude: lat, longitude: long }}
          pinColor={pink}
          ref = {(ref) => this.markers[key] = ref}
          //{key == defaultMuralID ? setRefLambda : null} 

          onCalloutPress={() => {
            navigate("MuralInfoPage", {
              mural: murals[key],
              artist: artists[murals[key]["Artist"]]
            });
          }}
        />
      );
    });

   
  }
  
  goToMural() {
    murals = this.props.screenProps.murals || {};
    if (this.props.screenProps.tourStarted) {
            // See if the currMarker corresponds to a mural
        if (this.props.navigation.state.params && this.props.navigation.state.params.muralID) {
            this.toggleTour();

            this.markers[this.props.navigation.state.params.muralID].showCallout();
            return;
            }
            
            Lat = 0
            Lon = 0
            markerKey =0
            Object.keys(murals).map((key,i) =>{
                    console.log("306")
                    if (murals[key]["Index"] == this.props.screenProps.currMarker){
                      Lat = parseFloat(murals[key]["Lat"]);
                      Lon = parseFloat(murals[key]["Long"]);
                      markerKey = key;
                      }

                  });
      if (this.markers) {
                  this.markers[markerKey].showCallout();
        }
    
  }
     if (this.props.navigation.state.params && this.props.navigation.state.params.muralID) {
      this.markers[this.props.navigation.state.params.muralID].showCallout();

    }

  }

    toggleTour() {

      console.log("start button pressed");
      murals = this.props.screenProps.murals || {};
      if (this.props.screenProps.tourStarted){
        Object.keys(murals).map((key,i) =>{
          this.markers[key].hideCallout();
        });
        
      }

        this.props.screenProps.tourState()

    
    }

    tourNext () {

        this.props.screenProps.changeMarker();
        
       
      
        if( this.props.screenProps.currMarker == Object.keys(this.props.screenProps.murals).length - 1){
            this.toggleTour();
        }

    }

    getCurrCoordsLat(){
      murals = this.props.screenProps.murals || {}
      Lat = 42.518217


        Object.keys(murals).map((key,i) =>{

            if (murals[key]["Index"] == this.props.screenProps.currMarker ){
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

          if (murals[key]["Index"] == this.props.screenProps.currMarker ){
            Lon = parseFloat(murals[key]["Long"]);
            return Lon;
          }
        })
      return Lon;
    }

    tourPrev() {
      if(this.props.screenProps.currMarker == 1){
        return;
      }
      else{
        this.props.screenProps.changeMarkerPrev();
      }
    }
    
    render() {
        const { navigate } = this.props.navigation;
        initialLat = 42.518217;
        initialLong = -70.891919;
        initialDelta = 0.005;
        
        initialRegion = {
            longitude: initialLong,
            latitude: initialLat,
            latitudeDelta: initialDelta,
            longitudeDelta: initialDelta
        };
        
        // Determine which region we WANT to go to.
        region = undefined;
        
        murals = this.props.screenProps.murals || {};

        // If we came from the MuralInfoPage
        if (this.props.navigation.state.params && this.props.navigation.state.params.muralID) {
            key = this.props.navigation.state.params.muralID;
        
            region = {
              latitude: parseFloat(murals[key]["Lat"]),
              longitude: parseFloat(murals[key]["Long"]),
              latitudeDelta: .001,
              longitudeDelta: .001,
            }
        }
        
        // If we're on a tour
        else if (this.props.screenProps.tourStarted) {
            console.log("299", this.props.screenProps.currMarker)
            // See if the currMarker corresponds to a mural
            
            Lat = 0
            Lon = 0
      

            Object.keys(murals).map((key,i) =>{
                    console.log("306")
                    if (murals[key]["Index"] == this.props.screenProps.currMarker){
                      Lat = parseFloat(murals[key]["Lat"]);
                      Lon = parseFloat(murals[key]["Long"]);
                     
                      }

                  });
            
            if (Lat != 0 && Lon != 0) {
                console.log("316")
                region = {
                   latitude: Lat,
                   longitude: Lon,
                   latitudeDelta: .001,
                   longitudeDelta: .001,
                 } 
                  
            }
            
        }

        else {
          region = initialRegion
        }
        
        console.log("326", region)
        
        return (
            <View style = {{flex: 1}}>
            <StatusBar barStyle = { Platform.OS === 'ios' ? "dark-content" : "light-content"}/>
            <AnimatedMapView
              style = {{flex: 1 }}
              showsPointsOfInterest={false}
              showsUserLocation={true}
              initialRegion = {initialRegion}
              region =  {region}
              onLayout = {this.goToMural.bind(this)}
               >
              {this.renderMarkers()}
            
           
            </AnimatedMapView>
            {console.log(this.props.screenProps.tourStarted)}
          {this.props.screenProps.tourStarted ? 
            <View>
             <Button 
            title="prev"
            onPress={()=>this.tourPrev()}
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
            : this.didComeFromGallery() ?
            <View></View> :
            <Button 
            title="start tour"
            onPress={()=>this.toggleTour()}>  
            </Button>  }
          </View>
        );
    }

}


/*****************************************************************************/

// Just a MapView but it animates to region if the region prop changes!
class AnimatedMapView extends React.Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("408")
        this.goToRegion(nextProps.region, nextProps.onLayout);
        return false;
    }
    
    // Note: onLayout (which gets passed in as a prop) is called afterwards so
    // that the parent component has a way to hook into onLayout.
    // But TBH im not sure if this is the right way to do this lol.
    goToRegion(region, onLayout) {
        if (region) {
            console.log("415")
            setTimeout(function () {
                this.map.animateToRegion(region, 1000);
            }.bind(this), 500);
        }
        
        if (onLayout) {
            onLayout();
        }
    }
    
    render() {
        var {initialRegion, region, children, onLayout, ...otherProps} = this.props;
                
        return (
            <MapView 
                onLayout={this.goToRegion.bind(this, region, onLayout)}
                initialRegion =  {initialRegion}
                ref =  {r => {this.map = r}}
                {...otherProps}>
                {children}
            </MapView>
        )
    }
    
}









