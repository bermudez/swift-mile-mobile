import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
  Image
} from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';

import { poiClusters } from '../config/mapData';

import markerImage from "../assets/POIs/calibrationdrawing.png"

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

const MARKERS = [
  createMarker(),
  createMarker(2),
  createMarker(3),
  createMarker(4),
];
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
function createMarker(modifier = 1) {
  return {
    latitude: 39.143828 - (0.01 * modifier),
    longitude: -94.573043 - (0.01 * modifier)
  };
}
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.state.markerPosition = {
            height: 60,
            width: 180
          };

    console.log(poiClusters);
    
    this.state.polygons = poiClusters;
    this.state.polygon={
    	id: 1,
    	coordinates:[
          {
            latitude: 39.141814, 
            longitude: -94.578472
          },
          {
            latitude: 39.142011, 
            longitude: -94.577298
          },
          {
            latitude: 39.145097, 
            longitude: -94.577252
          },
          {
            latitude: 39.145144, 
            longitude: -94.578449
          }
		]
    }
    this.zoomToCluster = this.zoomToCluster.bind(this);
    // this.renderClusters = this.renderClusters.bind(this);
    this.state.region = {
            latitude: 39.143828,
            longitude: -94.573043,
            latitudeDelta: 0.019,
            longitudeDelta: 0.0181,
          };

    this.state.markers = [
      {
        key: "1",
        latlng:{
            latitude: 39.1355641,
            longitude: -94.5857858
          },
        title:"test",
        description:"test desc",
        image:"../assets/POIs/calibrationdrawing.png"
      },
      {
        key: "2",
        latlng:{
            latitude: 39.1355651,
            longitude: -94.5857878
          },
        title:"test",
        description:"test desc",
        image:"../assets/POIs/calibrationdrawing.png"
      }


      ];

  this.state.markerLatLongs = [
      {
        latitude: 39.1355641,
        longitude: -94.5857858
      },
      {
        latitude: 39.1355651,
        longitude: -94.5857878
      }
    ];
  };

  zoomToCluster(e){
    console.log("zoomToCluster start");
      console.dir(e.nativeEvent.coordinate);
      
      tmp = this.pointInPoly(e.nativeEvent.coordinate, this.state.polygon.coordinates);
//this.state.markerLatLongs
    this.map.fitToCoordinates(MARKERS, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
      console.dir(tmp);
      if(tmp)
        {
          console.log('Inside Polygon');
        }else
        {
          console.log('Not Inside Polygon');
        }
      console.log("zoomToCluster center");
  }

  onRegionChange(region) {
    // this.state.region = region;
  }

  pointInPoly(point, polygon) {
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
      
      console.dir(point);
      console.dir(polygon);
      var x = point.latitude, y = point.longitude;
      
      var inside = false;
      for (var i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
          var xi = polygon[i].latitude, yi = polygon[i].longitude;
          var xj = polygon[j].latitude, yj = polygon[j].longitude;
          
          var intersect = ((yi > y) != (yj > y))
              && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
          if (intersect) inside = !inside;
      }
      
      return inside;
  };

  render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style ={styles.container}>
        <MapView
          ref={ref => { this.map = ref; }}
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          onPress={e => this.zoomToCluster(e)}
          onRegionChange={this.onRegionChange}
          style={styles.map}
        >
          {
            this.state.polygons.map(polygon => (
            <MapView.Polygon
              key={polygon.key}
              coordinates={polygon.coordinates}
              strokeColor="#F00"
              fillColor="rgba(255,0,0,0.5)"
              onPress={e => this.zoomToCluster(e, polygon.key)}
              strokeWidth={1}
            />
          ))}
        </MapView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  mapMarker: {
    height: 30,
    width: 90
  },

});

module.exports = Map;