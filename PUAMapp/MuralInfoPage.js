import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Platform,
  StatusBar,
  Linking} from "react-native";
import { NavigationActions } from "react-navigation";
import { pink } from "./colors.js";
import * as Animatable from "react-native-animatable";
import { Feather } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

const DESCRIPTION_FADE_DURATION = 500;
const DARK_OVERLAY_FADE_DURATION = 500;

const READ_MORE_FADE_OUT_DURATION = 200;
const CLOSE_BUTTON_FADE_DURATION = 200;
const READ_MORE_FADE_IN_DURATION = 1000;

function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

let self;
let infoStyles = {};

export default class MuralInfoPage extends React.Component {
  constructor(props) {
    super(props);
    self = this; // Hackily access component from static navigationOptions
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
              style={infoStyles.backButtonTouchable}
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <View style={infoStyles.backButton}>
                <Feather name="chevron-left" size={25} color={pink} style={{marginBottom: 1}} />
                <Text style={infoStyles.headerButtonText}>  Back </Text>
              </View>
            </TouchableOpacity>
          ),
          headerRight: (
            <TouchableOpacity
              style={infoStyles.mapButtonTouchable}
              onPress={() => {
                if (!self.props.navigation.state.params.fromGalleryPage) {
                  navigation.dispatch(NavigationActions.back())
                } else {
                  self.goToExplorePage()
                }
              }}
            >
              <View style={infoStyles.mapButton}>
                <Text style={infoStyles.headerButtonText}> Map  </Text>
                <Entypo name="location-pin" size={20} color={pink} />
              </View>
            </TouchableOpacity>
          ),
          headerStyle: infoStyles.headerStyle
        }
      : { // Android
          title: "Punto Urban Art",
          headerTintColor: "white",
          headerStyle: { backgroundColor: pink },
          headerRight: (
            <TouchableOpacity 
              onPress={() => self.goToExplorePage()} 
              style={infoStyles.androidMapButton}
            >
              <Entypo name="location-pin" size={25} color={'white'} />
            </TouchableOpacity>
          )
      };
  };

  toggleShowDescription() {
    this.setState({
      descriptionVisible: !this.state.descriptionVisible,
      pastInitialClick: true
    });
  }
  
  goToExplorePage() {
    const mural = this.props.navigation.state.params.mural;
    const { navigate } = this.props.navigation;
    navigate("ExplorePage", {
        muralID: mural["uuid"]
    });
  }
  
  render() {
    const mural = this.props.navigation.state.params.mural;
    const artist = this.props.navigation.state.params.artist;

    let closeButton = (
      <Feather name="x" size={50} color="white" style={{fontWeight: 'bold'}}/>
    );
    let readMoreButton = (
      <TouchableOpacity
        style={{paddingTop: 15, paddingBottom: 50, paddingRight: 70}}
        onPress={this.toggleShowDescription.bind(this)}
      >
        <View style={infoStyles.moreInfoButtonContainer}>
          <Text style={infoStyles.moreInfoButton}>Read More</Text>
        </View>
      </TouchableOpacity>
    );

    let description = "";
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

    let descriptionVisible = this.state.descriptionVisible;
    let pastInitialClick = this.state.pastInitialClick;

    return (
      <View style={infoStyles.container}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "light-content" : "light-content"}
        />
        <Image
          style={infoStyles.muralPhoto}
          source={{ uri: mural.Photo }}
        />
        <Animatable.View
          animation={descriptionVisible ? "fadeIn" : "fadeOut"}
          duration={DARK_OVERLAY_FADE_DURATION}
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
              duration={CLOSE_BUTTON_FADE_DURATION}
              style={infoStyles.button}
            >
              <TouchableOpacity
                style={infoStyles.closeTouchable}
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
                duration={descriptionVisible ? READ_MORE_FADE_OUT_DURATION : READ_MORE_FADE_IN_DURATION}
                style={infoStyles.description}
              >
                {readMoreButton}
              </Animatable.View>
            }
            {pastInitialClick && (
              <Animatable.View
                animation={descriptionVisible ? "fadeInUp" : "fadeOutDown"}
                duration={DESCRIPTION_FADE_DURATION}
                style={infoStyles.description}
              >
                <ScrollView style={infoStyles.descriptionScrollView}>
                  <Text style={infoStyles.descriptionText}>{description}</Text>

                  { !!(artist["link"] && artist["link"].trim().length > 0) &&
                    <TouchableOpacity
                      style={infoStyles.artistLinkTouchable}
                      onPress={() => Linking.openURL(artist["link"])}
                    >
                      <View>
                        <Text style={infoStyles.artistLinkText}>See more by {artist["name"]}</Text>
                      </View>
                    </TouchableOpacity>
                  }

                </ScrollView>
              </Animatable.View>
            )}
          </View>
        </View>
      </View>
    );
  }
}

if (Platform.OS === "ios") {
  infoStyles = StyleSheet.create({
    backButtonTouchable: {
      top: 30,
      left: -25,
      padding: 40
    },
    mapButtonTouchable: {
      top: 30,
      right: -25,
      padding: 40,
      marginLeft: 'auto'
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
    headerButtonText: {
      fontWeight: 'bold',
      fontSize: 17,
      color: pink
    },
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
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
    muralPhoto: {
      flex: 1,
      position: "absolute",
      resizeMode: "cover",
      height: "100%",
      width: "100%"
    },
    mapButton: {
      position: "relative",
      flexDirection: "row",
      backgroundColor: 'white',
      zIndex: 100,
      marginTop: -15,
      marginLeft: 'auto',
      width: 110,
      height: 40,
      borderRadius: 100,
      paddingLeft: 3,
      alignItems: 'center',
      justifyContent: 'center',
      shadowOffset: { width: 1, height: 1 },
      shadowRadius: 2,
      shadowOpacity: 0.6,
    },
    textContainer: {
      flex: 1,
      marginTop: isIphoneX() ? "25%" : "20%",
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
      marginBottom: "5%"
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
    closeTouchable: {
      padding: 15,
      paddingTop: 20,
      paddingLeft: 15,
      paddingBottom: 20
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
    },
    descriptionScrollView: {
      marginTop: 10,
      height:
      Dimensions.get("window").height / 2
    },
    descriptionText: {
      color: "white",
      marginTop: 10
    },
    artistLinkTouchable: {
      paddingTop: 30,
      paddingBottom: 30,
      paddingRight: 15
    },
    artistLinkText: {
      color: "white",
      fontSize: 15,
      textDecorationLine: 'underline'
    }
  });
} else {
  infoStyles = StyleSheet.create({
    headerStyle: {
      position: "absolute",
      backgroundColor: "transparent",
      zIndex: 100,
      top: 0,
      left: 0,
      right: 0,
      borderBottomColor: "transparent"
    },
    container: {
      flex: 1,
      backgroundColor: "#fff"
    },
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
    muralPhoto: {
      flex: 1,
      position: "absolute",
      resizeMode: "cover",
      height: "100%",
      width: "100%"
    },
    androidMapButton: {
      flex: 1, 
      width: 60, 
      height: '100%', 
      justifyContent: 'center', 
      alignItems: 'center'
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
    },
    closeTouchable: {
      padding: 15,
      paddingTop: 20,
      paddingLeft: 15,
      paddingBottom: 20
    },
    descriptionScrollView: {
      marginTop: 10,
      height:
      Dimensions.get("window").height / 2
    },
    descriptionText: {
      color: "white",
      marginTop: 10
    },
    artistLinkTouchable: {
      paddingTop: 30,
      paddingBottom: 30,
      paddingRight: 15
    },
    artistLinkText: {
      color: "white",
      fontSize: 15,
      textDecorationLine: 'underline'
    }
  });
}
