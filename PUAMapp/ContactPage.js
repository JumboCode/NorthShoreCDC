
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';

import Hyperlink from 'react-native-hyperlink'
import LinkifyIt from 'linkify-it'

linkify = new LinkifyIt().add('tel:', 'http:').add('fax:', 'http:')


links = {
  "http://northshorecdc.org/about-us/contact-us/": "Our website",
  "tel://9787458071": "Tel: (978)745-8071",
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
              <Image style = {styles.image} source = {{uri: "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg"}} />
              <View style = {styles.textContainer}>
              <Hyperlink linkify = {linkify} linkDefault={ true } linkStyle={ { color: '#0f53c1', fontWeight: "bold" }} linkText = {this.textForLink} >
              <Text style = {styles.text}>
                A project of the North Shore Community Development Coalition.
                
                http://northshorecdc.org/
                {"\n"}
                {"\n"}
              
                96 Lafayette Street
                {"\n"}
                Salem, MA 01970
                {"\n"}
                tel://9787458071 
                {"\n"}
                Fax: (978)745-4345
                {"\n"}
                {"\n"}
              
                Email: mailto:info@northshorecdc.org
                
                
                {"\n"}
                {"\n"}
                https://www.facebook.com/NorthShoreCDC/ 
                {"\n"}
                https://www.twitter.com/NorthShoreCDC
                {"\n"}
                https://www.instagram.com/NorthShoreCDC
                {"\n"}
                {"\n"}
                
              
                Donate Link
              
                See http://northshorecdc.org/about-us/contact-us/
                
                Lo quality
                
                </Text>
                </Hyperlink>
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
  textContainer: {
    height: '100%',
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, .5)',
    display: 'flex',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20
  },
  text: {
    fontSize: 18,
    color: 'black'
  }

});


