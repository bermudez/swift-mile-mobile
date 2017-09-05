import React from 'react';
import {
  Platform,
  View,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Text,
  Switch,
  Image,
  TouchableHighlight
} from 'react-native';
import MapView, { PROVIDER_GOOGLE} from 'react-native-maps';
import { poiClusters } from '../config/sampleMapClusters';

/* 
 * Cache in marker images workes only for ios platform 
 * add platform condition there  
 */
const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

const POIClustersData = poiClusters;
const DEFAULT_PADDING = { top: 40, right: 40, bottom: 40, left: 40 };

const mapIntitialRegion = {
            latitude: 39.143828,
            longitude: -94.573043,
            latitudeDelta: 0.019,
            longitudeDelta: 0.0181,
          };
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    };
    const { params } = this.props.navigation.state;

    this.state.markers = this.parseMarkers();
    this.props.markers = this.state.markers;
    this.state.selectedCluster = 0;
    this.state.polygons = poiClusters;
    this.state.region = {
            latitude: 39.143828,
            longitude: -94.573043,
            latitudeDelta: 0.019,
            longitudeDelta: 0.0181,
          };
    this.onRegionChange = this.onRegionChange.bind(this);
  };

  val2key(val,array){
    for (var key in array) {
      this_val = array[key];
      if(this_val.key == val){
          return key;
          break;
      }
    }
  }

  parseMarkers()
  {
    let markers = [];
    for (var i = POIClustersData.length - 1; i >= 0; i--) {
      for (var j = POIClustersData[i].pois.length - 1; j >= 0; j--) {
        markers.push(POIClustersData[i].pois[j]);
      }
    }
    return markers;
  }

  parseCoordinates()
  {
    let coordinates = [];
    for (var i = POIClustersData.length - 1; i >= 0; i--) {
      for (var j = POIClustersData[i].polygonOverlay.coordinates.length - 1; j >= 0; j--) {
        coordinates.push(POIClustersData[i].polygonOverlay.coordinates[j]);
      }
    }
    return coordinates;
  }

  onPressMarker(e, venue_key)
  {

    if(typeof(e.nativeEvent.action) !== 'undefined' && e.nativeEvent.action=='marker-press')
    {
      if(typeof(e.nativeEvent.target) !== 'undefined')
      {
        let markers_array = this.parseMarkers();
        let venue_index_key = this.val2key(venue_key, markers_array);
        this.props.screenProps.currentVenueIndex = venue_index_key;
        this.props.navigation.navigate('VenueInfo', {venueKey: venue_key});
      }
    }
  }

  /**
   * On clicking on map process click event
   */
  onPressMap(e)
  {
    if (typeof(e.nativeEvent.coordinate) !== 'undefined')
    {
      var selectedPolygon = this.pointInPloygons(e.nativeEvent.coordinate);
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
  pointInPloygons(point) 
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

  /**
   * Check if point(latlong object) is inside polygon
   * Returns boolean true or false
   */
  pointInPoly(point, polygon) {
      // ray-casting algorithm based on
      // http://www.ecse.rpi.edu/Homepages/wrf/Research/Short_Notes/pnpoly.html
      
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

  onRegionChange(region)
  {
    /* Hack to initialise region when null */
    // if(region.latitude<1)
    // {
    //   region = {
    //         latitude: 39.143828,
    //         longitude: -94.573043,
    //         latitudeDelta: 0.019,
    //         longitudeDelta: 0.0181,
    //       };
    //   this.setState({region});
    // }
    
    console.log(region);
  }

  onMapReady(e)
  {
    let marker_coordinates = this.parseCoordinates();
    this.map.fitToCoordinates(marker_coordinates, {
      edgePadding: DEFAULT_PADDING,
      animated: true,
    });
  }
  render() {
    const { region } = this.props;
    //cacheEnabled={false}
    //onRegionChange={e => this.onRegionChange(e)}
    return (
      <View style ={styles.container}>
        <MapView
          onLayout={e => this.onMapReady(e)}
          ref={ref => { this.map = ref; }}
          provider={PROVIDER_GOOGLE}
          initialRegion={mapIntitialRegion}
          
          onPress={e => this.onPressMap(e)}
          style={styles.map}
        >
          {
            this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.latlng}
              title={marker.title}
              onPress={e => this.onPressMarker(e, marker.key)}
              description={marker.description}
            >
              <Image
                style={styles.mapMarker}
                resizeMode='contain'
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
    height: 85,
    width: 85
  },

});

module.exports = Map;