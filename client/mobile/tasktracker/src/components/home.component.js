import React, { Component } from 'react';
import { Container, Header, Body, Button, Icon, Right, Tab, Tabs, Title } from 'native-base';
import AddTaskComponent from "./addTask.component";
import LogTaskComponent from "./logTask.component";

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        const { navigation } = this.props;
        const credentials = navigation.getParam('credentials'); //Get returned credentials from openId login
        this.state = {
            userId : credentials.userId,
            gauth: credentials.gauth
        }
    }
    render() {
        return (
            <Container>
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

