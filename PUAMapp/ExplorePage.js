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
import { NavigationActions } from "react-navigation";
import { lightpurple, darkpurple, pink } from "./colors.js";
import { Feather } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';


import  MapView, {Polyline} from 'react-native-maps';


// This triggers asking the user for location permissions.
// This won't do anything if the permission is already granted.
Permissions.askAsync(Permissions.LOCATION);

let exploreStyles = {};

// Note: For all intents and purposes, "mural key" is the same as "mural id".
// But "mural index" does not refer to either of those things, it only refers
// to a mural's order in the tour.
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
              style={exploreStyles.backButtonTouchable}
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <View style={exploreStyles.backButton}>
                <Feather name="chevron-left" size={25} color={pink} style={{marginBottom: 1}}/>
                <Text style={exploreStyles.headerButtonText}>  Back </Text>
              </View>
            </TouchableOpacity>
          ),
          headerStyle: exploreStyles.headerStyle
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
  
  // Logic for determining which mural should currently be shown to the user.
  // If we came from the gallery -> mural info page, show that mural.
  // If we're on a tour, show the mural of the index we're currently at
  // Otherwise return undefined.
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

      if (Platform.OS === 'ios') {
        return (
          <MapView.Marker
            key={i}
            title={title}
            description={artistName}
            coordinate={{ latitude: lat, longitude: long }}
            pinColor={pink}
            ref = {(ref) => this.markers[key] = ref}
          >
            <MapView.Callout 
              tooltip={false}
              onPress = {() => 
                  this.props.navigation.navigate({
                    key: murals[key]['uuid'], 
                    routeName: 'MuralInfoPage', 
                    params: {
                      mural: murals[key], 
                      artist: artists[murals[key]["Artist"]]
                    }
                  })
              }
            >
              <View style={exploreStyles.callOutContainer}>
                <View style={exploreStyles.callOutTextContainer}>
                  <Text style={exploreStyles.callOutTitle}>{title}</Text>
                  <Text>{artistName}</Text>
                </View>
                <View style={exploreStyles.callOutIconContainer}>
                  <Feather name="chevron-right" size={30} color={pink} style={{marginBottom: 1}}/>
                </View>
              </View>
            </MapView.Callout>
          </MapView.Marker>
        );
      } else { // UnStyled marker for Android
        return (
          <MapView.Marker
            key={i}
            title={title}
            description={artistName}
            coordinate={{ latitude: lat, longitude: long }}
            pinColor={pink}
            ref = {(ref) => this.markers[key] = ref}
            onCalloutPress = {() => 
                this.props.navigation.navigate({
                  key: murals[key]['uuid'], 
                  routeName: 'MuralInfoPage', 
                  params: {
                    mural: murals[key], 
                    artist: artists[murals[key]["Artist"]]
                  }
                })
            }
          />
        );
      }
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
  
          {this.props.screenProps.tourStarted ? 
            <View style = {exploreStyles.buttonContainer}>
              <View style = {exploreStyles.previousNextContainer}>
                <View style={exploreStyles.previousContainer}>
                  <TouchableOpacity style= {[exploreStyles.button, exploreStyles.prevNextButton]} onPress={() => this.tourPrev()}>
                    <Text numberOfLines={1} style = {exploreStyles.text}>Previous</Text>
                  </TouchableOpacity>
                </View>
                <View style={exploreStyles.nextContainer}>
                  <TouchableOpacity style= {[exploreStyles.button, exploreStyles.prevNextButton]} onPress={() => this.tourNext()}>
                    <Text style = {exploreStyles.text}>Next</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <TouchableOpacity style= {exploreStyles.button} onPress={() => this.toggleTour()}>
                <Text style = {exploreStyles.text}> End Virtual Tour </Text>
              </TouchableOpacity>
            </View> 
            :
                this.didComeFromGallery() ? null : 
                <View style = {exploreStyles.buttonContainer}>
                  <TouchableOpacity style= {exploreStyles.button} onPress={() => this.toggleTour()}>
                    <Text style = {exploreStyles.text}>Start Virtual Tour</Text>
                  </TouchableOpacity>
                </View>

            }
          </View>
        );
    }
}

/*****************************************************************************/

// Just a MapView but it animates to region if the region prop changes!
class AnimatedMapView extends React.Component {
    
    shouldComponentUpdate(nextProps, nextState) {
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

if (Platform.OS === "ios") {
  exploreStyles = StyleSheet.create({
    backButton: {
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
    },
    backButtonTouchable: {
      top: 30,
      left: -25,
      padding: 40
    },
    headerButtonText: {
      fontWeight: 'bold',
      fontSize: 17,
      color: pink
    },
    headerStyle: {
      position: "absolute",
      backgroundColor: "transparent",
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      borderBottomColor: "transparent"
    },
    callOutIconContainer: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      marginLeft: 15
    },
    callOutContainer: {
      flexDirection: "row",
      flex: 1
    },
    callOutTextContainer: {
      flexDirection: "column",
      flex: 1
    },
    callOutTitle: {
      fontWeight: 'bold',
      fontSize: 17
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: pink,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      position: "absolute",
      marginTop: "auto",
      bottom: 0,
      width: "100%",
    },
    previousNextContainer: {
      flex: 1,
      flexDirection: "row",
    },
    previousContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    nextContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    }, 
    prevNextButton: {
      width: 130,
    },
    button: {
      flexDirection: "row",
      backgroundColor: 'white',
      zIndex: 100,
      margin: 15,
      paddingLeft: 30,
      paddingRight: 30,
      height: 40,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 2,
      shadowOpacity: 0.6,
      elevation: 6,
    }
  });
} else { // Android
  exploreStyles = StyleSheet.create({
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: pink,
    },
    buttonContainer: {
      flex: 1,
      flexDirection: "column",
      justifyContent: "flex-end",
      alignItems: "center",
      position: "absolute",
      marginTop: "auto",
      bottom: 0,
      width: "100%",
    },
    previousNextContainer: {
      flex: 1,
      flexDirection: "row",
    },
    previousContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-start",
    },
    nextContainer: {
      flex: 1,
      flexDirection: "row",
      justifyContent: "flex-end",
    }, 
    prevNextButton: {
      width: 130,
    },
    button: {
      flexDirection: "row",
      backgroundColor: 'white',
      zIndex: 100,
      margin: 15,
      paddingLeft: 30,
      paddingRight: 30,
      height: 40,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 2,
      shadowOpacity: 0.6,
      elevation: 6,
    }
  });
}
