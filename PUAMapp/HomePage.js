import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';
import homepic from './home.jpg'

export default class HomePage extends React.Component {
  static navigationOptions = {
    title: 'Punto Urban Art',
    headerTintColor: 'white',
    headerStyle: {backgroundColor: pink},
  };

  render() {
    const { navigate } = this.props.navigation;
    // TODO: replace the background image (it's the wrong proportions)
      return (
        <View style = {styles.container}>
          <Image style = {styles.image} source = {homepic} />
          <TouchableHighlight
            style = {styles.blackButton}
            onPress={() =>
            navigate('ExplorePage')
          }>
            <Text style = {styles.buttonText}>EXPLORE</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {styles.greyButton}
            onPress={() =>
            navigate('GalleryPage')
          }>
            <Text style = {styles.buttonText}>GALLERY</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {styles.pinkButton}
            onPress={() =>
            navigate('ContactPage')
          }>
            <Text style = {styles.buttonText}>CONTACT</Text>
          </TouchableHighlight>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      display: 'flex',
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    },
    image: {
      resizeMode: 'cover',
      position: 'absolute',
      height: '100%',
      width: '100%'
    },
    blackButton: {
      height: '15%',
      backgroundColor: 'black',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9
    },
    greyButton: {
      height: '15%',
      backgroundColor: 'grey',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9
    },
    pinkButton: {
      height: '15%',
      backgroundColor: pink,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9
    },
    buttonText: {
      fontSize: 36,
      color: 'white'
    }
  }
);