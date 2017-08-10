import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import config from './config.js';
export let theUserToken = '';

import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool
} from './lib/aws-cognito-identity';

export class Login extends React.Component {
    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        this.loading = false;
        this.state = {
            username: '',
            password: '',
            loading: false,
        };
    }

    login(username, password) {
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });
        const authenticationData = {
            Username: username,
            Password: password
        };

        const user = new CognitoUser({ Username: username, Pool: userPool });
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        return new Promise((resolve, reject) => (
            user.authenticateUser(authenticationDetails, {
                onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
                onFailure: (err) => reject(err),
            })
        ));
    }

    validateForm() {
        return this.state.username.length > 0
            && this.state.password.length > 0;
    }

    handleSubmit = async (event) => {
        this.setState(function(prevState, props){
            return {loading: !prevState.loading}
        });
        try {
            const userToken = await this.login(this.state.username, this.state.password);
            console.log('a user token for loggin in', userToken);
            theUserToken = userToken;
            this.props.navigation.navigate('Home');
        }
        catch(e) {
            console.log('login error occured');
            console.log(e);
            this.setState(function(prevState, props){
                return {loading: !prevState.loading}
            });
        }
    }

    render() {
        return (
            <View>
                <FormLabel>Email</FormLabel>
                <FormInput id="email" type="email" onChangeText={(text) => this.setState({username: text})}/>
                <FormLabel>Password</FormLabel>
                <FormInput id="password" type="password" onChangeText={(text) => this.setState({password: text})}/>
                {this.state.loading ?
                    <Text>Loading...</Text>
                    : !this.props.userToken ?
                    <Button
                        raised
                        icon={{name: 'home', size: 32}}
                        buttonStyle={{backgroundColor: 'red', borderRadius: 10, margin: 10}}
                        onPress={this.handleSubmit}
                        textStyle={{textAlign: 'center'}}
                        title={`Login`}
                    />
                    :
                    <Button
                        raised
                        icon={{name: 'home', size: 32}}
                        buttonStyle={{backgroundColor: 'red', borderRadius: 10, margin: 10}}
                        onPress={() => this.props.navigation.navigate('Home')}
                        textStyle={{textAlign: 'center'}}
                        title={`Logged in`}
                    />
                }
            </View>
        )
    }
}
