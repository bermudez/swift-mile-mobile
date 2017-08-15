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
import { poiClusters } from '../config/sampleMapClusters';
import markerImage from "../assets/POIs/calibrationdrawing.png"

/* 
 * Cache in marker images workes only for ios platform 
 * add platform condition there  
 */
const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

const POIClustersData = poiClusters;
const POIMarkerItems = getMarkerItems();
const POIMarkerImages = getMarkerImages();
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };
 
const LATITUDE = 39.135470;
const LONGITUDE = -94.576219;
const LATITUDE_DELTA = 0.019;
const LONGITUDE_DELTA = 0.0181;
const MAX_DELTA = 0.023;

function getMarkerImages()
{
  let tempImages = [];
  for (var i = POIClustersData.length - 1; i >= 0; i--) {
    for (var j = POIClustersData[i].pois.length - 1; j >= 0; j--) {
      // POIClustersData[i].pois[j]
      console.log("Marker Key: ");
      console.log(POIClustersData[i].pois[j].key);
      console.log("Marker Image: ");
      console.log(POIClustersData[i].pois[j].markerImage);
      // tempImages[POIClustersData[i].pois[j].key] = require('image!$POIClustersData[i].pois[j].markerImage');

    }
  }

  return tempImages;
}

function renderMarker(marker)
{
  return (
      <MapView.Marker
            key={marker.key}
            coordinate={marker.latlng}
            title={marker.title}
            description={marker.description}
          >
          <Image
            style={{
              height: 20,
              width: 20
            }}
            source={{ uri: marker.markerImage}}
          />
      </MapView.Marker>
    );
}

function renderClusterMarkers(clusterPolygon)
{
  let markers = [];
  for (var i = clusterPolygon.pois.length - 1; i >= 0; i--) {
    markers.push(renderMarker(clusterPolygon.pois[i]));
  }
  return (
      markers
    )
}
function getMarkerItems()
{
  let tempItems = [];
  for (var i = POIClustersData.length - 1; i >= 0; i--) {
    tempItems.push(renderClusterMarkers(POIClustersData[i]));
  }

  return tempItems;
}

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };

    this.state.markers = this.parseMarkers();
    console.log("=========================");
    // console.dir(this.state.markers);

    this.state.selectedCluster = 0;
    this.state.polygons = poiClusters;
    this.state.region = {
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA,
          };
  };

  parseMarkers()
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

  /**
   * On clicking on map process click event
   */
  onPressMap(e)
  {
    if (typeof(e.nativeEvent.coordinate) !== 'undefined')
    {
      console.log("onPress event fired ");
      // console.dir(e.nativeEvent);
      var selectedPolygon = this.pointInPolygons(e.nativeEvent.coordinate);
      if(selectedPolygon)
      {
        var key = selectedPolygon.polygon.key;
        if(this.state.selectedCluster!==key)
        {
          this.state.selectedCluster = key;
          this.fitPolygonToScreen(selectedPolygon);
        }
      }      
    }
  }

  /**
   * check if input latlong is inside any of the polygons
   * if yes return that polygon
   * else return false
   */
  pointInPolygons(point) 
  {
    var tmpFlag = false;
    for (var i = POIClustersData.length - 1; i >= 0; i--) {
      tmpFlag = this.pointInPoly(point, POIClustersData[i].polygonOverlay.coordinates);
      if(tmpFlag)
      {
        break;
      }
    }
    if(tmpFlag)
    {
      return POIClustersData[i];
    }
    else
    {
      return tmpFlag;
    }
  }

  /**
   * Fit map to polygon coordinates
   */
  fitPolygonToScreen(polygon)
  {
    this.map.fitToCoordinates(polygon.polygonOverlay.coordinates, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }

  onRegionChange(region) {
    // this.state.region = region;
  }

  onRegionChangeComplete(region) {
    // this.state.region = region;
    console.log("region",region);
    console.log("LATITUDE DELTA: ", this.state.region.latitudeDelta);
    
  }

  /**
   * Check if point(latlong object) is inside polygon
   * Returns boolean true or false
   */
  pointInPoly(point, polygon) {
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
      
      // console.dir(point);
      // console.dir(polygon);
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
          onPress={e => this.onPressMap(e)}
          onRegionChange={this.onRegionChange}
          style={styles.map}
        >
          {
            this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            >
              <Image
                style={{
                  height: 90,
                  width: 90,
                  resizeMode: 'contain'
                }}
                source={{ uri: marker.markerImage, cache: 'force-cache'}}
                
              />
            </MapView.Marker>
          ))}

          {
            this.state.polygons.map(polygon => (
            <MapView.Polygon
              key={polygon.polygon.key}
              coordinates={polygon.polygonOverlay.coordinates}
              strokeColor={polygon.polygonOverlay.strokeColor}
              fillColor={polygon.polygonOverlay.fillColor}
              strokeWidth={polygon.polygonOverlay.strokeWidth}
            >
            </MapView.Polygon>
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