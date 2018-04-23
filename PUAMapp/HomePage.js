/*
 * HomePage.js is a component that makes up of Home page in the app.
 * It is the first page after Splash Screen, and can navigate user to
 * Explore page, Gallery page, and Contact page.
 */
import React from "react";
import {
  StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform
} from "react-native";
import { lightpurple, darkpurple, pink } from "./colors.js";
import Dimensions from "Dimensions";
import homepic from "./assets/images/home-background.jpg";
import homelogo from "./assets/images/home-logo.png";

const x = Dimensions.get("window").width;
const y = Dimensions.get("window").height;

var FONT_SIZE = y * 0.1;

export default class HomePage extends React.Component {
  static navigationOptions = {
    header: null
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={homepic} />
        <View style={styles.overlay} />
        <Image style={styles.logo} source={homelogo} />
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.darkPurpleButton}
          onPress={() => navigate({ key: 'Screen1', routeName: 'ExplorePage'})}
        >
          <Text style={styles.buttonText}>EXPLORE</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.lightPurpleButton}
          onPress={() => navigate({ key: 'Screen2', routeName: 'GalleryPage'})}
        >
          <Text style={styles.buttonText}>GALLERY</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.75}
          style={styles.pinkButton}
          onPress={() => navigate({ key: 'Screen3', routeName: 'ContactPage'})}
        >
          <Text style={styles.buttonText}>CONTACT</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "ios" ? "0%" : "-8%",
    flex: 1,
    display: "flex",
    backgroundColor: "#fff",
    alignItems: "stretch",
    justifyContent: "flex-end"
  },
  titleContainer: {
    // marginTop: '4%',
    // marginRight: '3%',
    flex: 1,
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "rgba(0,0,0,.4)"

    // style={{, , ,  }}
  },
  innerTitleContainer: {
    marginTop: "13.5%",
    paddingBottom: "0%"
  },
  titleText: {
    fontSize: FONT_SIZE,
    color: "white",
    backgroundColor: "transparent"
  },
  image: {
    resizeMode: "cover",
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  overlay: {
    backgroundColor: 'black',
    opacity: 0.1,
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  logo: {
    resizeMode: 'contain',
    alignSelf: 'center',
    width: '85%',
    marginBottom: 'auto',
    marginTop: 'auto'
  },
  darkPurpleButton: {
    height: "13%",
    backgroundColor: darkpurple,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
    margin: -1,
    marginTop: "-10%",
  },
  lightPurpleButton: {
    height: "13%",
    backgroundColor: lightpurple,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
    margin: -1
  },
  pinkButton: {
    height: "13%",
    backgroundColor: pink,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: 0.9,
    margin: -1
  },
  buttonText: {
    fontSize: 36,
    fontWeight: Platform.OS === "ios" ? "800" : "bold",
    color: "white"
  }
});
