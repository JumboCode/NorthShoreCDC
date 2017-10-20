import React from 'react';
import {StyleSheet, Text, View, Image} from 'react-native';
import Dimensions from 'Dimensions';
import Accordion from 'react-native-collapsible/Accordion';

const SECTIONS = [
  {
    title: 'Information',
    content: 'Yo',
  },
  {
    title: 'Administrative',
    content: 'Sup',
  },
  {
    title: 'Social Media',
    content: 'bruh',
  }
];

export default class ContactPage extends React.Component {
     _renderHeader(section) {
      return (
        <View style={styles.header}>
            <Text style={styles.buttonText}>{section.title}</Text>
        </View>
      );
    }
    _renderContent(section) {
      return (
        <View style={styles.content}>
          <Text>{section.content}</Text>
        </View>
      );
    }
    render() {
        return (
          <View style={styles.container}>
            <Image
            source={{uri: 'https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg'}}
            style={{flex: 1, resizeMode: 'cover',}}
            />
            <Accordion
              sections={SECTIONS}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
            />
          </View>
        )
    }
}

var width = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'flex-end',
  },
  header: {
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


