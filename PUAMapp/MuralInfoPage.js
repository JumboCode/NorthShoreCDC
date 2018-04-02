import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Animated,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  Alert
} from "react-native";
import { NavigationActions } from "react-navigation";
import { lightpurple, darkpurple, pink } from "./colors.js";
import * as Animatable from "react-native-animatable";
import { Feather } from '@expo/vector-icons';

// var infoButtons = [
//   require("./assets/images/info.png"),
//   require("./assets/images/xbutton.png")
// ];

function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export default class MuralInfoPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      descriptionVisible: false,

      // should be set true after the first time the user clicks to show description
      // this prevents fadeIn/fadeOut animations on intial render
      pastInitialClick: false
    };
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
                <Feather name="chevron-left" size={25} color={pink} style={{marginBottom: 1}} />
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

  toggleShowDescription() {
    this.setState({
      descriptionVisible: !this.state.descriptionVisible,
      pastInitialClick: true
    });
  }
  
  goToExplorePage() {
    const mural = this.props.navigation.state.params.mural;
    const artist = this.props.navigation.state.params.artist;
    const { navigate } = this.props.navigation;
    navigate("ExplorePage", {
        muralID: mural["uuid"]
    });
  }
  
  render() {
    const mural = this.props.navigation.state.params.mural;
    const artist = this.props.navigation.state.params.artist;

    closeButton = (
      <Feather name="x" size={50} color="white" style={{fontWeight: 'bold'}} />
    );
    readMoreButton = (
      <TouchableOpacity
        style={{
          paddingTop: 15,
          paddingBottom: 50,
          paddingRight: 70
        }}
        onPress={this.toggleShowDescription.bind(this)}
      >
        <View style={infoStyles.moreInfoButtonContainer}>
          <Text style={infoStyles.moreInfoButton}>Read More</Text>
        </View>
      </TouchableOpacity>
    );

    goToExplorePageButton = (
      <TouchableOpacity
        style={{
          paddingTop: 100,
          paddingBottom: 50,
          paddingRight: 70
        }}
        onPress={this.goToExplorePage.bind(this)}
      >
        <View>
          <Text style={infoStyles.moreInfoButton}>See on Map!</Text>
        </View>
      </TouchableOpacity>
    );

    var description = "";
    if (artist["city"]) {
      description += artist["city"];
    }

    if (mural["Month"] && mural["Year"]) {
      description += "\n\n" + mural["Month"] + ", " + mural["Year"];
    }

    if (mural["Medium"]) {
      description += "\n" + mural["Medium"];
    }

    if (mural["Description"] && mural["Description"].trim().length > 0) {
      description += "\n\n" + mural["Description"];
    }

    if (artist["bio"] && artist["bio"].trim().length > 0) {
      description += "\n\n" + artist["bio"];
    }

    descriptionVisible = this.state.descriptionVisible;
    pastInitialClick = this.state.pastInitialClick;

    return (
      <View style={infoStyles.container}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
        />
        <Image
          style={{
            flex: 1,
            position: "absolute",
            resizeMode: "cover",
            height: "100%",
            width: "100%"
          }}
          source={{ uri: mural.Photo }}
        />
        <Animatable.View
          animation={descriptionVisible ? "fadeIn" : "fadeOut"}
          duration={500}
          style={infoStyles.darkerOverlay}
        />
        <View style={infoStyles.darkOverlay} />
        <View style={infoStyles.textContainer}>
          <View style={infoStyles.top}>
            <View style={infoStyles.info}>
              <View>
                <Text style={infoStyles.name}>{mural.Title}</Text>
              </View>
              <View>
                <Text style={infoStyles.artist}>{artist.name}</Text>
              </View>
            </View>
            <Animatable.View
              animation={descriptionVisible ? "fadeIn" : "fadeOut"}
              duration={200}
              style={infoStyles.button}
            >
              <TouchableOpacity
                style={{
                  padding: 15,
                  paddingTop: 20,
                  paddingLeft: 15,
                  paddingBottom: 20
                }}
                onPress={this.toggleShowDescription.bind(this)}
              >
                {closeButton}
              </TouchableOpacity>
            </Animatable.View>
          </View>
          <View style={{flex: 1}}>
            {
              <Animatable.View
                animation={descriptionVisible ? "fadeOut" : "fadeIn"}
                duration={descriptionVisible ? 200 : 1000}
                style={infoStyles.description}
              >
                {readMoreButton}
              </Animatable.View>
            }
            {pastInitialClick && (
              <Animatable.View
                animation={descriptionVisible ? "fadeInUp" : "fadeOutDown"}
                duration={500}
                style={infoStyles.description}
              >
                <ScrollView style={{marginTop: 10, height: Dimensions.get("window").height / 2}}>
                  <Text style={{ color: "white", marginTop: 10 }}>{description}</Text>
                </ScrollView>
              </Animatable.View>
            )}
            
            {goToExplorePageButton}
            
          </View>
        </View>
      </View>
    );
  }
}

infoStyles = {};
if (Platform.OS === "ios") {
  infoStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    textContainer: {
      flex: 1,
      marginTop: "20%",
      paddingTop: 60,
      padding: 20,
      paddingRight: 0,
      backgroundColor: "transparent"
    },
    top: {
      display: "flex",
      flexDirection: "row"
    },
    info: {
      flex: 4,
      justifyContent: "center",
      alignItems: "flex-start"
    },
    button: {
      flex: 2,
      justifyContent: "center",
      alignItems: "flex-end"
    },
    name: {
      color: "white",
      fontWeight: "bold",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      paddingLeft: 3,
      paddingTop: 3,
      lineHeight: 35,
      marginBottom: 5,
      fontSize: 36
    },
    artist: {
      color: "white",
      textShadowColor: "black",
      textShadowOffset: { width: 1, height: 1 },
      textShadowRadius: 2,
      paddingLeft: 3,
      fontSize: 24,
    },
    description: {
      paddingRight: 20,
      paddingLeft: 3,
      position: "absolute",
      flex: 1
    },
    darkOverlay: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.3)"
    },
    darkerOverlay: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.7)"
    },
    moreInfoButton: {
      color: "white",
      textShadowColor: "black",
      textShadowOffset: { width: -1, height: 1 },
      textShadowRadius: 2,
      fontWeight: 'bold',
      fontSize: 16
    },
    moreInfoButtonContainer: {
      backgroundColor: "rgba(128, 128, 128, 0.3)",
      width: 135,
      height: 40,
      borderColor: 'white',
      marginLeft: -5,
      borderWidth: 2,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "black",
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 2,
      shadowOpacity: 0.6,
    }
  });
} else {
  infoStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
    textContainer: {
      flex: 1,
      paddingTop: 60,
      paddingRight: 0,
      padding: 20,
      backgroundColor: "transparent"
    },
    top: {
      display: "flex",
      flexDirection: "row"
    },
    info: {
      flex: 4,
      justifyContent: "center",
      alignItems: "flex-start"
    },
    button: {
      flex: 2,
      justifyContent: "center",
      alignItems: "flex-end"
    },
    name: {
      color: "white",
      textShadowColor: "black",
      fontWeight: "bold",
      textShadowOffset: { width: -1, height: 0 },
      textShadowRadius: 5,
      paddingLeft: 2,
      lineHeight: 35,
      marginBottom: 5,
      fontSize: 36
    },
    artist: {
      color: "white",
      textShadowColor: "black",
      textShadowOffset: { width: -1, height: 0 },
      textShadowRadius: 5,
      paddingLeft: 2,
      fontSize: 24,
    },
    description: {
      paddingRight: 20,
      paddingLeft: 2,
      position: "absolute"
    },
    darkOverlay: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.4)"
    },
    darkerOverlay: {
      position: "absolute",
      height: "100%",
      width: "100%",
      backgroundColor: "rgba(0, 0, 0, 0.6)"
    },
    moreInfoButton: {
      color: "white",
      fontSize: 15,
      elevation: 4,
    },
    moreInfoButtonContainer: {
      backgroundColor: "rgba(56, 56, 56, 0.3)",
      width: 135,
      height: 40,
      borderColor: 'white',
      borderWidth: 2,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      elevation: 2,
    }
  });
}
