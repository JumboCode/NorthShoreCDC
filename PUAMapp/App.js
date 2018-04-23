import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  Button,
  StatusBar,
  Platform
} from "react-native";
import { StackNavigator } from "react-navigation";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import { AppLoading, Asset } from "expo";
import HomePage from "./HomePage";
import GalleryPage from "./GalleryPage";
import ExplorePage from "./ExplorePage";
import ContactPage from "./ContactPage";
import MuralInfoPage from "./MuralInfoPage";
import SplashScreen from "./SplashScreen";
import { lightpurple, darkpurple, pink } from "./colors.js";
import { getMurals, getArtists } from "./redux";
import { Provider } from "react-redux";
import { store } from "./redux";

import Sentry from 'sentry-expo';
import configString from "./sentry";
Sentry.config(configString.publicDSN).install();

class AppInner extends React.Component {
  constructor(props) {
    Text.defaultProps.allowFontScaling = false;
    super(props);
    props.getMurals();
    props.getArtists();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />
        <View
          style={{
            flex: 1,
            backgroundColor: pink
          }}
        >
          <AppNav screenProps={this.props} />
        </View>
      </View>
    );
  }
}

export default class App extends React.Component {
  constructor(props) {
    super(props); 
    this.state = {
      isReady: false,
    };
  }

  render() {
    if (!this.state.isReady) {
      return (
        <AppLoading
          startAsync={this._cacheResourcesAsync}
          onFinish={() => this.setState({ isReady: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <Provider store={store}>
        <AppContainer />
      </Provider>
    );
  }
  async _cacheResourcesAsync() {
    const images = [
      require('./assets/images/gallery-header-new.jpg'),
      require('./assets/images/splash-background.png'),
      require('./assets/images/home-logo.png'),
      require('./assets/images/home-background.jpg'),
      require('./assets/images/gallery_top_image.jpg'),
      require('./assets/images/contact_background.jpg'),
    ];

    const cacheImages = images.map((image) => {
      return Asset.fromModule(image).downloadAsync();
    });
    return Promise.all(cacheImages)

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});

const mapStateToProps = state => ({
  murals: state.firebaseData.murals,
  muralsloading: state.firebaseData.muralsloading,
  muralsloaded: state.firebaseData.muralsloading,
  artistsloading: state.firebaseData.artistsloading,
  artistsloaded: state.firebaseData.artistsloading,
  artists: state.firebaseData.artists
});

const mapDispatchToProps = dispatch => {
  return {
    getMurals: () => {
      dispatch(getMurals());
    },
    getArtists: () => {
      dispatch(getArtists());
    }
  };
};

const AppNav = StackNavigator({
  SplashScreen: { screen: SplashScreen },
  HomePage: { screen: HomePage, navigationOptions: { gesturesEnabled: false } },
  ExplorePage: { screen: ExplorePage },
  GalleryPage: { screen: GalleryPage },
  ContactPage: { screen: ContactPage },
  MuralInfoPage: { screen: MuralInfoPage }
});

const AppContainer = connect(mapStateToProps, mapDispatchToProps)(AppInner);

// export default App;
