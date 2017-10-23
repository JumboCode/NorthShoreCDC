
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
              region = {{
                latitude: 42.5,
                longitude: -70.9,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}>
                <MapView.Marker
                  coordinate= {{latitude: 42.5, longitude: -70.9}}
                  pinColor = 'pink'
                  onPress = { () => { navigate('MuralInfoPage') } }
                />
                <MapView.Marker
                    coordinate= {{latitude: 42.5, longitude: -70.88}}
                    pinColor = 'green'
                    onPress = { () => { navigate('MuralInfoPage') } }
                  />
                  </MapView>
            </View>
        )
    }
}



