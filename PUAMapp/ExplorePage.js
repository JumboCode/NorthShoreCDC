
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';
import MapView from 'react-native-maps';


export default class ExplorePage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
        } 
    }
    renderImages() {
        const { navigate } = this.props.navigation;
        murals = this.props.screenProps.murals || {}
        return Object.keys(murals).map((key,i) =>{
            lat = parseFloat(murals[key]["Lat"]);
            long = parseFloat(murals[key]["Long"]);

            return(
              <MapView.Marker
                  key={i}
                  coordinate= {{latitude: lat, longitude: long}}
                  pinColor = 'pink'
                  onPress = { () => { navigate('MuralInfoPage') }}
              />
                
            );
        })
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
              {this.renderImages()}
                
            </MapView>
            </View>
        )
    }
}



