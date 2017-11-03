
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import MapView from 'react-native-maps';


export default class ExplorePage extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        markers: [{
          key: 1,
          title: 'hello',
          description: 'lol',
          color: 'pink',
          coordinates: {
            latitude: 42.5,
            longitude: -70.9
          },
        },
        {
          key: 2,
          title: 'hi',
          description: "Im dead",
          color: 'green',
          coordinates: {
            latitude: 42.5,
            longitude: -70.88
          },
        }]
      }
    }

    render() {

        const { navigate } = this.props.navigation;

        return (
            <View style = {{flex: 1}}>
            <MapView
              style = {{flex: 1 }}
              region = {{
                latitude: 42.5,
                longitude: -70.9,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
              {this.state.markers.map(marker => (
                <MapView.Marker
                  key = {marker.key}
                  coordinate = {marker.coordinates}
                  pinColor = {marker.color}
                  title = {marker.title}
                  description = {marker.description}
                  onCalloutPress={() => navigate('MuralInfoPage')}
                />
              ))}
                  </MapView>
            </View>
        )
    }
}
