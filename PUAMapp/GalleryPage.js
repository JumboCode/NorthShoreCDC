
import React from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Button} from 'react-native';


export default class GalleryPage extends React.Component {
	constructor(props) {
	    super(props);
	    this.state = {showText: "hello",
                      imageURLs: ["https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg", 
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg",
                                 "https://www.creativesalem.com/wp-content/uploads/2017/09/809f86cc5e7a3b2eb09158dcd3404c77.jpg" ]};
  	}
 	renderImages() {
    return this.state.imageURLs.map((uri,i) =>{
      return(
        <Image key={i} style={{height: 120, width: 150}} source={{uri: uri}} />
      );
    })
  }
  	//NOTE: use react native map function to loop through the above image array and display each image
    render() {
        return (
            <View style={{flex: 1, flexDirection: 'column', flexWrap: 'wrap'}}>
               {this.renderImages()}
            </View>

        )
    }
}



