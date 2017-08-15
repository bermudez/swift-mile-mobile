import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  Image
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
    let markers = [];
    console.log("polygons----");
    // console.dir(POIClustersData);
    for (var i = POIClustersData.length - 1; i >= 0; i--) {
      // console.dir(POIClustersData[i].pois);
      for (var j = POIClustersData[i].pois.length - 1; j >= 0; j--) {
        markers.push(POIClustersData[i].pois[j]);
        // console.dir(POIClustersData[i].pois[j]);
      }
    }
    console.log("Markers-----");
    // console.dir(markers);
    return markers;
  }

class VenueInfo extends React.Component {

  constructor(props) {
    super(props);

    this.state = {};
    this.state.VenuesData = VenuesData;
  };

  getVal(val){
    console.warn(val);
  }
  render() {
          return (
            <Swiper style={styles.wrapper} showsButtons={true}>
            {
            this.state.VenuesData.map(venue => (
              <View style={styles.slide1}>
                <View style={styles.slide1}>
                  <Text style={styles.text}>{venue.title}</Text>
                  <Text style={styles.text}>{venue.description}</Text>
                  <Image 
                    style={{
                      height:200,
                      width:200,
                      resizeMode: 'contain'
                    }}
                    //source={VenueImage}
                    source={{ uri: venue.image, cache: 'force-cache'}}
                    />

                </View>

                <View>
                  <Text style={styles.text}>Venue Directions Map Goes here</Text>
                </View>
                <View>
                  <Text style={styles.text}>Venue Offers Goes here</Text>
                  <Text style={styles.text}>Venue Offers Goes here</Text>
                  <Text style={styles.text}>Venue Offers Goes here</Text>
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