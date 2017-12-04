import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, StatusBar, Platform} from 'react-native';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';

import HomePage from './HomePage'
import GalleryPage from './GalleryPage'
import ExplorePage from './ExplorePage'
import ContactPage from './ContactPage'
import MuralInfoPage from './MuralInfoPage'
import SplashScreen from './SplashScreen'
import { lightpurple, darkpurple, pink } from './colors.js';

import {
  getMurals, getArtists
} from './redux';

import { Provider } from 'react-redux';
import { store } from './redux';

class AppInner extends React.Component {
  
  constructor(props) {
    super(props)
    props.getMurals()
    props.getArtists()
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <View style={{flex: 1, 
                      backgroundColor: pink,  
                      paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight}}>
          <AppNav screenProps = {this.props}/> 
        </View>
      </View>
      );
  }
}

export default class App extends React.Component {

  render () {
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>

      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const mapStateToProps = (state) => ({
    murals: state.firebaseData.murals,
    muralsloading: state.firebaseData.muralsloading,
    muralsloaded:state.firebaseData.muralsloading,
    artistsloading: state.firebaseData.artistsloading,
    artistsloaded:state.firebaseData.artistsloading,
    artists: state.firebaseData.artists,

    
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMurals : () => {
      dispatch(getMurals())
    },
    getArtists : () => {
      dispatch(getArtists())
    }
  }
};

const AppNav = StackNavigator({
  SplashScreen: {screen: SplashScreen},
  HomePage: {screen: HomePage, navigationOptions: {gesturesEnabled: false}},
  ExplorePage: {screen: ExplorePage},
  GalleryPage: {screen: GalleryPage},
  ContactPage: {screen: ContactPage},
  MuralInfoPage: {screen: MuralInfoPage, }
});


const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AppInner);



// export default App;


