
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, Linking } from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';

import Hyperlink from 'react-native-hyperlink'
import LinkifyIt from 'linkify-it'

linkify = new LinkifyIt().add('tel:', 'http:').add('fax:', 'http:')


links = {
  "http://northshorecdc.org/about-us/contact-us/": "Our website",
  "tel://9787458071": "(978)745-8071",
  "fax://9787454345": "(978)745-4345",
  "http://northshorecdc.org/": "NSCDC Website",
  "https://www.facebook.com/NorthShoreCDC/": "Facebook: @NorthShoreCDC",
  "https://www.twitter.com/NorthShoreCDC": "Twitter: @NorthShoreCDC",
  "https://www.instagram.com/NorthShoreCDC": "Instagram: @NorthShoreCDC",
  "mailto:info@northshorecdc.org": "info@northshorecdc.org"
}


export default class ContactPage extends React.Component {
    static navigationOptions = {
      title: 'Contact',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: pink},
    };
    
    textForLink(text) {
      return links[text] || text
    }
    
    render() {
        return (
            <View style = {styles.container}>
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
              </View>
              <View style = {styles.textContainerRight}>
                <Hyperlink linkify = {linkify} linkDefault={ true } linkStyle={ { color: '#0f53c1', fontWeight: "bold" }} linkText = {this.textForLink} >
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
                    <Image style={{height: 40, width: 40}} source = {require('./200.gif')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("https://www.twitter.com/NorthShoreCDC").catch(err => console.error('An error occurred', err))}> 
                    <Image style={{height: 40, width: 40}} source = {require('./200.gif')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("https://www.instagram.com/NorthShoreCDC").catch(err => console.error('An error occurred', err))}> 
                    <Image style={{height: 40, width: 40}} source = {require('./200.gif')}/>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => Linking.openURL("mailto:info@northshorecdc.org").catch(err => console.error('An error occurred', err))}> 
                    <Image style={{height: 40, width: 40}} source = {require('./200.gif')}/>
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
    alignItems: 'center',
    paddingRight: 100,
    paddingTop: 60
  },
  textLeft: {
    fontSize: 25,
    color: 'black'
  },
  textContainerRight: {
    backgroundColor: "transparent",
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingLeft: 100,
    paddingTop: 250
  },
  textRight: {
    fontSize: 23,
    color: 'grey',
    textAlign: 'right'
  }
});


