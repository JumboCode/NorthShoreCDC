
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} from 'react-native';
import { lightpurple, darkpurple, pink } from './colors.js';


export default class HomePage extends React.Component {
    static navigationOptions = {
      title: 'Punto Urban Art Museum',
      headerTintColor: 'white',
      headerStyle: {backgroundColor: pink},
    };
    render() {
        const { navigate } = this.props.navigation;
        // TODO: replace the background image (it's the wrong proportions)
        return (
            <View style = {styles.container}>
              <Image style = {styles.image} source = {{uri: "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg"}} />
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
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  image: {
    flex: 1,
    position: 'absolute',
    resizeMode: 'cover',
    height: '100%',
    width: '100%'
  },
  darkPurpleButton: {
    height: '15%',
    backgroundColor: darkpurple,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .9,
    margin: -1
  },
  lightPurpleButton: {
    height: '15%',
    backgroundColor: lightpurple,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    opacity: .9,
    margin: -1
  },
  pinkButton: {
    height: '15%',
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
});
