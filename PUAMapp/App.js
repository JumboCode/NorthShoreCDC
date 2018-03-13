import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, StatusBar, Platform} from 'react-native';
import { Permissions, Notifications } from 'expo';
import { StackNavigator } from 'react-navigation';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation'

import HomePage from './HomePage'
import GalleryPage from './GalleryPage'
import ExplorePage from './ExplorePage'
import ContactPage from './ContactPage'
import MuralInfoPage from './MuralInfoPage'
import SplashScreen from './SplashScreen'
import { lightpurple, darkpurple, pink } from './colors.js';

import firebase from './redux';

import {
  getMurals, getArtists
} from './redux';

import { Provider } from 'react-redux';
import { store } from './redux';

// Checks and asks for notification permission,
// signs in to Firebase anonymously, writes device notification id
// then immediately signs out the anonymous user
async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Permissions.getAsync(
    Permissions.NOTIFICATIONS
  );
  let finalStatus = existingStatus;

  if (existingStatus !== 'granted') {
    const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
    finalStatus = status;
  }

  if (finalStatus !== 'granted') {
    return;
  }

  let token = await Notifications.getExpoPushTokenAsync();

  // Sign in anonymously
  firebase.auth().signInAnonymously().catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
     console.log('Error code:'+ errorCode);
     console.log('Error message:'+ errorMessage);
  });

  // Set auth listener, write ID to database on successful sign-in, then sign out
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      uniqueID = token.slice(token.indexOf('[') + 1, token.indexOf(']'));
      firebase.database().ref('notificationIds/' + uniqueID).set({
        active: true
      }, () => {
        firebase.auth().signOut();
      });
    } else {
      // Anonymous sign-in unsuccessful
    }
  });
}

class AppInner extends React.Component {
  constructor(props) {
    Text.defaultProps.allowFontScaling = false;
    super(props)
    props.getMurals()
    props.getArtists()
  }

  componentDidMount() {
    registerForPushNotificationsAsync();
  }
  
  render() {
    return (
      <View style={{flex: 1}}>
        <StatusBar barStyle="light-content"/>
        <View style={{flex: 1, 
                      backgroundColor: pink}}>
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


