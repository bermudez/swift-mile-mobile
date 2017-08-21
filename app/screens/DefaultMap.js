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

import markerImage from "../assets/POIs/calibrationdrawing.png"

const IOS = Platform.OS === 'ios';
const ANDROID = Platform.OS === 'android';

class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.state.region = {
            latitude: 39.1355641,
            longitude: -94.5857858,
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
    // this.setState({
    //   ,
    // });
  };

  renderClusters(clusters){
      
  }

  onRegionChange(region) {
    // this.state.region = region;
  }

  render() {
    const { region } = this.props;
    console.log(region);

    return (
      <View style ={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
          style={styles.map}
        >
          {this.state.markers.map(marker => (
            <MapView.Marker
              key={marker.key}
              coordinate={marker.latlng}
              title={marker.title}
              description={marker.description}
            >
            <Image
              style={styles.mapMarker}
              source={markerImage}
            >

            </Image>
            </MapView.Marker>

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