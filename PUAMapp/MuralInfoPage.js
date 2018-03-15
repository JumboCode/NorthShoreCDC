
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView,
          Animated, TouchableOpacity, Platform, StatusBar} from 'react-native';
import { NavigationActions } from 'react-navigation'
import { lightpurple, darkpurple, pink } from './colors.js';
import * as Animatable from 'react-native-animatable';

var infoButtons = [
    require('./assets/images/info.png'),
    require('./assets/images/xbutton.png')
];

export default class MuralInfoPage extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
          descriptionVisible: false,
          
          // should be set true after the first time the user clicks to show description
          // this prevents fadeIn/fadeOut animations on intial render
          pastInitialClick: false
      }
    }

    static navigationOptions = ({ navigation }) => ( Platform.OS === 'ios' ? {
    headerLeft:   
    <TouchableOpacity style = {{top: 30, left: -25, padding: 40}} onPress={() => navigation.dispatch(NavigationActions.back())} >
    <Image 
    style= {{position: 'relative', zIndex: 100, maxWidth: 120, maxHeight: 40}}
    source={require('./assets/images/backbutton.png')} /> 

    </TouchableOpacity>,
    headerStyle:{ position: 'absolute', backgroundColor: 'transparent', zIndex: 100, top: 0, left: 0, right: 0, borderBottomColor: 'transparent' }
    } : {title: 'Punto Urban Art', headerTintColor: 'white', headerStyle: {backgroundColor: pink},});

    
    toggleShowDescription() {
        this.setState({
            descriptionVisible: !this.state.descriptionVisible,
            pastInitialClick: true
        })
    }
    
    render() {
        const mural = this.props.navigation.state.params.mural
        const artist = this.props.navigation.state.params.artist

          closeButton = <Image source={infoButtons[1]} style={{width: 30, height: 30}}/>
          readMoreButton = 
                            <TouchableOpacity style = {{paddingLeft: 3, paddingTop: 15, paddingBottom: 50, paddingRight: 70}} onPress = {this.toggleShowDescription.bind(this)}>
                                <Text style = {infoStyles.moreInfoButton}>Read More</Text>
                            </TouchableOpacity>
        

        var description = ""
        if (artist['city']) {
          description += artist['city']
        }

        if (mural['Month'] && mural['Year']) {
          description += '\n\n' + mural['Month'] + ", " + mural['Year']
        }

        if (mural['Medium']) {
          description += '\n' + mural['Medium']
        }

        if (mural['Description'] && mural['Description'].trim().length > 0) {
          description += '\n\n' + mural['Description']
        }

        if (artist['bio'] && artist['bio'].trim().length > 0) {
          description += '\n\n' + artist['bio']
        }
        
        descriptionVisible = this.state.descriptionVisible
        pastInitialClick = this.state.pastInitialClick
        
        return (
              <View style = {infoStyles.container} >
              <StatusBar barStyle = { Platform.OS === 'ios' ? "light-content" : "light-content"}/>
                <Image style={{flex: 1, position: "absolute", resizeMode: 'cover', height: '100%', width: '100%'}} source={{uri: mural.Photo}} />
                <Animatable.View animation = {descriptionVisible ? 'fadeIn' : 'fadeOut' } duration = {500} style = {infoStyles.darkerOverlay} /> 
                <View style = {infoStyles.darkOverlay} /> 
                <View style = {infoStyles.textContainer}>
                  <View style = {infoStyles.top}>
                    <View style = {infoStyles.info}>
                      <View>
                        <Text style = {infoStyles.name}>{mural.Title}</Text>
                      </View>
                      <View>
                        <Text style = {infoStyles.artist}>{artist.name}</Text>
                      </View>
                    </View>
                    <Animatable.View animation = {descriptionVisible ? 'fadeIn' : 'fadeOut' } duration = {200} style = {infoStyles.button}>
                      <TouchableOpacity style = {{padding: 20, paddingTop: 25, paddingLeft: 20, paddingBottom: 25}} onPress = {this.toggleShowDescription.bind(this)}>
                          { closeButton }
                      </TouchableOpacity>
                    </Animatable.View>
                  </View>
                  <View>
                  {
                      <Animatable.View animation = {descriptionVisible ? 'fadeOut' : 'fadeIn'} duration = {descriptionVisible ? 200 : 1000} style = {infoStyles.description}>
                        { readMoreButton }
                      </Animatable.View>
                  }
                  {
                      pastInitialClick && 
                      <Animatable.View animation = {descriptionVisible ? 'fadeInUp' : 'fadeOutDown'} duration = {500} style = {infoStyles.description}>
                        <ScrollView style = {{height: '80%', marginBottom: 50}}>
                          <Text style = {{color: 'white'}}>{description}</Text>
                        </ScrollView>
                      </Animatable.View>
                  }
                  </View>
                </View>
              </View>
        )
    }
}

infoStyles = {}
if (Platform.OS === 'ios') {
  infoStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    textContainer: {
      flex: 1,
      marginTop: '20%',
      paddingTop: 60,
      padding: 20,
      paddingRight: 0,
      backgroundColor: 'transparent'
    },
    top: {
      display: 'flex',
      flexDirection: 'row'
    },
    info: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    button: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    name: {
      color: 'white',
      fontWeight: 'bold',
      textShadowColor: 'black',
      textShadowOffset: {width : -1, height: 0},
      textShadowRadius: 5,
      paddingLeft: 3,
      lineHeight: 35,
      marginBottom: 5,
      fontSize: 36
    },
    artist: {
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: {width : -1, height: 0},
      textShadowRadius: 5,
      paddingLeft: 3,
      fontSize: 24,
      marginBottom: 20
    },
    description: {
      paddingTop: 15,
      paddingRight: 20,
      paddingLeft: 3,
      position: 'absolute'
    },
    darkOverlay: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)'
    },
    darkerOverlay: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.7)'
    },
    moreInfoButton: {
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: {width : -1, height: 1},
      textShadowRadius: 2,
      fontSize: 15,
    }
  });
} else {
  infoStyles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff'
    },
    textContainer: {
      flex: 1,
      paddingTop: 60,
      paddingRight: 0,
      padding: 20,
      backgroundColor: 'transparent'
    },
    top: {
      display: 'flex',
      flexDirection: 'row'
    },
    info: {
      flex: 4,
      justifyContent: 'center',
      alignItems: 'flex-start'
    },
    button: {
      flex: 2,
      justifyContent: 'center',
      alignItems: 'flex-end'
    },
    name: {
      color: 'white',
      textShadowColor: 'black',
      fontWeight: 'bold',
      textShadowOffset: {width : -1, height: 0},
      textShadowRadius: 5,
      paddingLeft: 2,
      lineHeight: 35,
      marginBottom: 5,
      fontSize: 36
    },
    artist: {
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: {width : -1, height: 0},
      textShadowRadius: 5,
      paddingLeft: 2,
      fontSize: 24,
      marginBottom: 20
    },
    description: {
      paddingTop: 15,
      paddingRight: 20,
      paddingLeft: 2,
      position: 'absolute'
    },
    darkOverlay: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    darkerOverlay: {
      position: 'absolute',
      height: '100%',
      width: '100%',
      backgroundColor: 'rgba(0, 0, 0, 0.6)'
    },
    moreInfoButton: {
      color: 'white',
      textShadowColor: 'black',
      textShadowOffset: {width : -1, height: 0},
      textShadowRadius: 5,
      fontSize: 15,
      elevation: 12
    }
  });
}

