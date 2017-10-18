
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';


export default class GalleryPage extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {showText: "hello",
                      imageURLs: ["https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg", 
                                 "https://www.creativesalem.com/wp-content/uploads/2017/10/Punto-Urban-Art-Museum-chorboogie-570x350.jpg",
                                 "http://salem.org/wp-content/uploads/2017/08/puam_cpwon.jpg",
                                 "https://static.wixstatic.com/media/ae30cb_fa00e7256b474b13ba2cf27d82f92b12~mv2.jpg",
                                 "https://scontent-sjc2-1.cdninstagram.com/t51.2885-15/s320x320/e35/c0.42.720.720/21911239_1840467466243531_248052524760694784_n.jpg",
                                 "https://c.o0bg.com/rf/image_1920w/Boston/2011-2020/2017/07/19/BostonGlobe.com/Metro/Images/tlumacki_salemmurals_metro164copy.jpg",
                                 "http://northshorecdc.org/wp-content/uploads/2017/08/0V1A2477-1.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg", 
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg", ],
                      featuredArtistImage: "https://www.creativesalem.com/wp-content/uploads/2017/08/Mary-Jane-Lee-Park-Salem-MA-2293.jpg",};
  	}
 	renderImages() {
    return this.state.imageURLs.map((uri,i) =>{
      return(
        <Image key={i} style={{height: 100, width: 100, margin: 10}} source={{uri: uri}} />
      );
    })
  }
  	
    render() {
        return (
          <ScrollView>
            <View >
              <Image style={{height: 190,  alignSelf: 'stretch'}} source={{uri: this.state.featuredArtistImage}} />
              <View style={{backgroundColor: 'rgba(0,0,0,.4)', height: 190, position : 'absolute', width: 380 }} >
               <Text style={{ color: 'white', fontSize: 30, marginTop: 80, marginLeft: 15}}> Featured Artist </Text>
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



