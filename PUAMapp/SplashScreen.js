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
  
    render () {
        

        return (
            <View style={{flex:1}}>

                <Image style={{flex:1, resizeMode: 'cover', position: 'absolute', height: '100%', width: '100%'}} source={require('./splashscreen.png')} />
            </View>
        )
    }
}













