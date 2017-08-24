import React, { Component } from 'react';
import { ScrollView, Image } from 'react-native';
import { UserCheckIns } from '../config/sampleSnapImages';
class Snaps extends Component {
  constructor(props)
  {
    super(props);
    this.state = {
      userCheckIns: UserCheckIns
    };
  }

  render() {
    return (
      <ScrollView>
      {
        this.state.userCheckIns.map(userCheckIn => (
          <Image
            key={userCheckIn.key}
            style={{
              height: 200,
              width: 200
            }}
            source={{ uri: userCheckIn.url, cache: 'force-cache'}}
          />
        ))
      }
      </ScrollView>
    );
  }
}

export default Snaps;
