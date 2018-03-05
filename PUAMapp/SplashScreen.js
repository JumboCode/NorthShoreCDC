import React, { Component } from 'react';
import { StatusBar, Alert, View, Text, Image, ActivityIndicator, AppRegistry, StyleSheet, Platform } from 'react-native';

export default class SpalshScreen extends Component {
    constructor(props) {
      super(props)
      this.state = {
        loaded: false
      };
    }

    componentWillUpdate() {
        const { navigate } = this.props.navigation;
         if ((this.props.screenProps.muralsloaded  == true) && (this.props.screenProps.artistsloaded == true)) {
            this.state.loaded = true;
            navigate("HomePage");
         }

     }

    componentDidMount() {
      // Tell user about slow connection after 10 seconds
      setTimeout(() => {
        if (this.state.loaded == false) {
          Alert.alert(
            'Slow Connection',
            'It looks like you have a very slow or nonexistent network connection. ' + 
            'This app requires the internet to load data.',
            [
              {text: 'OK', onPress: () => console.log('OK Pressed')},
            ],
            { cancelable: true }
          ) 
        }
      }, 10000)
    }

    static navigationOptions = {
      header: null
    };

    render () {


        return (
            <View style={{flex:1, backgroundColor: '#ffffff'}}>
              <Image style={{flex:1, resizeMode: 'contain', position: 'absolute', height: '100%', width: '100%'}} 
                source={require('./assets/images/splash-background.png')} />
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
