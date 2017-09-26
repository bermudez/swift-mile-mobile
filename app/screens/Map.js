import React from 'react';
import {
  PermissionsAndroid,
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
import isEqual from 'lodash/isEqual';

const GEOLOCATION_OPTIONS = { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 };
const ANCHOR = { x: 0.5, y: 0.5 };

const colorOfmyLocationMapMarker = 'blue';

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

// const propTypes = {
//   ...MapView.Marker.propTypes,
//   // override this prop to make it optional
//   coordinate: PropTypes.shape({
//     latitude: PropTypes.number.isRequired,
//     longitude: PropTypes.number.isRequired,
//   }),
//   children: PropTypes.node,
//   geolocationOptions: PropTypes.shape({
//     enableHighAccuracy: PropTypes.bool,
//     timeout: PropTypes.number,
//     maximumAge: PropTypes.number,
//   }),
//   heading: PropTypes.number,
//   enableHack: PropTypes.bool,
// };

// const defaultProps = {
//   enableHack: false,
//   geolocationOptions: GEOLOCATION_OPTIONS,
// };

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.mounted = false;
    this.state = {
      myPosition: null
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
    this.latitude = null;
    this.longitude = null;
    this.error = null;
    this.onRegionChange = this.onRegionChange.bind(this);
  };

  // componentDidMount() {
  //   this.mounted = true;
  //   // If you supply a coordinate prop, we won't try to track location automatically
  //   if (this.props.coordinate) return;

  //   if (Platform.OS === 'android') {
  //     PermissionsAndroid.requestPermission(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION)
  //       .then(granted => {
  //         if (granted && this.mounted) this.watchLocation();
  //       });
  //   } else {
  //     this.watchLocation();
  //   }
  // }
  // watchLocation() {
  //   // eslint-disable-next-line no-undef
  //   this.watchID = navigator.geolocation.watchPosition((position) => {
  //     const myLastPosition = this.state.myPosition;
  //     const myPosition = position.coords;
  //     if (!isEqual(myPosition, myLastPosition)) {
  //       this.setState({ myPosition });
  //     }
  //   }, null, this.props.geolocationOptions);
  // }
  // componentWillUnmount() {
  //   this.mounted = false;
  //   // eslint-disable-next-line no-undef
  //   if (this.watchID) navigator.geolocation.clearWatch(this.watchID);
  // }

  componentDidMount() {
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          myPosition: position.coords,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }

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

    // let { heading, coordinate } = this.props;
    // if (!coordinate) {
    //   const { myPosition } = this.state;
    //   if (!myPosition) return null;
    //   coordinate = myPosition;
    //   heading = myPosition.heading;
    // }

    // const rotate = (typeof heading === 'number' && heading >= 0) ? `${heading}deg` : null;

    //cacheEnabled={false}
    //onRegionChange={e => this.onRegionChange(e)}
    //provider={PROVIDER_GOOGLE}
    return (
      <View style ={styles.container}>
        <MapView
          onLayout={e => this.onMapReady(e)}
          ref={ref => { this.map = ref; }}

          initialRegion={mapIntitialRegion}
          
          onPress={e => this.onPressMap(e)}
          style={styles.map}
        >

              <MapView.Marker
                anchor={ANCHOR}
                style={styles.mapMarker}
                coordinate={this.state.myPosition}
              >
              </MapView.Marker>

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


const SIZE = 35;
const HALO_RADIUS = 6;
const ARROW_SIZE = 7;
const ARROW_DISTANCE = 6;
const HALO_SIZE = SIZE + HALO_RADIUS;
const HEADING_BOX_SIZE = HALO_SIZE + ARROW_SIZE + ARROW_DISTANCE;

module.exports = Map;