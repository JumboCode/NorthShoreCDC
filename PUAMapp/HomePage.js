import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, Platform} from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';
import Dimensions from 'Dimensions';
import homepic from './assets/images/home-background.jpg'

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
          <Image style = {styles.image} source = {homepic} />
          <TouchableOpacity
            activeOpacity = {0.75}
            style = {styles.darkPurpleButton}
            onPress={() =>
            navigate('ExplorePage')
          }>
            <Text style = {styles.buttonText}>EXPLORE</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity = {0.75}
            style = {styles.lightPurpleButton}
            onPress={() =>
            navigate('GalleryPage')
          }>
            <Text style = {styles.buttonText}>GALLERY</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity = {0.75}
            style = {styles.pinkButton}
            onPress={() =>
            navigate('ContactPage')
          }>
            <Text style = {styles.buttonText}>CONTACT</Text>
          </TouchableOpacity>
        </View>
      )
    }
  }

  const styles = StyleSheet.create({
    container: {
      marginTop: Platform.OS === 'ios' ? '0%' : '-8%',
      flex: 1,
      display: 'flex',
      backgroundColor: '#fff',
      alignItems: 'stretch',
      justifyContent: 'flex-end',
    },
    titleContainer: {
      // marginTop: '4%',
      // marginRight: '3%',
      flex: 1,
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      backgroundColor: 'rgba(0,0,0,.4)',
      




      // style={{, , ,  }} 
    },
    innerTitleContainer:{
      marginTop: '13.5%',
      paddingBottom: '0%',

    },
    titleText: {
      fontSize: FONT_SIZE,
      color: 'white',
      backgroundColor: 'transparent',
    },
    image: {
      resizeMode: 'cover',
      position: 'absolute',
      height: '100%',
      width: '100%',
    },
    darkPurpleButton: {
      height: '13%',
      backgroundColor: darkpurple,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9,
      margin: -1
    },
    lightPurpleButton: {
      height: '13%',
      backgroundColor: lightpurple,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9,
      margin: -1
    },
    pinkButton: {
      height: '13%',
      backgroundColor: pink,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      opacity: .9,
      margin: -1
    },
    buttonText: {
      fontSize: 36,
      fontWeight: 'bold',
      color: 'white'
    }
  }
);