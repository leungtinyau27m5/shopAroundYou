import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { createSwitchNavigator } from 'react-navigation'

import Home from '../../src/Screen/Home'

const HomeSwitchNav = createSwitchNavigator({
    Home: {
        screen: Home
    }
})

export default class HomeSwitch extends Component {
    static router = HomeSwitchNav.router
    constructor(props) {
        super()
    }
    render() {
        const { navigation } = this.props
        return (
            <HomeSwitchNav navigation={ navigation }/>
        )
    }
}