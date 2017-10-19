
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import MapView from 'react-native-maps';


export default class ExplorePage extends React.Component {
    render() {
        
        const { navigate } = this.props.navigation;
        
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
                  pinColor = 'pink'
                  onPress = { () => { navigate('MuralInfoPage') } }
                />
                <MapView.Marker
                    coordinate= {{latitude: 38, longitude: -122}}
                    pinColor = 'green'
                    onPress = { () => { navigate('MuralInfoPage') } }
                  />
                  </MapView>
            </View>
        )
    }
}



