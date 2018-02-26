
import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, ScrollView, Button, TouchableOpacity, Linking, StatusBar, Platform } from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';
import { NavigationActions } from 'react-navigation'
import Hyperlink from 'react-native-hyperlink'
import LinkifyIt from 'linkify-it'

linkify = new LinkifyIt().add('tel:', 'http:').add('fax:', 'http:')


links = {
  "http://northshorecdc.org/about-us/contact-us/": "Our website",
  "tel://9787458071": "978-745-8071",
  "fax://9787454345": "978-745-4345",
  "http://northshorecdc.org/": "NSCDC Website",


  "https://www.facebook.com/puntourbanartmuseum/": "Facebook: @puntourbanartmuseum",
  "https://www.twitter.com/NorthShoreCDC": "Twitter: @NorthShoreCDC",
  "https://www.instagram.com/urban.art.museum": "Instagram: @urban.art.museum",
  "mailto:info@northshorecdc.org": "info@northshorecdc.org",
  "http://northshorecdc.org/support-us/donate/": "Donate"
}


export default class ContactPage extends React.Component {
    static navigationOptions = ({ navigation }) => (Platform.OS === 'ios' ? {
    headerLeft:
    <TouchableOpacity style = {{top: 30, left: -25, padding: 40}} onPress={() => navigation.dispatch(NavigationActions.back())} >
    <Image
    style= {{position: 'relative', zIndex: 100, maxWidth: 120, maxHeight: 40}}
    source={require('./assets/images/backbutton.png')} />
    </TouchableOpacity>,
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomColor: 'transparent' }
    } : {title: 'Punto Urban Art', headerTintColor: 'white', headerStyle: {backgroundColor: pink},});

    textForLink(text) {
      return links[text] || text
    }

    render() {
        return (
            <View style = {styles.container}>
            <StatusBar barStyle = { Platform.OS === 'ios' ? "dark-content" : "light-content"}/>
              <Image style = {styles.image} source = {require('./assets/images/contact_background.jpg')} />
              <View style = {styles.textContainerLeft}>
                <Text style = {styles.textLeft}>
                  A project of the North
                  {"\n"}
                  Shore Community
                  {"\n"}
                  Development
                  {"\n"}
                  Coalition
                </Text>
              </View>
                <TouchableOpacity style= {styles.donateImage} onPress={() => Linking.openURL("https://www.paypal.com/cgi-bin/webscr?cmd=_s-xclick&hosted_button_id=UF8MF7Q9E7HSA").catch(err => console.error('An error occurred', err))}>
                    <Text style = {styles.donateText}> Donate </Text>
                </TouchableOpacity>
              <View style = {styles.textContainerRight}>
                <Hyperlink linkify = {linkify} linkDefault={ true } linkStyle={ { color: 'grey' }} linkText = {this.textForLink} >
                  <Text style = {styles.textRight}>
                    96 Lafayette St
                    {"\n"}
                    Salem, MA 01970
                    {"\n"}
                    Tel:
                    tel://9787458071
                    {"\n"}
                    Fax:
                    fax://9787454345
                  </Text>
                </Hyperlink>

                <View style={styles.socialStyle}>
                  <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/puntourbanartmuseum/").catch(err => console.error('An error occurred', err))}>
                    <Image style={styles.iconStyle} source = {require('./assets/images/facebook.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/urban.art.museum").catch(err => console.error('An error occurred', err))}>
                    <Image style={styles.iconStyle}  source = {require('./assets/images/instagram.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("https://www.twitter.com/NorthShoreCDC").catch(err => console.error('An error occurred', err))}>
                    <Image style={styles.iconStyle}  source = {require('./assets/images/twitter.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("https://goo.gl/forms/9QnLoyStB3UOLewz1").catch(err => console.error('An error occurred', err))}>
                    <Image style={styles.iconStyle}  source = {require('./assets/images/email.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        )
    }
}
styles = {}

if (Platform.OS === 'ios') {

  styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    height: '100%',
    width: '100%'
  },
  textContainerLeft: {
    backgroundColor: "transparent",
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: '4%',
    paddingTop: '30%',
    marginBottom: 'auto',
  },
  textLeft: {
    fontSize: 20,
    color: 'black'
  },
  textContainerRight: {
    backgroundColor: "transparent",
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: '4%',
    // paddingTop: '40%',
   marginTop: 'auto',
   paddingBottom: '4%',

  },
  textRight: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'right',

  },
  socialStyle: {
    flexDirection: 'row'

  },
  iconStyle: {
    height: 30,
    width: 30,
    margin: 10

  },
  donateText: {
    fontSize: 25,
    paddingTop: '2%',
    color: 'white',
  },
  donateImage: {
    alignItems: 'center',
    paddingLeft: 5,
    padding: 2,
    paddingBottom: 5,
    backgroundColor: pink,
    width: 150,
    marginLeft: "7%",
    marginTop: "-40%",
    borderRadius: 20,
    shadowColor: 'black',
    shadowOffset: {width: 3, height: 4, },
    shadowOpacity: 0.5,
  },
});}
else  {
  styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    height: '100%',
    width: '100%'
  },
  textContainerLeft: {
    backgroundColor: "transparent",
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingLeft: '4%',
    paddingTop: '8%',
    marginBottom: 'auto',
  },
  textLeft: {
    fontSize: 20,
    color: 'black'
  },
  textContainerRight: {
    backgroundColor: "transparent",
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    paddingRight: '4%',
    // paddingTop: '40%',
   marginTop: 'auto',
   paddingBottom: '4%',

  },
  textRight: {
    fontSize: 20,
    color: 'grey',
    textAlign: 'right',

  },
  socialStyle: {
    flexDirection: 'row'

  },
  iconStyle: {
    height: 30,
    width: 30,
    margin: 10

  },
  donateText: {
    backgroundColor: 'transparent',
    color: "white",
    fontSize: 25,
  },
  donateImage: {
    alignItems: 'center',
    backgroundColor: pink,
    padding: 3,
    paddingLeft: 5,
    width: 150,
    marginLeft: "7%",
    marginRight: "auto",
    marginTop: "-15%",
    borderRadius: 20,
    elevation: 12
  },
});

}
