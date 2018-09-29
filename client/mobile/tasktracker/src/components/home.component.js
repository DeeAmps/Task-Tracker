import React, { Component } from 'react';
import { Container, Header,Body, Title, Right, Button, Icon, Tab, Tabs } from 'native-base';
import AddTaskComponent from "./addTask.component";
import LogTaskComponent from "./logTask.component";
import Auth0 from 'react-native-auth0';
import credentials from  '../../auth0-credentials';

const auth0 = new Auth0(credentials);

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const credentials = navigation.getParam('credentials') || {}; //Get returned credentials from openId login
        this.state = {
            userId : credentials.userId == undefined ? 1 : credentials.userId,
            gauth: credentials.gauth  == undefined ? "" : credentials.gauth
        }
    }

    _onLogout = () => {
        const { navigate } = this.props.navigation;
        auth0.webAuth
        .clearSession({})
        .then(success => {
            navigate('Login')
        })
        .catch(error => console.log(error));

    }

    render(){
        return(
            <Container>
            <Header>
                <Body>
                    <Title style={{backgroundColor: red,alignItems: 'center', alignContent: 'center'}}>Task Tracker</Title>
                </Body>
                <Right>
                    <Button onPress={this._onLogout} transparent>
                        <Icon name='log-out' />
                    </Button>
                </Right>
            </Header>
                <Tabs>
                    <Tab heading="Add Task">
                        <AddTaskComponent userId={this.state.userId} auth={this.state.gauth}/>
                    </Tab>
                    <Tab heading="Log Tasks">
                        <LogTaskComponent userId={this.state.userId} auth={this.state.gauth}/>
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

