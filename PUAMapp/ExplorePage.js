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
import { Feather } from '@expo/vector-icons';

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
              style={{ top: 30, left: -25, padding: 40 }}
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <View
                style={{
                  position: "relative",
                  flexDirection: "row",
                  backgroundColor: 'white',
                  zIndex: 100,
                  width: 120,
                  height: 40,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 6,
                  shadowOffset: { width: 1, height: 1 },
                  shadowRadius: 2,
                  shadowOpacity: 1,
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
            latitude: 42.518217,
            longitude: -70.891919,
            latitudeDelta: 0.005,
            longitudeDelta: 0.005
          }}
        >
          {this.renderImages()}
        </MapView>
      </View>
    );
  }
}
