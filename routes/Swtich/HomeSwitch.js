import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { createSwitchNavigator } from 'react-navigation'

import Home from '../../src/Screen/Home'

const HomeSwithcNav = createSwitchNavigator({
    Home: {
        screen: Home
    }
})

export default class HomeSwitch extends Component {
    static router = HomeSwithcNav.router
    constructor(props) {
        super()
    }
    render() {
        const { navigation } = this.props
        return (
            <HomeSwithcNav navigation={ navigation }/>
        )
    }
}