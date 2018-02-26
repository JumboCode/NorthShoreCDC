import React, { Component } from 'react';
import { View, Text, Image, ActivityIndicator, AppRegistry, StyleSheet, Platform } from 'react-native';

export default class SpalshScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUpdate() {
        const { navigate } = this.props.navigation;
         if ((this.props.screenProps.muralsloaded  == true) && (this.props.screenProps.artistsloaded == true)) {
            navigate("HomePage");
         }

     }

    static navigationOptions = {
      header: null
    };

    render () {


        return (
            <View style={{flex:1}}>
                <Image style={{flex:1, resizeMode: 'cover', position: 'absolute', height: '100%', width: '100%'}} source={require('./assets/images/splash-background.jpg')} />
                <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="gray" />
                </View>
            </View>
        )
    }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 100,
    marginTop: '80%',
  }
})
