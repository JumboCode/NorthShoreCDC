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
  getMurals
} from './redux';

import { Provider } from 'react-redux';
import { store } from './redux';

class AppInner extends React.Component {
  
  constructor(props) {
    super(props)
    props.getMurals()
  }
  
  render() {
    
    return (
      <View>
        <GalleryPage murals={this.props.murals ? this.props.murals : []} getMurals={() => this.props.getMurals()}/>

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
    murals: state.muralData.murals,
    loading: state.muralData.loading
});

const mapDispatchToProps = (dispatch) => {
  return {
    getMurals : () => {
      dispatch(getMurals())
    }
  }
};

const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
  )(AppInner);


// const App = StackNavigator({
//   HomePage: {screen: HomePage},
//   ExplorePage: {screen: ExplorePage},
//   GalleryPage: {screen: GalleryPage},
//   ContactPage: {screen: ContactPage},
//   MuralInfoPage: {screen: MuralInfoPage}
// });

// export default App;


