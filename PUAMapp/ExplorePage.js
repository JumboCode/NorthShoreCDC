import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
  Button,
  StatusBar,
  Platform,
  Alert
} from "react-native";
import { Permissions } from "expo";
//import { MapView } from "expo";
import { NavigationActions } from "react-navigation";
import { lightpurple, darkpurple, pink } from "./colors.js";
import { Feather } from '@expo/vector-icons';
import MapViewDirections from 'react-native-maps-directions';


import  MapView, {Polyline} from 'react-native-maps';



const polylines = [ 
  {
    latitude: 42.518351, 
    longitude: -70.8909514 
  },
  {
    latitude: 42.5185239, 
    longitude: -70.8910845
  },
  {
    latitude: 42.5183255, 
    longitude: -70.8934113
  }
                      ]


// This triggers asking the user for location permissions.
// This won't do anything if the permission is already granted.
Permissions.askAsync(Permissions.LOCATION);
export default class ExplorePage extends React.Component {
    constructor(props) {
        super(props);
        
        initialLat = 42.518217;
        initialLong = -70.891919;
        initialDelta = 0.005;
        
        this.state = { markers : [],
                        };

      this.onRegionChange = this.onRegionChange.bind(this);
      this.tourNext = this.tourNext.bind(this);
 }

  getInitialState() {
    initialLat = 42.518217;
    initialLong = -70.891919;
    initialDelta = 0.005;
    return {

      region: {
        latitude: initialLat,
        longitude: initialLong ,
        latitudeDelta: initialDelta,
        longitudeDelta: initialDelta,
      },
    };
  }
    componentDidMount() {
        // if (Platform.OS === 'ios') this.watchID = navigator.geolocation.watchPosition();
        
    }

    componentWillUnmount() {
        // if (Platform.OS === 'ios') navigator.geolocation.clearWatch(this.watchID);

    }
    componentDidUpdate (){
      // if (this.props.screenProps.tourStarted){

      //        if(this.markers){
      //           if(this.markerID){
      //                 this.markers[this.markerID].showCallout();  
      //               }
      //         }
      //         if( this.props.screenProps.currMarker == Object.keys(this.props.screenProps.murals).length){
      //             this.toggleTour();
      //           }
      //       }
    }
    onRegionChange(region) {
      this.setState({ region });
    }

  static navigationOptions = ({ navigation }) => {
    return Platform.OS === "ios"
      ? {
          headerLeft: (
            <TouchableOpacity
              style={{ top: 30, left: -25, padding: 40 }}
              onPress={() => navigation.dispatch(NavigationActions.back())}
            >
              <View
                style={{
                  position: "relative",
                  flexDirection: "row",
                  backgroundColor: 'white',
                  zIndex: 100,
                  marginTop: -15,
                  width: 120,
                  height: 40,
                  borderRadius: 100,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingRight: 6,
                  shadowOffset: { width: 1, height: 1 },
                  shadowRadius: 2,
                  shadowOpacity: 0.6,
                }}
              >
                <Feather name="chevron-left" size={25} color={pink} style={{marginBottom: 1}}/>
                <Text style={{fontWeight: 'bold', fontSize: 17, color: pink}}>  Back </Text>
              </View>
            </TouchableOpacity>
          ),
          headerStyle: {
            position: "absolute",
            backgroundColor: "transparent",
            zIndex: 100,
            top: 0,
            left: 0,
            right: 0,
            borderBottomColor: "transparent"
          }
        }
      : {
          title: "Punto Urban Art",
          headerTintColor: "white",
          headerStyle: { backgroundColor: pink }
        };
  }
  
  renderImages() {
    const { navigate } = this.props.navigation;

    murals = this.props.screenProps.murals || {};
    artists = this.props.screenProps.artists || {};
    
    defaultMuralID = '';
    if (this.props.navigation.state.params && this.props.navigation.state.params.muralID) {
      defaultMuralID = this.props.navigation.state.params.muralID;
    }
    
    
    //this.markers = [];

    return Object.keys(murals).map((key, i) => {
      lat = parseFloat(murals[key]["Lat"]);
      long = parseFloat(murals[key]["Long"]);
      title = murals[key]["Title"];
      artistName = artists[murals[key]["Artist"]]["name"];

      setRefLambda = (function (ref) {
        this.calloutToMakeVisible = ref
      }).bind(this);
      
      return (
        <MapView.Marker
          key={i}
          title={title}
          description={artistName}
          coordinate={{ latitude: lat, longitude: long }}
          pinColor={pink}
          ref = {(ref) => this.state.markers[i] = ref}
          //{key == defaultMuralID ? setRefLambda : null} 

          onCalloutPress={() => {
            navigate("MuralInfoPage", {
              mural: murals[key],
              artist: artists[murals[key]["Artist"]]
            });
          }}
        />
      );
    });

   
  }
  
  goToMural() {

    if (this.calloutToMakeVisible) {
      this.calloutToMakeVisible.showCallout();
    }

    if (this.props.screenProps.tourStarted) {
            // See if the currMarker corresponds to a mural
            
            Lat = 0
            Lon = 0
            markerID =0

            Object.keys(murals).map((key,i) =>{
                    console.log("306")
                    if (murals[key]["Index"] == this.props.screenProps.currMarker){
                      Lat = parseFloat(murals[key]["Lat"]);
                      Lon = parseFloat(murals[key]["Long"]);
                      markerID = i;
                      }

                  });
      if (this.state.markers) {
                  this.state.markers[markerID].showCallout();
                }
    
    

    }

  }





    toggleTour() {

      console.log("start button pressed");

      if (this.props.screenProps.tourStarted){
        for (i = 0; i < this.state.markers.length;i++){
            this.state.markers[i].hideCallout();
        }
        
      }
      
      
        this.props.screenProps.tourState()


      
    
    }

    tourNext () {

        this.props.screenProps.changeMarker();
        
       
      
        if( this.props.screenProps.currMarker == Object.keys(this.props.screenProps.murals).length - 1){
            this.toggleTour();
        }
          
      

    }

    getCurrCoordsLat(){
      murals = this.props.screenProps.murals || {}
      Lat = 42.518217


        Object.keys(murals).map((key,i) =>{

            if (murals[key]["Index"] == this.props.screenProps.currMarker ){
              Lat = parseFloat(murals[key]["Lat"]);
              return Lat;
            }

          })
      
    
      return Lat;

    }

    getCurrCoordsLong(){
      murals = this.props.screenProps.murals || {}
      Lon = -70.891919
     
      Object.keys(murals).map((key,i) =>{

          if (murals[key]["Index"] == this.props.screenProps.currMarker ){
            Lon = parseFloat(murals[key]["Long"]);
            return Lon;
          }

        })


      return Lon;

    }

    temp() {
      console.log("prev or next");
    }
    

    render() {
        const { navigate } = this.props.navigation;
        initialLat = 42.518217;
        initialLong = -70.891919;
        initialDelta = 0.005;
        
        initialRegion = {
            longitude: initialLong,
            latitude: initialLat,
            latitudeDelta: initialDelta,
            longitudeDelta: initialDelta
        };
        
        // Determine which region we WANT to go to.
        region = undefined;
        
        murals = this.props.screenProps.murals || {};

        // If we came from the MuralInfoPage
        if (this.props.navigation.state.params && this.props.navigation.state.params.muralID) {
            key = this.props.navigation.state.params.muralID;
        
            region = {
              latitude: parseFloat(murals[key]["Lat"]),
              longitude: parseFloat(murals[key]["Long"]),
              latitudeDelta: .001,
              longitudeDelta: .001,
            }
        }
        
        // If we're on a tour
        else if (this.props.screenProps.tourStarted) {
            console.log("299", this.props.screenProps.currMarker)
            // See if the currMarker corresponds to a mural
            
            Lat = 0
            Lon = 0
            markerID =0

            Object.keys(murals).map((key,i) =>{
                    console.log("306")
                    if (murals[key]["Index"] == this.props.screenProps.currMarker){
                      Lat = parseFloat(murals[key]["Lat"]);
                      Lon = parseFloat(murals[key]["Long"]);
                      markerID = i;
                      }

                  });
            
            if (Lat != 0 && Lon != 0) {
                console.log("316")
                region = {
                   latitude: Lat,
                   longitude: Lon,
                   latitudeDelta: .0001,
                   longitudeDelta: .0001,
                 } 
                 console.log("markerID", markerID);
                 // if (this.state.markers) {
                 //  this.state.markers[markerID].showCallout();}
                
                     
            }
            
        }

        else {
          region = initialRegion
        }
        
        console.log("326", region)
        
        return (
            <View style = {{flex: 1}}>
            <StatusBar barStyle = { Platform.OS === 'ios' ? "dark-content" : "light-content"}/>
            <AnimatedMapView
              style = {{flex: 1 }}
              showsPointsOfInterest={false}
              showsUserLocation={true}
              initialRegion = {initialRegion}
              region =  {region}
              onLayout = {this.goToMural.bind(this)}
               >
              {this.renderImages()}
            
            <MapViewDirections
              origin= {polylines[0]}
              destination= {polylines[1]}
              apikey="AIzaSyBJaE850Gj_kT7KhTb__ifb6vA01TKmA3w"
              strokeWidth={3}
              strokeColor="hotpink"
              />
            </AnimatedMapView>
            {console.log(this.props.screenProps.tourStarted)}
          {this.props.screenProps.tourStarted ? 
            <View>
             <Button 
            title="prev"
            onPress={()=>this.temp()}
            >  </Button>
             <Button 
            title="next"
            onPress = {()=>this.tourNext()} >  
            </Button>
            <Button 
            title="end tour"
            onPress={()=>this.toggleTour()}
            >  </Button>
            </View>
            :
            <Button 
            title="start tour"
            onPress={()=>this.toggleTour()}>  
            </Button>}
          </View>
        );
    }

}


//console.log(this.props.screenProps.currMarker)

      //   Object.keys(murals).map((key,i) =>{

      //     if (murals[key]["Index"] == this.props.screenProps.currMarker){
      //       Lat = parseFloat(murals[key]["Lat"]);
      //       Lon = parseFloat(murals[key]["Long"]);
      //     }

      //   })
        
      // console.log(this.props.screenProps.currMarker)

      //    _mapView.animateToCoordinate({
      //       latitude: Lat,
      //       longitude: Lon,
      //     }, 1000)
// {{
//                 latitude: this.props.screenProps.tourStarted == false ? initialLat: this.getCurrCoordsLat() ,
//                 longitude: this.props.screenProps.tourStarted == false ? initialLong : this.getCurrCoordsLong() ,
//                 latitudeDelta: this.props.screenProps.tourStarted == false ? initialDelta : 0.0001,
//                 longitudeDelta: this.props.screenProps.tourStarted == false ? initialDelta : 0.0001,
//               }}


/*****************************************************************************/

// Just a MapView but it animates to region if the region prop changes!
class AnimatedMapView extends React.Component {
    
    shouldComponentUpdate(nextProps, nextState) {
        console.log("408")
        this.goToRegion(nextProps.region, nextProps.onLayout);
        return false;
    }
    
    // Note: onLayout (which gets passed in as a prop) is called afterwards so
    // that the parent component has a way to hook into onLayout.
    // But TBH im not sure if this is the right way to do this lol.
    goToRegion(region, onLayout) {
        if (region) {
            console.log("415")
            setTimeout(function () {
                this.map.animateToRegion(region, 1000);
            }.bind(this), 500);
        }
        
        if (onLayout) {
            onLayout();
        }
    }
    
    render() {
        var {initialRegion, region, children, onLayout, ...otherProps} = this.props;
                
        return (
            <MapView 
                onLayout={this.goToRegion.bind(this, region, onLayout)}
                initialRegion =  {initialRegion}
                ref =  {r => {this.map = r}}
                {...otherProps}>
                {children}
            </MapView>
        )
    }
    
}









