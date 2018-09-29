import React, { Component } from 'react';
import { Container, Icon, Content, Input, Item, Text, Col, Button, Grid, Row} from 'native-base';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { addUserTask } from "../service/api.service"

export default class AddTaskScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDateTimePickerVisible: false,
            type: '',
            endTime: '',
            startTime: '',
            task: '',
            submitted: false
        };
    }

    _showDateTimePicker = (type) => {
        this.setState({ isDateTimePickerVisible: true, type})
    };

    _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

    _handleDatePicked = (time) => {
        if(this.state.type == "StartTime"){
            this.setState({ startTime: time.toTimeString() })
        }
        else{
            this.setState({ endTime: time.toTimeString() })
        }
        this._hideDateTimePicker();
    };

    _handleTaskInputChange = (e) => {
        this.setState({ [e.target.name] : e.target.value })
    }

    _showToast = (message) => {
        Toast.show({
            text: message,
            buttonText: "Okay",
            position: "bottom"
        })
    }
    

    _submitTask = () => {
        this.setState({ submitted: true })
        let userTask = {
            task: this.state.task,
            taskStartTime: this.state.startTime,
            taskEndTime: this.state.endTime,
            UserId: this.props.userId,
            Auth: this.props.auth
        }
        addUserTask(userTask)
        .then((response) => {
            this._showToast("Task added succesfully!")
            this.setState({ 
                type: '',
                endTime: '',
                startTime: '',
                task: '',
                submitted: false
            })
        })
        .catch((error) => {
            this._showToast("Task addition failed!")
            console.log(error);
        });
    }

    render() {
        return (
                <Container>
                    <Content style={{margin: 20}}>
                        <Item regular>
                            <Input name="task" onChange={this.handleTaskInputChange} placeholder='Add Task' />
                        </Item>
                        <Item style={{marginTop: 15}} regular>
                            <Input value={this.state.startTime} disabled placeholder='Task Start Time' />
                        </Item>
                        <Item style={{marginTop: 15}} regular>
                            <Input value={this.state.endTime} disabled placeholder='Task End Time' />
                        </Item>
                        <Grid style={{marginTop: 15}}>
                            <Row>
                                <Col>
                                <Button onPress={() => this._showDateTimePicker("StartTime")} info iconRight>
                                    <Text>Start Time</Text>
                                    <Icon name='time' />
                                </Button>
                                </Col>
                                <Col>
                                    { this.state.submitted ? <Spinner color='red' /> : "" }  
                                </Col>
                                <Col>
                                <Button onPress={() => this._showDateTimePicker("EndTime")} info iconRight>
                                    <Text>End Time</Text>
                                    <Icon name='time' />
                                </Button>
                                </Col>
                            </Row>
                        </Grid>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={this._hideDateTimePicker}
                            mode="time"
                        />
                        <Button onPress={this.submitTask} style={{marginTop: 15}} full>
                            <Text>Submit Task</Text>
                        </Button>
                    </Content>
                </Container>
        );
    }
}

