import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
import { Tile, List, ListItem, FormLabel, FormInput, Button } from 'react-native-elements';
import config from '../../config/params.js';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool
} from '../../lib/aws-cognito-identity';


class SignUp extends Component {
    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: '',
            isLoading: false,
            confirmPassword: '',
            confirmationCode: '',
            newUser: null
        };
    }

    signup(username, password) {
      console.log("Cognito User Pool: ");
      console.log(config.cognito.USER_POOL_ID);
      console.log("Cognito APP_CLIENT_ID: ");
      console.log(config.cognito.APP_CLIENT_ID);
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });
        const attributeEmail = new CognitoUserAttribute({ Name : 'email', Value : username });

        return new Promise((resolve, reject) => (
            userPool.signUp(username, password, [attributeEmail], null, (err, result) => {
                if (err) {
                  console.log("SignUp - Error: ");
                  alert(err);
                    reject(err);
                    return;
                }

                resolve(result.user);
            })
        ));
    }

    authenticate(user, username, password) {
        const authenticationData = {
            Username: username,
            Password: password
        };
        const authenticationDetails = new AuthenticationDetails(authenticationData);

        return new Promise((resolve, reject) => (
            user.authenticateUser(authenticationDetails, {
                onSuccess: (result) => resolve(result.getIdToken().getJwtToken()),
                onFailure: (err) => reject(err),
            })
        ));
    }

    confirm(user, confirmationCode) {
        return new Promise((resolve, reject) => (
            user.confirmRegistration(confirmationCode, true, function(err, result) {
                if (err) {
                    reject(err);
                    return;
                }
                resolve(result);
            })
        ));
    }

    handleConfirmationSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            await this.confirm(this.state.newUser, this.state.confirmationCode);
            const userToken = await this.authenticate(
                this.state.newUser,
                this.state.username,
                this.state.password
            );

            // this.props.updateUserToken(userToken);
            console.log("UserToken");
            alert(userToken);
            console.log(userToken);
            this.props.navigation.navigate('Signin');
        }
        catch(e) {
            alert(e);
            this.setState({ isLoading: false });
        }
    }

    validateForm() {
        return this.state.username.length > 0
            && this.state.password.length > 0
            && this.state.password === this.state.confirmPassword;
    }

    validateConfirmationForm() {
        return this.state.confirmationCode.length > 0;
    }

    handleSubmit = async (event) => {
        event.preventDefault();

        this.setState({ isLoading: true });

        try {
            const newUser = await this.signup(this.state.username, this.state.password);
            this.setState({
                newUser: newUser
            });
        }
        catch(e) {
          alert("Error throwm");
            alert(e);
        }

        this.setState({ isLoading: false });
    }

    render() {
        return (
            <View>
                { this.state.newUser === null
                    ? <View>
                        <FormLabel>Email</FormLabel>
                        <FormInput id="email" type="email" value={this.state.email} onChangeText={(text) => this.setState({username: text})} />
                        <FormLabel>Password</FormLabel>
                        <FormInput id="password" type="password" value={this.state.password} onChangeText={(text) => this.setState({password: text})} />
                        <FormLabel>Confirm Password</FormLabel>
                        <FormInput id="confirmPassword" type="password" value={this.state.confirmPassword} onChangeText={(text) => this.setState({confirmPassword: text})} />
                        <Button
                            raised
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
                            onPress={this.handleSubmit}
                            textStyle={{textAlign: 'center'}}
                            title={`Signup`}
                        />
                        <Button
                            onPress={() => this.props.navigation.navigate('Signin')}
                            textStyle={{textAlign: 'center'}}
                            title={`Signin`}
                        />
                    </View>
                    :
                    <View>
                        <FormLabel>Confirmation Code</FormLabel>
                        <FormInput id="confirmationCode" value={this.state.confirmationCode} onChangeText={(text) => this.setState({confirmationCode: text})} />
                        <Button
                            raised
                            buttonStyle={{backgroundColor: 'blue', borderRadius: 10, margin: 10}}
                            onPress={this.handleConfirmationSubmit}
                            textStyle={{textAlign: 'center'}}
                            title={`Confirm`}
                        />
                    </View>
                }
                <Button
                    onPress={() => this.props.navigation.navigate('ImageMap')}
                    textStyle={{textAlign: 'center'}}
                    title={`Skip-to-Map`}
                />
            </View>
        )
    }
}

export default SignUp;
