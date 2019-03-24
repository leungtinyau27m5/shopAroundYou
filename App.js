import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View
} from 'react-native';
import { createAppContainer } from 'react-navigation'

import HomeBottomTabs from './routes/HomeBottomTabs'

const AppContainer = createAppContainer(HomeBottomTabs)
export default class App extends Component {
  testServer = () => {
    const url = 'http://192.168.0.103/IS/test.php';
    const data = {
      c: 'byebyelala'
    }
    fetch(url, {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .then(res=>console.error(JSON.stringify(res)))
    .catch(error => console.error(error))
    /*
    fetch('http://192.168.0.103:80/IS/User_group/shopKeeper.php')
    .then(function (res) {
      if (res.status !== 200) {
        console.error('Looks like there was a problem. Status Code: ' + res.status)
        return
      }
      res.json().then(function(data) {
        console.error(data)
      })
    })
    .catch(function(err) {
      console.error('Fecht Error: -s', err)
    })*/
  }

  render() {
    return (
      <AppContainer />
    );
  }
}

