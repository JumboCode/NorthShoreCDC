/*
 * ContactPage.js is a component that makes up of Contact page in the app.
 * It uses linkify to create links connecting to different utility pages and
 * contacts.
 */
import React from "react";
import {
  Alert,
  Clipboard,
  StyleSheet,
  Text,
  View,
  Image,
  ImageBackground,
  ScrollView,
  Button,
  TouchableOpacity,
  Linking,
  StatusBar,
  Platform,
  Dimensions
} from "react-native";
import { lightpurple, darkpurple, pink } from "./colors.js";
import { NavigationActions } from "react-navigation";
import Hyperlink from "react-native-hyperlink";
import LinkifyIt from "linkify-it";
import { Feather } from '@expo/vector-icons';

const paypalUrl =
  "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UF8MF7Q9E7HSA";
linkify = new LinkifyIt().add('tel:', 'http:').add('fax:', 'http:')
email = 'info@northshorecdc.org'
feedbackFormURL = 'https://goo.gl/forms/j0sNljXz4mEd5lCN2'

links = {
  "http://northshorecdc.org/about-us/contact-us/": "Our website",
  "tel://9787458071": "978-745-8071",
  "fax://9787454345": "978-745-4345",
  "http://northshorecdc.org/": "NSCDC Website",

  "https://www.facebook.com/puntourbanartmuseum/":
    "Facebook: @puntourbanartmuseum",
  "https://www.twitter.com/NorthShoreCDC": "Twitter: @NorthShoreCDC",
  "https://www.instagram.com/urban.art.museum": "Instagram: @urban.art.museum",
  "mailto:info@northshorecdc.org": "info@northshorecdc.org",
  "http://northshorecdc.org/support-us/donate/": "Donate"
};

function isIphoneX() {
  const dimen = Dimensions.get("window");
  return (
    Platform.OS === "ios" &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 812 || dimen.width === 812)
  );
}

export default class ContactPage extends React.Component {
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
                  marginTop: -15,
                  zIndex: 100,
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

  textForLink(text) {
    return links[text] || text;
  }

  render() {
    return (
      <View style={contactStyles.container}>
        <StatusBar
          barStyle={Platform.OS === "ios" ? "dark-content" : "light-content"}
        />
        <Image
          style={contactStyles.image}
          source={require("./assets/images/contact_background.jpg")}
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
            Linking.openURL(paypalUrl).catch(err =>
              console.error("An error occurred", err)
            )
          }
        >
          <Text style={contactStyles.donateText}> DONATE </Text>
        </TouchableOpacity>
        <View style={contactStyles.textContainerRight}>

          <TouchableOpacity style= {contactStyles.bugReport_tourRequestImage} onPress={() => Linking.openURL("http://puntourbanartmuseum.org/open-air-museum/educational-tours/").catch(err => console.error('An error occurred', err))}>
            <Text style = {contactStyles.bugReport_tourRequestText}>Book Tour</Text>
          </TouchableOpacity>

          <TouchableOpacity style= {contactStyles.bugReport_tourRequestImage} onPress={() => Linking.openURL(feedbackFormURL).catch(err => console.error('An error occurred', err))}>
            <Text style = {contactStyles.bugReport_tourRequestText}>Report Bug</Text>
          </TouchableOpacity>
          <Hyperlink
            linkify={linkify}
            linkDefault={true}
            linkStyle={{ color: "grey" }}
            linkText={this.textForLink}
          >
            <Text style={contactStyles.textRight}>
              96 Lafayette St
              {"\n"}
              Salem, MA 01970
              {"\n"}
              Tel: tel://9787458071
              {"\n"}
              Fax: fax://9787454345
            </Text>
          </Hyperlink>

          <View style={contactStyles.socialStyle}>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.facebook.com/puntourbanartmuseum/"
                ).catch(err => console.error("An error occurred", err))
              }
            >
              <Image
                style={contactStyles.iconStyle}
                source={require("./assets/images/facebook.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL(
                  "https://www.instagram.com/urban.art.museum"
                ).catch(err => console.error("An error occurred", err))
              }
            >
              <Image
                style={contactStyles.iconStyle}
                source={require("./assets/images/instagram.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() =>
                  Linking.openURL("https://www.twitter.com/NorthShoreCDC").catch(
                    err => console.error("An error occurred", err)
                  )
              }
            >
              <Image
                style={contactStyles.iconStyle}
                source={require("./assets/images/twitter.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity 
              onPress={() => {
                Clipboard.setString('info@northshorecdc.org')
                Alert.alert(
                  'Email Copied',
                  email,
                  [{text: 'OK', onPress: () => console.log('OK Pressed')}]) 
              }}
            >
              <Image 
                style={contactStyles.iconStyle}  
                source={require('./assets/images/email.png')}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

contactStyles = {};
if (Platform.OS === "ios") {
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
      justifyContent: "flex-start",
      alignItems: "flex-end",
      paddingRight: "4%",
      // paddingTop: '40%',
      marginTop: "auto",
      paddingBottom: isIphoneX() ? "12%" : "4%"
    },
    textRight: {
      fontSize: 20,
      color: "grey",
      textAlign: "right"
    },
    socialStyle: {
      flexDirection: "row"
    },
    iconStyle: {
      height: 30,
      width: 30,
      margin: 10
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
      marginTop: isIphoneX() ? "-30%" : "-11%",
      borderRadius: 100,
      shadowColor: "black",
      shadowOffset: { width: 3, height: 4 },
      shadowRadius: 3,
      shadowOpacity: 0.7
    },
    bugReport_tourRequestText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: pink,
    },
    bugReport_tourRequestImage: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 120,
      paddingLeft: 25,
      paddingRight: 25,
      height: 40,
      marginBottom: '3%',
      borderRadius: 100,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {width: 1, height: 1, },
      shadowOpacity: 0.6,
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
    textContainerLeft: {
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-start",
      paddingLeft: "4%",
      paddingTop: "10%",
      marginBottom: "auto"
    },
    textLeft: {
      fontSize: 20,
      color: "black"
    },
    textContainerRight: {
      backgroundColor: "transparent",
      display: "flex",
      justifyContent: "flex-start",
      alignItems: "flex-end",
      paddingRight: "4%",
      // paddingTop: '40%',
      marginTop: "auto",
      paddingBottom: "4%"
    },
    textRight: {
      fontSize: 20,
      color: "grey",
      textAlign: "right"
    },
    socialStyle: {
      flexDirection: "row"
    },
    iconStyle: {
      height: 30,
      width: 30,
      margin: 10
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
    bugReport_tourRequestText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: pink,
    },
    bugReport_tourRequestImage: {
      alignItems: 'center',
      justifyContent: 'center',
      minWidth: 130,
      height: 40,
      paddingLeft: 20,
      paddingRight: 20,
      marginBottom: '3%',
      marginRight: '-2%',
      borderRadius: 100,
      backgroundColor: 'white',
      shadowColor: 'black',
      shadowOffset: {width: 3, height: 4, },
      shadowOpacity: 0.5,
      elevation: 4,
    },
  });
}
