import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} from 'react-native';
import Dimensions from 'Dimensions';
import Accordion from 'react-native-collapsible/Accordion';

export default class ContactPage extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View style = {styles.container}>
            <TouchableHighlight
              style = {styles.buttonLink}
              onPress={() =>
              navigate('InfoPage')
            }>
              <Text style = {styles.buttonText}>Information</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style = {styles.buttonLink}
              onPress={() =>
              navigate('GalleryPage')
            }>
              <Text style = {styles.buttonText}>Administrative</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style = {styles.buttonLink}
              onPress={() =>
              navigate('ContactPage')
            }>
              <Text style = {styles.buttonText}>Social Media</Text>
            </TouchableHighlight>
            </View>
        )
    }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  buttonLink: {
    height: width / 4,
    backgroundColor: 'deepskyblue',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
  },
  buttonText: {
    fontSize: 40,
    color: 'white'
  }
});




