
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';


export default class ContactPage extends React.Component {
    static navigationOptions = {
      title: 'Contact',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: 'pink'},
    };

    render() {
        return (
            <View style = {styles.container}>
              <Image style = {styles.image} source = {{uri: "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg"}} />
              <View style = {styles.textContainer}>
              <Text style = {styles.text}>
                A project of the North Shore Community Development Coalition.
              
                NSCDC Website
              
                Address: 96 Lafayette Street Salem, MA 01970
              
                Phone & Fax: p: (978) 745-8071 f: (978) 745-4345
              
                Email: info@northshorecdc.org
              
                Twitter, Instagram, Facebook links
              
                Donate Link
              
                See http://northshorecdc.org/about-us/contact-us/
                
                Lo quality
                
                </Text>
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
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50
  },
  text: {
    fontSize: 14 * 1.5,
    color: 'black'
  }

});


