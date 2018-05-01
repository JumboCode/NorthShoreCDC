import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import { NavigationActions } from "react-navigation";
import Img from "react-native-image-progress";
import Progress from "react-native-progress";
import { Feather } from '@expo/vector-icons';

import { pink } from "./colors.js";
import { isIOS, isIphoneX } from "./utilities";

const IOS_HEADER_IMAGE = "./assets/images/gallery-header-new.jpg";
const ANDROID_HEADER_IMAGE = "./assets/images/gallery_top_image.jpg";


let galleryStyles = {};

export default class GalleryPage extends React.Component {
  constructor(props) {
    super(props);
  }

  static navigationOptions = ({ navigation }) => {
    return isIOS()
      ? {
          headerLeft: (
            <TouchableOpacity
              style={galleryStyles.backButtonTouchable}
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <View style={galleryStyles.backButton}>
                <Feather name="chevron-left" size={25} color={pink} style={{marginBottom: 1}}/>
                <Text style={galleryStyles.headerButtonText}>  Back </Text>
              </View>
            </TouchableOpacity>
          ),
          headerStyle: galleryStyles.headerStyle
        }
      : {
          title: "Punto Urban Art",
          headerTintColor: "white",
          headerStyle: { backgroundColor: pink }
        };
  };

  renderImages() {

    const { navigate } = this.props.navigation;

    let murals, artists, muralsArray;
    murals = this.props.screenProps.murals || {};
    artists = this.props.screenProps.artists || {};
    muralsArray = [];

    Object.keys(murals).map((key, i) => {
      muralsArray.push(murals[key]);
    });

    muralsArray.sort(function (a,b){return a["Index"] - b["Index"]});
    
    return muralsArray.map((mural, i) => {
      let uri = mural["Photo"];
      return (
        <TouchableOpacity
          key={i}
          onPress = {() => 
            navigate({
              key: mural["uuid"], 
              routeName: 'MuralInfoPage', 
              params: {
                mural: mural,
                fromGalleryPage: true,
                artist: artists[mural["Artist"]]
              }
            })
          }
        >
          <Img
            key={i}
            style={galleryStyles.gridSquareImage}
            source={{ uri: uri }}
            indicator={Progress}
          />
        </TouchableOpacity>
      );
    });
  }

  render() {
    return (
      <ScrollView>
        <View>
          <Image style={galleryStyles.image}
            source={
              isIOS()
                ? require(IOS_HEADER_IMAGE)
                : require(ANDROID_HEADER_IMAGE)
            }
          />
          <View style={galleryStyles.imageGallery}>
            <Text style={galleryStyles.textGallery}>
              GALLERY
            </Text>
          </View>
        </View>
        <View style={galleryStyles.imageCollection}>
          {this.renderImages()}
        </View>
      </ScrollView>
    );
  }
}

let { height, width } = Dimensions.get("window");
let gridSquareSize = width / 3 - 1;
let headerHeight = height / 3;

if (isIOS()) {
  galleryStyles = StyleSheet.create({
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
    image: {
      alignSelf: "center",
      position: "relative",
      height: headerHeight,
      width: width,
      resizeMode: "cover"
    },
    imageGallery: {
      backgroundColor:
        isIOS() ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,.5)",
      height: headerHeight,
      position: "absolute",
      width: width,
      justifyContent: "center",
      alignItems: "center"
    },
    textGallery: {
      color: "white",
      fontSize: 38 / 300 * width,
      fontWeight: "bold",
      marginTop: (isIphoneX() ? "30%" : "26%")
    },
    gridSquareImage: {
      height: gridSquareSize,
      width: gridSquareSize,
      margin: 1
    },
    imageCollection: {
      alignSelf: "center",
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      margin: -1,
      marginLeft: -2,
      marginTop: 1
    }
  })
} else {
  galleryStyles = StyleSheet.create({
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
    image: {
      alignSelf: "center",
      position: "relative",
      height: headerHeight,
      width: width,
      resizeMode: "cover"
    },
    imageGallery: {
      backgroundColor:
        isIOS() ? "rgba(0,0,0,0.1)" : "rgba(0,0,0,.5)",
      height: headerHeight,
      position: "absolute",
      width: width,
      justifyContent: "center",
      alignItems: "center"
    },
    textGallery: {
      color: "white",
      fontSize: 40 / 300 * width,
      fontWeight: "bold",
      marginTop: 0
    },
    imageCollection: {
      alignSelf: "center",
      alignItems: "center",
      flex: 1,
      flexDirection: "row",
      flexWrap: "wrap",
      margin: -1,
      marginLeft: -2,
      marginTop: 1
    },
    gridSquareImage: {
      height: gridSquareSize,
      width: gridSquareSize,
      margin: 1
    },
  })
}