
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView,
          Animated, TouchableOpacity } from 'react-native';

var infoButtons = [
    require('./info.png'),
    require('./close.png')
];

export default class MuralInfoPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        descriptionVisible: false,
        info: 0
      }
    }

    toggleShowDescription() {
      this.setState({descriptionVisible: !this.state.descriptionVisible})
      if (this.state.info == 0){
          this.setState({info: 1})
      }
      else{
          this.setState({info: 0})
      }
    }

    render() {
        
        const mural = this.props.navigation.state.params.mural
      
        return (
            <View style = {styles.container}>
              <Image style={{flex: 1, position: "absolute", resizeMode: 'cover', height: '100%', width: '100%'}} source={{uri: mural.Photo}} />
              <OpacityView style = {styles.darkOverlay} visible = {this.state.descriptionVisible}/>
              <View style = {styles.textContainer}>
                <View style = {styles.top}>
                  <View style = {styles.info}>
                    <View>
                      <Text style = {styles.name}>{mural.Title}</Text>
                    </View>
                    <View>
                      <Text style = {styles.artist}>{mural.Artist}</Text>
                    </View>
                  </View>
                  <View style = {styles.button}>
                    <TouchableOpacity onPress = {this.toggleShowDescription.bind(this)}>
                        <Image source={infoButtons[this.state.info]} style={{width: 30, height: 30}}/>
                    </TouchableOpacity>
                  </View>
                </View>
                <DrawerView style = {styles.description} visible = {this.state.descriptionVisible}>
                  <Text style = {{color: 'white'}}>{JSON.stringify(mural)}</Text>
                </DrawerView>
              </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  textContainer: {
    flex: 1,
    marginTop: '10%',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  name: {
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width : -1, height: 0},
    textShadowRadius: 5,
    fontSize: 36
  },
  artist: {
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: {width : -1, height: 0},
    textShadowRadius: 5,
    fontSize: 24
  },
  description: {
    marginTop: 50
  },
  darkOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
  }
});



// A view that transitions from hidden to visible and back
class OpacityView extends React.Component {
  
  
  constructor(props) {
    super(props)

    this.hidden_opacity = .3
    this.visible_opacity = .7

    opacity = this.hidden_opacity;
    if (props.visible) {
      opacity = this.visible_opacity
    }
    this.state = {
      opacity: new Animated.Value(opacity)
    };
  }

  componentWillReceiveProps(nextProps) {

    toValue = this.hidden_opacity
    if (nextProps.visible) {
      toValue = this.visible_opacity
    }

    Animated.timing(                  // Animate over time
      this.state.opacity,            // The animated value to drive
      {
        toValue: toValue,                   // Animate to opacity: 1 (opaque)
        duration: 1 * 500,              // Make it take a while
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { opacity } = this.state;

    let style = StyleSheet.flatten([this.props.style, {opacity: opacity}])

    return (
      <Animated.View                 // Special animatable View
        style={style}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

// A view that transitions from hidden to visible by rising
// Hidden : margin-top = a big number
// Visible : margin-top = 0
class DrawerView extends React.Component {
    
  constructor(props) {
    super(props)

    this.hidden_margin = 100
    this.visible_margin = 0
    this.hidden_opacity = 0.0
    this.visible_opacity = 1.0

    margin = this.hidden_margin;
    opacity = this.hidden_opacity;
    if (props.visible) {
      margin = this.visible_margin
      opacity = this.visible_opacity
    }
    this.state = {
      margin: new Animated.Value(margin),
      opacity: new Animated.Value(opacity)
    };
  }

  componentWillReceiveProps(nextProps) {

    toValueMargin = this.hidden_margin
    toValueOpacity = this.hidden_opacity
    if (nextProps.visible) {
      toValueMargin = this.visible_margin
      toValueOpacity = this.visible_opacity
    }

    // Animated.timing(
    //   this.state.margin,
    //   {
    //     toValue: toValue,
    //     duration: 1 * 500,
    //   }
    // ).start();                        // Starts the animation
    Animated.parallel([
      Animated.timing(this.state.margin, {
        toValue: toValueMargin,
        duration: 500
      }),
      Animated.spring(this.state.opacity, {
        toValue: toValueOpacity,
        duration: 500
      })
    ]).start()
  }

  render() {
    let { margin, opacity } = this.state;

    let style = StyleSheet.flatten([this.props.style, {marginTop: margin, opacity: opacity}])

    return (
      <Animated.View                 // Special animatable View
        style={style}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
