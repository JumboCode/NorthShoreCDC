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
import  MapView  from "react-native-maps";
import { NavigationActions } from "react-navigation";
import { lightpurple, darkpurple, pink } from "./colors.js";
import { Feather } from '@expo/vector-icons';

// This triggers asking the user for location permissions.
// This won't do anything if the permission is already granted.
Permissions.askAsync(Permissions.LOCATION);

let exploreStyles = {};

export default class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
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
  
  renderImages() {
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
        this.calloutToMakeVisible = ref;
      }).bind(this);
      
      if (Platform.OS === 'ios') {
        return (
          <MapView.Marker
            key={i}
            title={title}
            description={artistName}
            coordinate={{ latitude: lat, longitude: long }}
            pinColor={pink}
            ref = {key == defaultMuralID ? setRefLambda : null}
            onCalloutPress = {() => this.props.navigation.navigate({key: murals[key]['uuid'], routeName: 'MuralInfoPage', params: {mural: murals[key], artist: artists[murals[key]["Artist"]]}})}
          >
            <MapView.Callout 
              tooltip={false}
              onPress = {() => this.props.navigation.navigate({key: murals[key]['uuid'], routeName: 'MuralInfoPage', params: {mural: murals[key], artist: artists[murals[key]["Artist"]]}})}
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
      } else {
        return (
          <MapView.Marker
            key={i}
            title={title}
            description={artistName}
            coordinate={{ latitude: lat, longitude: long }}
            pinColor={pink}
            ref = {key == defaultMuralID ? setRefLambda : null}
            onCalloutPress = {() => this.props.navigation.navigate({key: murals[key]['uuid'], routeName: 'MuralInfoPage', params: {mural: murals[key], artist: artists[murals[key]["Artist"]]}})}
          />
        );
      }
    });
  }
  
  goToMural() {

    if (this.calloutToMakeVisible) {
      this.calloutToMakeVisible.showCallout();
    }

    if (this.props.navigation.state.params && this.props.navigation.state.params.muralID) {
        murals = this.props.screenProps.murals || {};
        key = this.props.navigation.state.params.muralID;
        
        region = {
          latitude: parseFloat(murals[key]["Lat"]),
          longitude: parseFloat(murals[key]["Long"]),
          latitudeDelta: .001,
          longitudeDelta: .001,
        }

        this.map.animateToRegion(region, 1);
    }
    
  }
  
  render() {
    const { navigate } = this.props.navigation;
    

    initialLat = 42.518217;
    initialLong = -70.891919;
    initialDelta = 0.005;

    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <MapView
          ref = {(r) => this.map = r}
          onLayout={this.goToMural.bind(this)}
          onMapReady={this.goToMural.bind(this)}
          showsPointsOfInterest={false}
          showsUserLocation={true}
          style={{ flex: 1 }}
          region={{
            latitude: initialLat,
            longitude: initialLong,
            latitudeDelta: initialDelta,
            longitudeDelta: initialDelta
          }}
        >
          {this.renderImages()}
        </MapView>
      </View>
    );
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
    }
  })}
