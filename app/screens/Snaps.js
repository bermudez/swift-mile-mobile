import React, { Component } from 'react';
import { ScrollView, Image, AsyncStorage, View, BackgroundImage, StyleSheet, Dimensions } from 'react-native';
import { UserCheckIns } from '../config/sampleSnapImages';
import { invokeApig } from '../lib/awsLib';

const deviceWidth = Dimensions.get('window').width;
const deviceHeight = Dimensions.get('window').height;

class Snaps extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      userCheckIns: UserCheckIns
    };
  }

  componentDidMount(){

    AsyncStorage.getItem("@theUserToken").then(value => {
      if(value == null){
         console.log("User not Logged In");
         // this.props.navigation.navigate('Signin', {});
      }
      else
      {
        console.log("User Already Logged In - redirect to next intended state");
        console.log("Token: ");
        console.log(value);

          try {
              let resultdata = this.getUser(value);
              console.log("ResultData - start");
            //   resultdata.then(onSuccess: (result) => resolve(
            //         alert(result)
            //         ),
            //     onFailure: (err) => reject(err),
            // );
              console.log("ResultData - end");
            }
            catch(e) {
              alert(e);
              this.setState({ isLoading: false });
            }


      }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
  }

  getUser(theUserToken)
  {
    let data = invokeApig({
      path: 'users/',
      method: 'GET',
      body: '',
    }, theUserToken);

    return data;
  }

  render() {
    return (
      <ScrollView>
      <View style={styles.container}>
      {
        this.state.userCheckIns.map(userCheckIn => (
          <View 
            key={userCheckIn.key}
            style={styles.checkin_wrapper}
          >
          <Image
            style={ styles.checkinImage }
            source={{ uri: userCheckIn.url, cache: 'force-cache'}}
          />
          </View>
        ))
      }
      </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  badge_title:{
    fontSize: 19,
    fontWeight: 'bold',
  },
  checkin_wrapper:{
    width: 200,
    height: 200,
    padding: 20,
    margin: 20,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#d6d7da',
    borderColor: '#d6d7da'

  },
  checkinImage:{
    width: 160,
    height: 160
  }
});

export default Snaps;
