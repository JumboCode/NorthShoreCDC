
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';


export default class HomePage extends React.Component {
    render() {
        const { navigate } = this.props.navigation;
        return (
            <View>
            <Button
              title="Explore"
              onPress={() =>
              navigate('ExplorePage')
            }
            />
            <Button
              title="Gallery"
              onPress={() =>
              navigate('GalleryPage')
            }
            />
            <Button
              title="Contact"
              onPress={() =>
              navigate('ContactPage')
            }
            />
</View>
        )
    }
}



