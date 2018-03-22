import React from "react";
import {
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

const paypalUrl =
  "https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UF8MF7Q9E7HSA";
linkify = new LinkifyIt().add("tel:", "http:").add("fax:", "http:");

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
            A project of the North
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
              onPress={() =>
                Linking.openURL("https://goo.gl/forms/9QnLoyStB3UOLewz1").catch(
                  err => console.error("An error occurred", err)
                )
              }
            >
              <Image
                style={contactStyles.iconStyle}
                source={require("./assets/images/email.png")}
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
      paddingTop: "2%",
      fontWeight: "bold",
      color: "white"
    },
    donateImage: {
      alignItems: "center",
      paddingLeft: 5,
      padding: 3,
      paddingBottom: 5,
      backgroundColor: pink,
      width: 160,
      marginLeft: "8%",
      marginTop: isIphoneX() ? "-55%" : "-40%",
      borderRadius: 100,
      shadowColor: "black",
      shadowOffset: { width: 3, height: 4 },
      shadowOpacity: 0.5
    }
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
      backgroundColor: pink,
      padding: 5,
      paddingLeft: 6,
      width: 150,
      marginLeft: "7%",
      marginRight: "auto",
      marginTop: "-20%",
      borderRadius: 100,
      elevation: 12
    }
  });
}
