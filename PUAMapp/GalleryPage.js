import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button, TouchableOpacity, Dimensions, Platform} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { lightpurple, darkpurple, pink } from './colors.js';
import Img from 'react-native-image-progress';
import Progress from 'react-native-progress';



export default class GalleryPage extends React.Component {

    constructor(props) {
        super(props)
    }

    static navigationOptions = ({ navigation }) => (Platform.OS === 'ios' ? {
    headerLeft:   
    <TouchableOpacity style = {{top: 30, left: -25, padding: 40}} onPress={() => navigation.dispatch(NavigationActions.back())} >
    <Image 

    style= {{position: 'relative', zIndex: 100, maxWidth: 120, maxHeight: 40}}
    source={require('./assets/images/backbutton.png')} /> 
    </TouchableOpacity>,
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomColor: 'transparent' }
    } : {title: 'Punto Urban Art', headerTintColor: 'white', headerStyle: {backgroundColor: pink},});

 	renderImages() {
    
    var {width} = Dimensions.get('window');
    width = width / 3 - 1
    
		const { navigate } = this.props.navigation;
        murals = this.props.screenProps.murals || {}
        artists = this.props.screenProps.artists || {}
        return Object.keys(murals).map((key,i) =>{
            uri = murals[key]["Photo"]
              return(
				<TouchableOpacity key={i} onPress = {() => this.props.navigation.navigate({key: 'Screen', routeName: 'MuralInfoPage', params: {mural: murals[key], artist: artists[murals[key]["Artist"]]}})}>
                  <Img 
                  key={i} 
                  style={{height: width, width: width, margin: 1}} 
                  source={{uri: uri}} 
                  indicator={Progress}
                   />
				</TouchableOpacity>
              );
        })
  }

    render() {
        
        var {height, width} = Dimensions.get('window');
        height = height / 3

        return (
          <ScrollView>
            <View>
              <Image
                style={{alignSelf: 'center', position: 'relative', height: height + 40, width: width, resizeMode: 'cover'}} 
                source = {Platform.OS === 'ios' ? require('./assets/images/gallery-header-new.jpeg') : require('./assets/images/gallery_top_image.jpg')}
              />
              <View style={{backgroundColor: Platform.OS === 'ios'? 'rgba(0,0,0,.0)' : 'rgba(0,0,0,.5)', height: height + 40, position : 'absolute', width: width, justifyContent: 'center', alignItems: 'center' }} >
               <Text style={{ color: 'white', fontSize: 40 / 300 * width, fontWeight: 'bold', marginTop: Platform.OS === 'ios' ? 100 : 0}}>GALLERY</Text>
              </View>
            </View>
            <View style={{alignSelf: 'center', alignItems: 'center', flex: 1, flexDirection: 'row', flexWrap: 'wrap', margin: -1, marginLeft: -2, marginTop: 1}}>
               {this.renderImages()}
            </View>
            </ScrollView>

        )
    }
}
