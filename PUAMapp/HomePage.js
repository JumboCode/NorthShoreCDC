import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight, Platform} from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';
import Dimensions from 'Dimensions';
import logo from './puntologo.png'

const x = Dimensions.get('window').width;
const y = Dimensions.get('window').height;

var FONT_SIZE = y * 0.10;

export default class HomePage extends React.Component {

  static navigationOptions = {
  header:null,
  };

  render() {
    const { navigate } = this.props.navigation;
      return (
        <View style = {styles.container}>
          <Image style = {styles.logo} source = {logo} />
          <TouchableHighlight
            style = {styles.darkPurpleButton}
            onPress={() =>
            navigate('ExplorePage')
          }>
            <Text style = {styles.buttonText}>EXPLORE</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style = {styles.lightPurpleButton}
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
      marginTop: Platform.OS === 'ios' ? '0%' : '-8%',
      flex: 1,
      display: 'flex',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
      backgroundColor: pink,
    },
    logo: {
      justifyContent: 'center',
      alignItems: 'center',
      resizeMode: 'contain',
      margin: "10%",
      marginTop: "30%",
      flex: 1,
      height: "80%",
      width: "80%",
    },
    darkPurpleButton: {
      height: '14%',
      backgroundColor: pink,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9,
      margin: -1
    },
    lightPurpleButton: {
      height: '14%',
      backgroundColor: pink,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9,
      margin: -1
    },
    pinkButton: {
      height: '14%',
      backgroundColor: pink,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9,
      margin: -1
    },
    buttonText: {
      fontSize: 36,
      color: 'white'
    }
  }
);
