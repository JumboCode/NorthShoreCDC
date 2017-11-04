import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import { connect } from 'react-redux';

import HomePage from './HomePage'
import GalleryPage from './GalleryPage'
import ExplorePage from './ExplorePage'
import ContactPage from './ContactPage'
import MuralInfoPage from './MuralInfoPage'


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
      <AppNav screenProps = {this.props} />
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
  HomePage: {screen: HomePage},
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


