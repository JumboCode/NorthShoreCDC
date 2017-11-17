
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, TouchableHighlight, Dimensions} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { lightpurple, darkpurple, pink } from './colors.js';



export default class GalleryPage extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
          featuredArtistImage :"https://www.creativesalem.com/wp-content/uploads/2017/08/Mary-Jane-Lee-Park-Salem-MA-2293.jpg"
        }
    }

    static navigationOptions = ({ navigation }) => ({
    headerLeft:   
    <TouchableHighlight onPress={() => navigation.dispatch(NavigationActions.back())} >
    <Image 
    style= {{height: 50, width: 50, position: 'absolute',zIndex: 100, top: 0, left: 0, right: 0}}
    source={require('./backbutton.png')} /> 
    </TouchableHighlight>,
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomColor: 'transparent' }
    });

 	renderImages() {
    
    var {width} = Dimensions.get('window');
    width = width / 3 - 2
    
		const { navigate } = this.props.navigation;
        murals = this.props.screenProps.murals || {}
        artists = this.props.screenProps.artists || {}
        return Object.keys(murals).map((key,i) =>{
            uri = murals[key]["Photo"]
              return(
				<TouchableOpacity key={i} onPress = {() => navigate('MuralInfoPage', {mural: murals[key], artist: artists[murals[key]["Artist"]]})}>
                  <Image key={i} style={{height: width, width: width, margin: 1}} source={{uri: uri}} />
				</TouchableOpacity>
              );
        })
  }

    render() {
        
        var {height, width} = Dimensions.get('window');
         height = height / 3.5
        return (
          <ScrollView>
            <View>
              <Image style={{height: height,  alignSelf: 'stretch'}} source={{uri: this.state.featuredArtistImage}} />
              <View style={{backgroundColor: 'rgba(0,0,0,.4)', height: height, position : 'absolute', width: width }} >
               <Text style={{ color: 'white', fontSize: 30 / 190 * height, marginTop: 100 / 190 * height, marginLeft: 15}}> Featured Artist </Text>
               <Text style={{ color: 'white', fontSize: 20 / 190 * height, marginTop: 0 / 190 * height, marginLeft: 20}}> Artist Name </Text>
              </View>
            </View>
            <View style={{flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 0}}>
               {this.renderImages()}
            </View>
            </ScrollView>

        )
    }
}
