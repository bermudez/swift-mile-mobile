import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image,
  Button
} from 'react-native';
import Swiper from 'react-native-swiper';
import { poiClusters } from '../config/sampleMapClusters';
import VenueImage from "../assets/POIs/calibrationdrawing.png"
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';

const POIClustersData = poiClusters;
const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';
const VenuesData = parseMarkers();

function parseMarkers()
  {
    console.log("Parsing Markers!");
    let markers = [];
    // console.log("polygons----");
    // console.dir(POIClustersData);
    for (var i = POIClustersData.length - 1; i >= 0; i--) {
      // console.dir(POIClustersData[i].pois);
      for (var j = POIClustersData[i].pois.length - 1; j >= 0; j--) {
        markers.push(POIClustersData[i].pois[j]);
        // console.dir(POIClustersData[i].pois[j]);
      }
    }
    // console.log("Markers-----");
    console.dir(markers);
    return markers;
  }

  function val2key(val,array){
    for (var key in array) {
      this_val = array[key];
      if(this_val == val.key){
          return key;
          break;
      }
    }
  }

class VenueInfo extends React.Component {

  constructor(props) {
    super(props);

    const { params } = this.props.navigation.state;
    console.log("Parameters: ---");
    console.dir(params);

    this.state = {};
    this.state.initialSlide = 10;
    this.state.VenuesData = VenuesData;
    if(typeof(params) !== 'undefined' && typeof(params.venueKey) !== 'undefined')
    {
      // this.state.initialSlide = val2key(params.venueKey,VenuesData);
      console.log("Swiper index");
      console.log(val2key(params.venueKey,VenuesData));
      // this.swiper.index = params.venueKey;
    }
    else
    {
      console.log("venueKey not found");
    }

    // console.log("Inside VenueInfo constructor");
    // console.log("Inside VenueInfo constructor: props");
    // console.dir(props);

  };

  showCheckInScreen(e)
  {
    if(typeof(e.nativeEvent.target) !== 'undefined')
    {
      this.props.navigation.navigate('CameraScreen', {venueKey: e.nativeEvent.target});
    }
  }

  componentDidMount()
  {
    // this.swiper.index = this.state.initialSlide;
    this.swiper.index = 3;
  }

  getVal(val){
    console.warn(val);
  }

  render() {
          return (
            <Swiper style={styles.wrapper} 
            showsButtons={true}
            index={this.state.initialSlide}
            ref={ref => { this.swiper = ref; }}
            >
            {
            this.state.VenuesData.map(venue => (
              <View style={styles.slide1}
                key={venue.key}
              >
                <View style={{ justifyContent: 'center' }}>
                  <Text style={styles.text}>{venue.title}</Text>
                  <Text style={styles.text}>{venue.description}</Text>
                  <Image 
                    style={{
                      height:200,
                      width:200
                    }}
                    source={{ uri: venue.markerImage, cache: 'force-cache'}}
                    />

                </View>

                <View>
                  <Text style={styles.text}>Venue Directions Map Goes here</Text>
                </View>
                <View>
                  <Text style={styles.text}>Venue Offers Goes here</Text>
                  <Text style={styles.text}>Venue Offers Goes here</Text>
                  <Button
                    key={venue.key}
                    onPress={e => this.showCheckInScreen(e)}
                    title="CheckIn Here"
                    color="#841584"
                    accessibilityLabel="Checkin here by taking a selfie"
                  />
                </View>

              </View>              
            ))}
            
          </Swiper>
      );
    }
  }
var styles = StyleSheet.create({
  wrapper: {
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  }
});


module.exports = VenueInfo;