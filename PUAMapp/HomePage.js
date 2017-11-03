
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableHighlight} from 'react-native';


export default class HomePage extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        // TODO: replace the background image (it's the wrong proportions)
        return (
            <View style = {styles.container}>
            <Image style = {styles.image} source = {{uri: "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg"}} />
            <TouchableHighlight
                style = {styles.blackButton}
                onPress={() =>
                navigate('ExplorePage')
            }>

            <Text style = {styles.buttonText}>Explore</Text>
            </TouchableHighlight>
            <TouchableHighlight
            style = {styles.greyButton}
            onPress={() =>
            navigate('GalleryPage')
            }>

            <Text style = {styles.buttonText}>Gallery</Text>
            </TouchableHighlight>
            <TouchableHighlight
                style = {styles.pinkButton}
                onPress={() =>
                navigate('ContactPage')
            }>
            <Text style = {styles.buttonText}>Contact</Text>
              </TouchableHighlight>
          </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: 'flex',
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
    },
    image: {
        flex: 1,
        position: 'absolute',
        resizeMode: 'cover',
        height: '100%',
        width: '100%'
    },
    blackButton: {
        height: '15%',
        backgroundColor: 'black',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .9
    },
    greyButton: {
        height: '15%',
        backgroundColor: 'grey',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .9
    },
    pinkButton: {
        height: '15%',
        backgroundColor: 'pink',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        opacity: .9
    },
    buttonText: {
        fontSize: 42,
        color: 'white'
    }
});
