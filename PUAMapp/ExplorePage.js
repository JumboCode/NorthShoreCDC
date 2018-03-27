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
  Platform
} from "react-native";
import { Permissions } from "expo";
import { MapView } from "expo";
import { NavigationActions } from "react-navigation";
import { lightpurple, darkpurple, pink } from "./colors.js";

// This triggers asking the user for location permissions.
// This won't do anything if the permission is already granted.
Permissions.askAsync(Permissions.LOCATION);

export default class ExplorePage extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return Platform.OS === "ios"
      ? {
          headerLeft: (
            <TouchableOpacity
              style={{ top: 25, left: -25, padding: 40 }}
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <Image
                style={{
                  position: "relative",
                  zIndex: 100,
                  maxWidth: 120,
                  maxHeight: 40
                }}
                source={require("./assets/images/backbutton.png")}
              />
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

  renderImages() {
    const { navigate } = this.props.navigation;

    murals = this.props.screenProps.murals || {};
    artists = this.props.screenProps.artists || {};

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

  render() {
    const { navigate } = this.props.navigation;
    
    // If this.props.muralID is set, use that. Also zoom more.
    murals = this.props.screenProps.murals || {};
    key = this.props.muralID
    initialLat = 42.518217;
    initialLong = -70.891919;
    initialDelta = 0.0000005;
    if (this.props.muralID) {
        initialLat = parseFloat(murals[key]["Lat"]);
        initialLong = parseFloat(murals[key]["Long"]);
        initialDelta = 1; // more zoooooom
    }
    
    return (
      <View style={{ flex: 1 }}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <MapView
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
