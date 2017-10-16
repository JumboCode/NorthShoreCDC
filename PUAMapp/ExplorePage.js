
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import MapView from 'react-native-maps';


export default class ExplorePage extends React.Component {
    render() {
        return (
            <View style = {{flex: 1}}>
            <MapView
              style = {{flex: 1 }}
              initialRegion={{
                latitude: 37,
                longitude: -122,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              <MapView.Marker
                  coordinate= {{latitude: 37, longitude: -122}}
                  title= "titleeee"
                  description= "descriptiooooon"
                  pinColor = 'pink'
                />
                <MapView.Marker
                    coordinate= {{latitude: 38, longitude: -122}}
                    title= "titleeee"
                    description= "descriptiooooon"
                    pinColor = 'green'
                  />
              </MapView>
            </View>
        )
    }
}



