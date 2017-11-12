import React, { Component } from 'react';
import { View, Text, Image } from 'react-native';

export default class SpalshScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        const { navigate } = this.props.navigation;
        setTimeout(() => {
            navigate("HomePage");
        }, 3000);
    }

    render () {
        return (
            <View style={{flex:1}}>
                <Image style={{flex:1, resizeMode: 'cover', position: 'absolute', height: '100%', width: '100%'}} source={require('./splashscreen.png')} />
            </View>
        )
    }
}