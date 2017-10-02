import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import MapView from 'react-native-maps';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Open up App.js to start working on your app!</Text>
        <Text>Changes you make will automatically reload.</Text>
        <Text>Shake your phone to open the developer menu.</Text>
        <Image style = {{ height: 100, width: 100 }} source = {{url: "http://www.asseenontvvideo.com/wp-content/uploads/2013/10/BillyMays-trimmed1.jpg"}} />
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
