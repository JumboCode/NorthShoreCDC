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

        // Where we will store the refs to all the markers
        // This is necessary because showing and hiding a callout must be done imperatively.
        this.markers = {}

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
  
  // Logic for determining which mural should currently be shown to the user
  currentMuralID() {
    if (this.didComeFromGallery()) {
      return this.props.navigation.state.params.muralID;
    }
    else if (this.props.screenProps.tourStarted) {
      currMarkerIndex = this.props.screenProps.currMarker
      murals = this.props.screenProps.murals || {};

      for (muralKey in murals) {
        if (murals[muralKey]["Index"] == currMarkerIndex) {
          return muralKey;
        }
      }
    }
    
    return undefined;
    
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

      return (
        <MapView.Marker
          key={i}
          title={title}
          description={artistName}
          coordinate={{ latitude: lat, longitude: long }}
          pinColor={pink}
          ref = {(ref) => this.markers[key] = ref}
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
    
      if (this.markers && this.currentMuralID()) {
        
        // Note: we must delay showing the callout because it should only happen
        // AFTER we animate to the region for that callout.
        // This prevents an animation bug in which we showed the callout while
        // the map was still animating to the region.
        
        // TODO: use constants to determine the delay amount. Here we use 1500
        // because it is the sum of the map's animation delays (500ms before
        // animating, animate moving to new region for 1000ms).
        
        setTimeout(function () {
          this.markers[this.currentMuralID()].showCallout();
        }.bind(this), 1500);

      }
  }


    toggleTour() {

      console.log("start button pressed");
      
      // If we're ending a tour, hide any callouts that may be still visible.
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

        
        if (this.currentMuralID()) {
          mural = murals[this.currentMuralID()];
          region = {
            longitude: mural["Long"],
            latitude: mural["Lat"],
            longitudeDelta: .001,
            latitudeDelta: .001
          };
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
        
        // Only animate to the region if the region is different
        if (this.props.region !== nextProps.region) {
          this.goToRegion(nextProps.region, nextProps.onLayout);          
        }
        
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
        
        // Avoid a weird animation from initialRegion to region if theyre the same
        if (region === initialRegion) {
          region = undefined;
        }
        
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

