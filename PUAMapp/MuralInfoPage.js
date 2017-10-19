
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';


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
              {this.state.descriptionVisible && 
                <View style = {styles.darkOverlay}/>
              }
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
                    <Button title = "i" onPress = {this.toggleShowDescription.bind(this)} />
                  </View>
                </View>
                { this.state.descriptionVisible &&
                  <View style = {styles.description}>
                    <Text>This is the description w00t</Text>
                  </View>
                }
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
    fontSize: 36
  },
  artist: {
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
    opacity: .25
  }
});

