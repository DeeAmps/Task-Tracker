import React, { Component } from 'react';
import {
Button,
StyleSheet,
Text,
Image,
View
} from 'react-native';
import { loggedInUser } from "../service/api.service"
import Auth0 from 'react-native-auth0';
import credentials from  '../../auth0-credentials';

const auth0 = new Auth0(credentials);


export default class LoginScreen extends Component {
    constructor(props) {
        super(props);    
    }

    _onLogin = () => {
        const { navigate } = this.props.navigation;
        auth0.webAuth
            .authorize({
            scope: 'openid profile',
            audience: 'https://' + credentials.domain + '/userinfo'
            })
            .then(credentials => {
                loggedInUser(credentials)
                .then((response) => {
                    navigate('Home', { 'credentials': response.data})
                })
                .catch((error) => {
                    console.log(error);
                });
                
            })
            .catch(error => console.log(error));
    };

    render() {
        return (
            <View style={{padding: 20, marginTop: 60}}>
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require("../images/login.png")}  
                    style={{ width:155, height:155}}/>
                </View>
                
                <Text style={styles.header}>Task Tracker</Text>
                <Button
                    onPress={this._onLogin}
                    title='Proceed'
                    style={{margin:20}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    header: {
    fontSize: 30,
    textAlign: 'center',
    margin: 10
    }
});