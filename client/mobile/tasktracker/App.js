import React from 'react';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from "./src/components/login.component"
import HomeScreen from "./src/components/home.component"

export default class App extends React.Component {
  render() {
    return <RootStack />;
  }
}

const RootStack = createStackNavigator(
  {
    Home:  HomeScreen,
    Login:  LoginScreen
  },
  {
    headerMode: 'none',
    navigationOptions: {
        headerVisible: false,
    }
},
  {
    initialRouteName: 'Login',
  });