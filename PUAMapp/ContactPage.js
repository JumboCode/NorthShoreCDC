
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, Linking, StatusBar, Platform } from 'react-native';
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
  "https://www.facebook.com/NorthShoreCDC/": "Facebook: @NorthShoreCDC",
  "https://www.twitter.com/NorthShoreCDC": "Twitter: @NorthShoreCDC",
  "https://www.instagram.com/NorthShoreCDC": "Instagram: @NorthShoreCDC",
  "mailto:info@northshorecdc.org": "info@northshorecdc.org",
  "https://www.paypal.com/donate/?token=RloObfAoYt72YGoA5wngQTe-aqBKDjN6Ud9Rlew1IBoH9vuf4l0AFdWZDAbyf0wsCToKOm&country.x=US&locale.x=US": "Donate"
}


export default class ContactPage extends React.Component {
    static navigationOptions = ({ navigation }) => (Platform.OS === 'ios' ? {
    headerLeft:   
    <TouchableOpacity style = {{top: 50, left: 15, padding: 50}} onPress={() => navigation.dispatch(NavigationActions.back())} >
    <Image 
    style= {{position: 'absolute', zIndex: 100, maxWidth: 120, maxHeight: 40}}
    source={require('./backbutton.png')} /> 
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
              <Image style = {styles.image} source = {require('./contact_background.png')} />
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
                <TouchableOpacity onPress={() => Linking.openURL("https://www.paypal.com/donate/?token=Erl0zI5p3A7McUyM5Ojn8YosROX695c4wRuRBurTsgEVppiFyvdv18jaKdw_O4jTdi-AU0&country.x=US&locale.x=US").catch(err => console.error('An error occurred', err))}>
                  <Image style={{ height: 50, resizeMode: 'contain', marginLeft: 0, marginTop: 20 }} source = {require('./donate.png')}>
                    <Text style = {{ color: "white", fontSize: 25, paddingTop: 8, paddingLeft: 58}}> Donate </Text>
                  </Image>
                </TouchableOpacity>
              </View>
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
                
                <View style={{flexDirection: 'row'}}>
                  <TouchableOpacity onPress={() => Linking.openURL("https://www.facebook.com/NorthShoreCDC/").catch(err => console.error('An error occurred', err))}> 
                    <Image style={{height: 30, width: 30, margin: 10}} source = {require('./facebook.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/NorthShoreCDC").catch(err => console.error('An error occurred', err))}> 
                    <Image style={{height: 30, width: 30, margin: 10}} source = {require('./instagram.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("https://www.twitter.com/NorthShoreCDC").catch(err => console.error('An error occurred', err))}> 
                    <Image style={{height: 30, width: 30, margin: 10}} source = {require('./twitter.png')}/>
                  </TouchableOpacity>
                  <TouchableOpacity> 
                    <Image style={{height: 30, width: 30, margin: 10}} source = {require('./email.png')}/>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
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
    
  }
});


