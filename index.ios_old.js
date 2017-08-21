/**
 * NKCGo - React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { RNS3 } from 'react-native-aws3';
import { AppRegistry, Text, CameraRoll, Dimensions, View, StyleSheet } from 'react-native';
import Camera from 'react-native-camera';

import { Button } from 'react-native-vector-icons/Ionicons';
export default class NKCGo extends Component {

  constructor() {
    super();
    this.takePicture = this.takePicture.bind(this);
  }
  takePicture() {
    this.camera.capture()
      .then((data) => {
        let uuidv4 = require('uuid/v4'); //'test1234';
        let file_name = uuidv4();
        console.log(file_name);
        let file = {
          uri: data.path,
          name: file_name + '.jpg',
          type: 'image/jpeg'
        };

        const options = {
          keyPrefix: 'uploads/',
          bucket: 'swiftmile-app-assets',
          region: 'us-east-2',
          accessKey: 'AKIAIW67M2PCTGUMAMTQ',
          secretKey: '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',
          successActionStatus: 201
        };

        RNS3.put(file, options).then(response => {
          if (response.status !== 201) {
            throw new Error('Failed to upload image to S3', response);
          }
          console.log('*** BODY ***', response.body);
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          style={styles.cameraContainer}
          aspect={Camera.constants.Aspect.fill}
          captureAudio={false}
        />
        <Button
          name="ios-camera-outline"
          size={60}
          backgroundColor="transparent"
          style={{ justifyContent: 'center' }}
          onPress={this.takePicture}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'black'
  },
  preview: {
    justifyContent: 'center',
    alignItems: 'center',
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width
  },
  cameraContainer: {
    height: Dimensions.get('window').width,
    width: Dimensions.get('window').width,
    backgroundColor: 'salmon'
  }
});


AppRegistry.registerComponent('NKCGo', () => NKCGo);
