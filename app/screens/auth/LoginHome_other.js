import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import config from './config.js';
import { Login } from './login';
import { Signup } from './signup';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool
} from './lib/aws-cognito-identity';

export class Lander extends React.Component {
    constructor(props) {
        super(props);
        console.log('userToken lander', this.props.userToken)
    }

    render() {
        return (
            <View>
                {!this.props.userToken ?
                    <View>
                        <Button
                            raised
                            icon={{name: 'home', size: 32}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 10, margin: 10}}
                            onPress={() => this.props.navigation.navigate('Login')}
                            textStyle={{textAlign: 'center'}}
                            title={`Login`}
                        />
                        < Button
                            raised
                            icon={{name: 'home', size: 32}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 10, margin: 10}}
                            onPress={() => this.props.navigation.navigate('Signup')}
                            textStyle={{textAlign: 'center'}}
                            title={`Signup`}
                        />
                    </View>
                :
                    <View>
                        <Button
                            raised
                            icon={{name: 'home', size: 32}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 10, margin: 10}}
                            onPress={() => this.props.navigation.navigate('Movies')}
                            textStyle={{textAlign: 'center'}}
                            title={`Proceed`}
                        />
                        < Button
                            raised
                            icon={{name: 'home', size: 32}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 10, margin: 10}}
                            onPress={() => this.props.navigation.navigate('Recommendations')}
                            textStyle={{textAlign: 'center'}}
                            title={`Recommendations`}
                        />
                        <Button
                            raised
                            icon={{name: 'home', size: 32}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 10, margin: 10}}
                            onPress={() => this.props.navigation.navigate('WatchList')}
                            textStyle={{textAlign: 'center'}}
                            title={`Watch List`}
                        />
                    </View>    
                }
            </View>
        )
    }
}
