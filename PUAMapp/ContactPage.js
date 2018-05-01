import React from "react";
import {
  Alert,
  Clipboard,
  Dimensions,
  Image,
  Linking,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import {NavigationActions} from "react-navigation";
import {Feather} from '@expo/vector-icons';

import {pink} from "./colors.js";
import { isIOS, isIphoneX } from "./utilities";

const PAYPAL_URL = "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UF8MF7Q9E7HSA";
const ADDRESS_LINE_1 = "96 Lafayette St";
const ADDRESS_LINE_2 = "Salem, MA 01970";
const PHONE_NUMBER_LINK = "tel://9787458071";
const PHONE_NUMBER_DISPLAY = "978-745-8071";
const BOOK_TOUR_URL = "http://puntourbanartmuseum.org/open-air-museum/educational-tours/";
const CONTACT_EMAIL = 'info@northshorecdc.org';
const FACEBOOK_URL = "https://www.facebook.com/puntourbanartmuseum/";
const INSTAGRAM_URL = "https://www.instagram.com/urban.art.museum";
const TWITTER_URL = "https://www.twitter.com/NorthShoreCDC";
const FEEDBACK_FORM_URL = 'https://goo.gl/forms/j0sNljXz4mEd5lCN2';

const CONTACT_BACKGROUND_IMAGE = "./assets/images/contact_background.jpg";
const FACEBOOK_ICON = "./assets/images/facebook.png";
const INSTAGRAM_ICON = "./assets/images/instagram.png";
const TWITTER_ICON = "./assets/images/twitter.png";
const EMAIL_ICON = './assets/images/email.png';


let contactStyles = {};

export default class ContactPage extends React.Component {
  static navigationOptions = ({navigation}) => {
    return isIOS()
      ? {
        headerLeft: (
          <TouchableOpacity
            style={contactStyles.backButtonTouchable}
            onPress={() => navigation.dispatch(NavigationActions.back())}
          >
            <View style={contactStyles.backButton}>
              <Feather name="chevron-left" size={25} color={pink} style={{marginBottom: 1}}/>
              <Text style={contactStyles.headerButtonText}> Back </Text>
            </View>
          </TouchableOpacity>
        ),
        headerStyle: contactStyles.headerStyle
      }
      : {
        title: "Punto Urban Art",
        headerTintColor: "white",
        headerStyle: {backgroundColor: pink}
      };
  };

  render() {

    return (
      <View style={contactStyles.container}>
        <StatusBar
          barStyle={isIOS() ? "dark-content" : "light-content"}
        />
        <Image
          style={contactStyles.image}
          source={require(CONTACT_BACKGROUND_IMAGE)}
        />

        <View style={contactStyles.textContainerLeft}>
          <Text style={contactStyles.textLeft}>
            A project of North
            {"\n"}
            Shore Community
            {"\n"}
            Development
            {"\n"}
            Coalition
          </Text>
        </View>

        <TouchableOpacity
          style={contactStyles.donateImage}
          onPress={() =>
            Linking.openURL(PAYPAL_URL).catch(err =>
              console.error("An error occurred", err)
            )
          }
        >
          <Text style={contactStyles.donateText}> DONATE </Text>
        </TouchableOpacity>

        <View style={contactStyles.textContainerRight}>
            <View style={contactStyles.textRightContainer}>
              <Text style={contactStyles.textRight}>{ADDRESS_LINE_1}</Text>
            </View>
            <View style={contactStyles.textRightContainer}>
              <Text style={contactStyles.textRight}>{ADDRESS_LINE_2}</Text>
            </View>
            <View style={contactStyles.textRightContainer}>
              <Text
                style={contactStyles.textRight}
                onPress={() => Linking.openURL(PHONE_NUMBER_LINK)}
              >
                {PHONE_NUMBER_DISPLAY}
              </Text>
            </View>

          <TouchableOpacity
            style={contactStyles.tourRequestImage}
            onPress={() =>
              Linking.openURL(BOOK_TOUR_URL)
                .catch(err => console.error('An error occurred', err))
            }
          >
            <Text style={contactStyles.tourRequestText}> Book Tour </Text>
          </TouchableOpacity>

          <View style={contactStyles.bottomRow}>
            <View style={contactStyles.socialStyle}>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    FACEBOOK_URL
                  ).catch(err => console.error("An error occurred", err))
                }
              >
                <Image
                  style={contactStyles.iconStyle}
                  source={require(FACEBOOK_ICON)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    INSTAGRAM_URL
                  ).catch(err => console.error("An error occurred", err))
                }
              >
                <Image
                  style={contactStyles.iconStyle}
                  source={require(INSTAGRAM_ICON)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(TWITTER_URL).catch(
                    err => console.error("An error occurred", err)
                  )
                }
              >
                <Image
                  style={contactStyles.iconStyle}
                  source={require(TWITTER_ICON)}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  Clipboard.setString(CONTACT_EMAIL);
                  Alert.alert(
                    'Email Copied',
                    CONTACT_EMAIL,
                    [{text: 'OK', onPress: () => console.log('OK Pressed')}])
                }}
              >
                <Image
                  style={contactStyles.iconStyle}
                  source={require(EMAIL_ICON)}
                />
              </TouchableOpacity>
            </View>
          </View>
          <TouchableOpacity
            onPress={() => Linking.openURL(FEEDBACK_FORM_URL).catch(err => console.error('An error occurred', err))}>
            <Text style={contactStyles.bugReportText}>Report Bug Here</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

if (isIOS()) {
  contactStyles = StyleSheet.create({
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
    container: {
      flex: 1
    },
    image: {
      flex: 1,
      position: "absolute",
      resizeMode: "cover",
      height: "100%",
      width: "100%"
    },
    backButton: {
      position: "relative",
      flexDirection: "row",
      backgroundColor: 'white',
      marginTop: -15,
      zIndex: 100,
      width: 120,
      height: 40,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 6,
      shadowOffset: {width: 1, height: 1},
      shadowRadius: 2,
      shadowOpacity: 0.6,
    },
    textContainerLeft: {
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingLeft: "4%",
      paddingTop: isIphoneX() ? "40%" : "32%",
      marginBottom: "auto"
    },
    textLeft: {
      fontSize: 20,
      color: "black"
    },
    textContainerRight: {
      backgroundColor: "transparent",
      display: "flex",
      alignItems: "flex-end",
      paddingRight: "5%",
      marginTop: "auto",
      paddingBottom: isIphoneX() ? "12%" : "4%"
    },
    textRight: {
      display: "flex",
      width: null,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      backgroundColor: pink,
      fontSize: 20,
      alignSelf: 'baseline',
      padding: 3,
      paddingBottom: 1,
      lineHeight: 20,
      color: "white",
      textAlign: "right",
      marginBottom: 5,
    },
    textRightContainer: {
      alignSelf: 'flex-end',
    },
    socialStyle: {
      flexDirection: "row",
      alignSelf: "flex-end",
    },
    bottomRow: {
      flexDirection: "row",
    },
    iconStyle: {
      tintColor: pink,
      height: 37,
      width: 37,
      margin: 10,
      marginLeft: 25,
      marginRight: 0,
    },
    donateText: {
      fontSize: 22,
      fontWeight: "bold",
      color: "white"
    },
    donateImage: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: pink,
      width: 160,
      height: 40,
      marginLeft: "8%",
      marginTop: isIphoneX() ? "-25%" : "-20%",
      borderRadius: 100,
      shadowColor: "black",
      shadowOffset: {width: 3, height: 4},
      shadowRadius: 3,
      shadowOpacity: 0.7
    },
    tourRequestText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: pink,
    },
    tourRequestImage: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 120,
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: '6%',
      marginBottom: '3%',
      height: 40,
      borderRadius: 100,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {width: 1, height: 1,},
      shadowOpacity: 0.6,
    },
    bugReportText: {
      fontSize: 10,
      marginTop: 5,
      color: pink,
      fontWeight: "bold",
      textDecorationLine: "underline",
    },
  });
} else {
  contactStyles = StyleSheet.create({
    container: {
      flex: 1
    },
    image: {
      flex: 1,
      position: "absolute",
      resizeMode: "cover",
      height: "100%",
      width: "100%"
    },
    backButton: {
      position: "relative",
      flexDirection: "row",
      backgroundColor: 'white',
      marginTop: -15,
      zIndex: 100,
      width: 120,
      height: 40,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      paddingRight: 6,
      shadowOffset: {width: 1, height: 1},
      shadowRadius: 2,
      shadowOpacity: 0.6,
    },
    textContainerLeft: {
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingLeft: "4%",
      paddingTop: "5%",
      marginBottom: "auto"
    },
    textLeft: {
      fontSize: 20,
      color: "black"
    },
    textContainerRight: {
      backgroundColor: "transparent",
      display: "flex",
      alignItems: "flex-end",
      paddingRight: "5%",
      marginTop: "auto",
      paddingBottom: isIphoneX() ? "12%" : "4%"
    },
    textRight: {
      display: "flex",
      width: null,
      justifyContent: "flex-end",
      alignItems: "flex-end",
      backgroundColor: pink,
      fontSize: 15,
      alignSelf: 'baseline',
      padding: 3,
      paddingBottom: 1,
      lineHeight: 15,
      color: "white",
      textAlign: "right",
      marginBottom: 5,
    },
    textRightContainer: {
      alignSelf: 'flex-end',
    },
    socialStyle: {
      flexDirection: "row"
    },
    iconStyle: {
      tintColor: pink,
      height: 32,
      width: 32,
      margin: 10,
      marginLeft: 20,
      marginRight: 0,
    },
    donateText: {
      backgroundColor: "transparent",
      fontWeight: "bold",
      color: "white",
      fontSize: 25
    },
    donateImage: {
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: pink,
      height: 45,
      paddingBottom: 1,
      paddingLeft: 1,
      width: 160,
      marginLeft: "8%",
      marginRight: "auto",
      marginTop: "-10%",
      borderRadius: 100,
      elevation: 6
    },
    tourRequestText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: pink,
    },
    tourRequestImage: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 120,
      paddingLeft: 25,
      paddingRight: 25,
      marginTop: "3%",
      marginBottom: "1%",
      height: 40,
      borderRadius: 100,
      backgroundColor: 'white',
      elevation: 4,
    },
    bugReportText: {
      fontSize: 10,
      color: pink,
      fontWeight: "bold",
      textDecorationLine: "underline",
    },
  });
}
