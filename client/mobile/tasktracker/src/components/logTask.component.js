import React, { Component } from 'react';
import { Container, Text, Body, Right, List, ListItem, Content } from 'native-base';
import { getUserTasks } from "../service/api.service"

export default class LogTaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: []
        }
    }

    _showToast = (message) => {
        Toast.show({
            text: message,
            buttonText: "Okay",
            position: "bottom"
        })
    }

    componentDidMount(){
        getUserTasks(this.props.userId, this.props.auth)
        .then((response) => {
            if(response.data.success){
                this.setState({tasks: response.data.tasks});
            }
        })
        .catch((error) => {
            this._showToast("An error occurred! Kindly contact support")
        });
    }

    render() {
        return (
            <Container>
            <Content>
                <List>
                    {this.state.tasks.length > 0 ? this.state.tasks.map((task) => {
                        <ListItem>
                            <Body>
                                <Text>{task.task}</Text>
                                <Text note>Time => From {task.startTime} GMT to {task.endTime} GMT</Text>
                            </Body>
                            <Right>
                                <Text note>Task Log Date - {task.taskDate}</Text>
                            </Right>
                        </ListItem>
                    }) : <Text style={{margin: 40}}>You have no Logged Tasks</Text>}
                </List>
            </Content>
            </Container>
        );
    }
}

