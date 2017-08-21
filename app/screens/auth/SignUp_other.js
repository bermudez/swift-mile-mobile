import React from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { FormLabel, FormInput, Button } from 'react-native-elements';
import config from './config.js';
import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserAttribute,
    CognitoUserPool
} from './lib/aws-cognito-identity';


export class Signup extends React.Component {
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
        const userPool = new CognitoUserPool({
            UserPoolId: config.cognito.USER_POOL_ID,
            ClientId: config.cognito.APP_CLIENT_ID
        });
        const attributeEmail = new CognitoUserAttribute({ Name : 'email', Value : username });

        return new Promise((resolve, reject) => (
            userPool.signUp(username, password, [attributeEmail], null, (err, result) => {
                if (err) {
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

            this.props.updateUserToken(userToken);
            this.props.navigation.navigate('Home');
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
                            icon={{name: 'home', size: 32}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 10, margin: 10}}
                            onPress={this.handleSubmit}
                            textStyle={{textAlign: 'center'}}
                            title={`Signup`}
                        />
                    </View>
                    :
                    <View>
                        <FormLabel>Confirmation Code</FormLabel>
                        <FormInput id="confirmationCode" value={this.state.confirmationCode} onChangeText={(text) => this.setState({confirmationCode: text})} />
                        <Button
                            raised
                            icon={{name: 'home', size: 32}}
                            buttonStyle={{backgroundColor: 'red', borderRadius: 10, margin: 10}}
                            onPress={this.handleConfirmationSubmit}
                            textStyle={{textAlign: 'center'}}
                            title={`Confirm`}
                        />
                    </View>
                }
            </View>
        )
    }
}
