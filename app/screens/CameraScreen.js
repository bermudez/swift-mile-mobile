import React, { Component } from 'react';
import { RNS3 } from 'react-native-aws3';
import { Text, CameraRoll, Dimensions, View, StyleSheet } from 'react-native';
import Camera from 'react-native-camera';
import { Button } from 'react-native-vector-icons/Ionicons';
import { s3 } from '../config/params';

const s3Config = s3;

const BASE_URL = 'https://y86lpymaph.execute-api.us-east-2.amazonaws.com/prd/snaps/';

export default class CameraScreen extends Component {

  constructor(props) {
    super(props);
    console.log(props);
    this.state = {
      cameraType : 'front',
      mirrorMode : false
    }
    var { params } = this.props.navigation.state;
    // this.props.navigation.state.params.venueKey
    this.props.currentVenueKey = params.venueKey;
    console.log("Camera Sccreen - Current Venue Key - ");
    console.log(params.venueKey);
    // this.props.screenProps.userToken = "SettingUserTokenTest1";
    this.takePicture = this.takePicture.bind(this);
  }

  changeCameraType() {
    if(this.state.cameraType === 'back') {
      this.setState({
        cameraType : 'front',
        mirror : true
      })
    }
    else {
      this.setState({
        cameraType : 'back',
        mirror : false
      })
    }
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
        const s3ConfigData = require('../config/s3Config');
        s3Config = s3ConfigData.config();
        console.log('Config file');
        console.log(s3Config);
        const options = {
          keyPrefix: s3Config.USER_TEMP_UPLOAD_BUCKET_PREFIX,
          bucket: s3Config.USER_TEMP_UPLOAD_BUCKET,
          region: s3Config.USER_TEMP_UPLOAD_BUCKET_REGION,
          accessKey: s3Config.USER_TEMP_UPLOAD_BUCKET_ACCESS,
          secretKey: s3Config.USER_TEMP_UPLOAD_BUCKET_SEC,
          successActionStatus: 201
        };

        RNS3.put(file, options).then(response => {
          if (response.status !== 201) {
            throw new Error('Failed to upload image to S3', response);
          }
          console.log('*** BODY ***', response.body);
          // var uploaded_file_key = response.body.postResponse.key;
          this.saveData(response.body.postResponse.key);
          // If image is successfully put in S3 redirect to previous venue screen
          //else show error message
        });
      })
      .catch(err => console.error(err));
  }

  saveData(key) {
    let userIdToken_temp = this.props.screenProps.userToken;
    console.log("Upload start(Saving to DB)");
    console.log("image_url");
    console.log(key);
    console.log("venue");
    console.log(this.props.navigation.state.params.venueKey);
    fetch(BASE_URL, {
      method: 'POST',
      headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + userIdToken_temp
                },
      body: JSON.stringify({
            image_url: key,
            venue: this.props.navigation.state.params.venueKey
        })
    })
    .then((response) => response.json(true))
    .then((responseData) => {
      console.log("received checkIn upload status from server");
      // console.log(JSON.parse(responseData.body));
      // console.log(responseData.body[0]['max_granted']);
      // console.log(typeof(JSON.parse(responseData.body)));
      console.log(responseData);
      this.props.navigation.goBack();
      // this.state.mybadges = JSON.parse(responseData.body);
      // this.setState({mybadges: JSON.parse(responseData.body)});
      // console.log(this.state.mybadges);
      // this.state.mybadges = JSON.parse(responseData.body);
        // console.log(typeof(this.state.mybadges));
    })
    .catch((error) => {
                console.log(error);

                    // Alert.alert('problem while fetching badges data');
                })
    .done();
  }

  render() {
    return (
      <View style={styles.container}>
        <Camera
          ref={(cam) => {
            this.camera = cam;
          }}
          type={Camera.constants.Type.front}
          style={styles.cameraContainer}
          aspect={Camera.constants.Aspect.fill}
          captureAudio={false}
          type={this.state.cameraType}
          mirrorImage={this.state.mirrorMode}
          captureQuality={"medium"}
        />
        <Button
          name="ios-camera-outline"
          size={60}
          backgroundColor="transparent"
          style={{ justifyContent: 'center' }}
          onPress={e => this.takePicture(e)}
        />
        <Button
          name="ios-reverse-camera-outline"
          size={60}
          backgroundColor="transparent"
          style={{ justifyContent: 'center' }}
          onPress={this.changeCameraType.bind(this)}
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

