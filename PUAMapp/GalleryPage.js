import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';


export default class GalleryPage extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            featuredArtistImage :"https://www.creativesalem.com/wp-content/uploads/2017/08/Mary-Jane-Lee-Park-Salem-MA-2293.jpg"
        } 
    }
    
    renderImages() {
        murals = this.props.screenProps.murals || {}
        return Object.keys(murals).map((key,i) =>{
            uri = murals[key]["Photo"]
            return (<Image key={i} style={{height: 100, width: 100, margin: 10}} source={{uri: uri}} />);
        })
    }

    render() {
        return (
            <ScrollView>
            <View>
                <Image style={{height: 190,  alignSelf: 'stretch'}} source={{uri: this.state.featuredArtistImage}}/>
                <View style={{backgroundColor: 'rgba(0,0,0,.4)', height: 190, position : 'absolute', width: 380 }} >
                    <Text style={{ color: 'white', fontSize: 30, marginTop: 80, marginLeft: 15}}> Featured Artist</Text>
                    <Text style={{ color: 'white', fontSize: 20, marginTop: 0, marginLeft: 20}}> Artist Name </Text>
                </View>
            </View>

            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginLeft: 7}}>
                {this.renderImages()}
            </View>
            </ScrollView>
        )
    }
}



