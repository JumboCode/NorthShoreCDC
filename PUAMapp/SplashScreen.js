import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class SpalshScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentWillUpdate() {
        const { navigate } = this.props.navigation;
         if ((this.props.screenProps.muralsloaded  == true) && (this.props.screenProps.artistsloaded == true)) {
            navigate("HomePage");
         } 

     }
  
    static navigationOptions = ({ navigation }) => ({
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomColor: 'transparent' }
    });

    render () {
        

        return (
            <View style={{flex:1}}>

                <Image style={{flex:1, resizeMode: 'cover', position: 'absolute', height: '100%', width: '100%'}} source={require('./images/splash-background.jpg')} />
            </View>
        )
    }
}













