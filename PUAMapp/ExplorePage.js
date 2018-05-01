import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  StatusBar,
} from "react-native";
import { Permissions } from "expo";
import { NavigationActions } from "react-navigation";
import { pink } from "./colors.js";
import { Feather } from '@expo/vector-icons';
import  MapView from 'react-native-maps';
import { isIOS } from "./utilities";

const INITIAL_LAT = 42.518217;
const INITIAL_LONG = -70.891919;
const INITIAL_DELTA = 0.005;
const ZOOM_IN_DELTA = .001;

const ANIMATION_DELAY = 500;
const ANIMATION_DURATION = 1000;

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
    this.markers = {};

    this.tourNext = this.tourNext.bind(this);
  }


  static navigationOptions = ({ navigation}) => {
    return isIOS()
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
  };


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
      let currMarkerIndex = this.props.screenProps.currMarker
      let murals = this.props.screenProps.murals || {};

      for (let muralKey in murals) {
        if (murals[muralKey]["Index"] === currMarkerIndex) {
          return muralKey;
        }
      }
    }
    return undefined;
  }


  renderMarkers() {
    let murals = this.props.screenProps.murals || {};
    let artists = this.props.screenProps.artists || {};

    return Object.keys(murals).map((key, i) => {
      let lat = parseFloat(murals[key]["Lat"]);
      let long = parseFloat(murals[key]["Long"]);
      let title = murals[key]["Title"];
      let artistName = artists[murals[key]["Artist"]]["name"];

      if (isIOS()) {
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
    if (this.markers && this.currentMuralID()) {

      // Note: we must delay showing the callout because it should only happen
      // AFTER we animate to the region for that callout.
      // This prevents an animation bug in which we showed the callout while
      // the map was still animating to the region.

      setTimeout(function () {
        if(this.markers[this.currentMuralID()]){
          this.markers[this.currentMuralID()].showCallout();
        }
      }.bind(this), ANIMATION_DELAY + ANIMATION_DURATION);
    }
  }


  toggleTour() {
    let murals = this.props.screenProps.murals || {};

    // If we're ending a tour, hide any callouts that may be still visible.
    if (this.props.screenProps.tourStarted){
      Object.keys(murals).map((key,i) =>{
        this.markers[key].hideCallout();
      });
    }
    this.props.screenProps.tourState()
  }


  tourNext () {
    this.props.screenProps.changeMarker();
    if (this.props.screenProps.currMarker === Object.keys(this.props.screenProps.murals).length - 1) {
      this.toggleTour();
    }
  }


  tourPrev() {
    if (this.props.screenProps.currMarker !== 1) {
      this.props.screenProps.changeMarkerPrev();
    }
  }


  render() {
    let initialRegion = {
      longitude: INITIAL_LONG,
      latitude: INITIAL_LAT,
      latitudeDelta: INITIAL_DELTA,
      longitudeDelta: INITIAL_DELTA
    };

    let region = undefined;
    let murals = this.props.screenProps.murals || {};

    if (this.currentMuralID()) {
      let mural = murals[this.currentMuralID()];
      region = {
        longitude: mural["Long"],
        latitude: mural["Lat"],
        longitudeDelta: ZOOM_IN_DELTA,
        latitudeDelta: ZOOM_IN_DELTA
      };
    } else {
      region = initialRegion
    }

    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle={ isIOS() ? "dark-content" : "light-content"}/>
        <AnimatedMapView
          style={{flex: 1 }}
          showsPointsOfInterest={false}
          showsUserLocation={true}
          initialRegion={initialRegion}
          region={region}
          onLayout={this.goToMural.bind(this)}
        >
          {this.renderMarkers()}
        </AnimatedMapView>

        {this.props.screenProps.tourStarted ?
          <View style = {exploreStyles.buttonContainer}>
            <View style = {exploreStyles.previousNextContainer}>
              <View style={exploreStyles.previousContainer}>
                <TouchableOpacity
                  style={[exploreStyles.button, exploreStyles.prevNextButton]}
                  onPress={() => this.tourPrev()}
                >
                  <Text style={exploreStyles.text}>Previous</Text>
                </TouchableOpacity>
              </View>
              <View style={exploreStyles.nextContainer}>
                <TouchableOpacity
                  style={[exploreStyles.button, exploreStyles.prevNextButton]}
                  onPress={() => this.tourNext()}
                >
                  <Text style = {exploreStyles.text}>Next</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity
              style={exploreStyles.button}
              onPress={() => this.toggleTour()}
            >
              <Text style={exploreStyles.text}> End Virtual Tour </Text>
            </TouchableOpacity>
          </View>
          :
          this.didComeFromGallery() ? null :
            <View style={exploreStyles.buttonContainer}>
              <TouchableOpacity
                style={exploreStyles.button}
                onPress={() => this.toggleTour()}>
                <Text style={exploreStyles.text}>Start Virtual Tour</Text>
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
        this.map.animateToRegion(region, ANIMATION_DURATION);
      }.bind(this), ANIMATION_DELAY);
    }

    if (onLayout) {
      onLayout();
    }
  }

  render() {
    let {initialRegion, region, children, onLayout, ...otherProps} = this.props;

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

if (isIOS()) {
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
      fontSize: 16,
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
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 15,
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
      paddingLeft: 5,
      paddingRight: 5,
      paddingBottom: 15,
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
