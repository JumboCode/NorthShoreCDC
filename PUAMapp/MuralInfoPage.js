
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button,
          Animated } from 'react-native';


export default class MuralInfoPage extends React.Component {

    constructor(props) {
      super(props)
      this.state = {
        descriptionVisible: false
      }
    }

    toggleShowDescription() {
      this.setState({descriptionVisible: !this.state.descriptionVisible})
    }

    render() {
        return (
            <View style = {styles.container}>
              <Image style={{flex: 1, position: "absolute", resizeMode: 'cover', height: '100%', width: '100%'}} source={{uri: "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg"}} />
              <OpacityView style = {styles.darkOverlay} visible = {this.state.descriptionVisible}/>
              <View style = {styles.textContainer}>
                <View style = {styles.top}>
                  <View style = {styles.info}>
                    <View>
                      <Text style = {styles.name}>Mural Name</Text>
                    </View>
                    <View>
                      <Text style = {styles.artist}>Artist Name</Text>
                    </View>
                  </View>
                  <View style = {styles.button}>
                    <Button title = "CLICK ME" onPress = {this.toggleShowDescription.bind(this)} />
                  </View>
                </View>
                <DrawerView style = {styles.description} visible = {this.state.descriptionVisible}>
                  <Text style = {{color: 'white'}}>This is the description w00t</Text>
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
    textShadowOffset: {width : 1, height: 1},
    fontSize: 36
  },
  artist: {
    color: 'white',
    textShadowOffset: {width : 1, height: 1},
    fontSize: 24
  },
  description: {
    marginTop: 50
  },
  darkOverlay: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    backgroundColor: 'grey',
  }
});


// A view that transitions from hidden to visible and back
class OpacityView extends React.Component {

  constructor(props) {
    super(props)
    opacity = 0.0;
    if (props.visible) {
      opacity = .7
    }
    this.state = {
      opacity: new Animated.Value(opacity)
    };
  }

  componentWillReceiveProps(nextProps) {

    toValue = 0.0
    if (nextProps.visible) {
      toValue = .7
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
    margin = 1000;
    if (props.visible) {
      margin = 0
    }
    this.state = {
      margin: new Animated.Value(margin)
    };
  }

  componentWillReceiveProps(nextProps) {

    toValue = 1000
    if (nextProps.visible) {
      toValue = 0
    }

    Animated.timing(
      this.state.margin,
      {
        toValue: toValue,
        duration: 1 * 500,
      }
    ).start();                        // Starts the animation
  }

  render() {
    let { margin } = this.state;

    let style = StyleSheet.flatten([this.props.style, {marginTop: margin}])

    return (
      <Animated.View                 // Special animatable View
        style={style}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}
