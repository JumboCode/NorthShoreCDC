import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import {StackNavigator} from 'react-navigation';
import MapView from 'react-native-maps';


// TODO turn this into a navigation thingy

class WelcomeScreen extends React.Component {
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <Button
          title="Go to Map"
          onPress={() =>
          navigate('MapScreen')
        }
        />
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Image style = {{ height: 100, width: 100 }} source = {{url: "http://www.asseenontvvideo.com/wp-content/uploads/2013/10/BillyMays-trimmed1.jpg"}} />
      </View>
    );
  }
}

class MapScreen extends React.Component {
    render() {
        return (
            <View style={styles.container}>
                <MapView
                  style = {{ height: 300, width: 300 }}
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />
            </View>
        )
    }
}


const App = StackNavigator({
  Welcome: {screen: WelcomeScreen},
  MapScreen: {screen: MapScreen}
});

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
