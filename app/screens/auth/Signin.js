import React, { Component } from 'react';
import { ScrollView, StyleSheet, Text, View, AsyncStorage, TextInput } from 'react-native';
import { FormLabel, FormInput, Tile, List, ListItem, Button, FormValidationMessage } from 'react-native-elements';
import config from '../../config/params.js';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool
} from '../../lib/aws-cognito-identity';
export let theUserToken = '';

class Signin extends Component {

    constructor(props) {
        super(props);
        const { params } = this.props.navigation.state;

        console.log("Inside login constructor");
        console.log("Inside login constructor: props");
        console.dir(props);
        console.log("Inside login constructor: params");
        console.dir(params);

        this.loading = false;
        this.state = {
            username: '',
            password: '',
            loading: false,
        };
    }

    componentDidMount(){
        AsyncStorage.getItem("@theUserToken").then(value => {
            if(value == null){
                 this.state.loading = false;
                 console.log("User not Logged In");
            }
            else
            {
                console.log("User Already Logged In - redirect to next intended state");
                console.log("Token: ");
                console.log(value);
            }}) // Add some error handling, also you can simply do this.setState({fistLaunch: value == null})
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
                onSuccess: (result) => resolve(
                    result.getIdToken().getJwtToken()
                    ),
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
            const storeUserToken = await AsyncStorage.setItem("@theUserToken", theUserToken)
            /* Give Rest API call here - create or update user */
            this.props.navigation.navigate('ImageMap', {}, {
                type: "Navigation/NAVIGATE", 
                routeName: "ImageMap", 
                params: {venueKey: "Venue12"}
            });
        }
        catch(e) {
            console.log('login error occublue');
            console.log(e);
            this.setState(function(prevState, props){
                return {loading: !prevState.loading}
            });
        }
    }

    render() {
        return (
            <View>
                <FormValidationMessage>
                  {'Username or Password is invalid'}
                </FormValidationMessage>
                <FormLabel>Email</FormLabel>
                <FormInput id="email" type="email" onChangeText={(text) => this.setState({username: text})}/>
                <FormLabel>Password</FormLabel>
                <FormInput id="password" type="password" onChangeText={(text) => this.setState({password: text})}/>
                {this.state.loading ?
                    <Text>Loading...</Text>
                    : !this.props.userToken ?
                    <Button
                        buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
                        onPress={this.handleSubmit}
                        textStyle={{textAlign: 'center'}}
                        title={`Login`}
                    />

                    :
                    <Button
                        raised
                        icon={{name: 'home', size: 32}}
                        buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
                        onPress={() => this.props.navigation.navigate('Home')}
                        textStyle={{textAlign: 'center'}}
                        title={`Logged in`}
                    />
                }

                    <Button
                        buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
                        onPress={() => this.props.navigation.navigate('StartTour')}
                        textStyle={{textAlign: 'center'}}
                        title={`StartTour Screen`}
                    />
                    <Button
                        buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
                        onPress={() => this.props.navigation.navigate('SignUp')}
                        textStyle={{textAlign: 'center'}}
                        title={`SignUp Screen`}
                    />
                    <Button
                        buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
                        onPress={() => this.props.navigation.navigate('Snaps')}
                        textStyle={{textAlign: 'center'}}
                        title={`Snaps - Take a picture`}
                    />

            </View>
        )
    }
}

export default Signin;
