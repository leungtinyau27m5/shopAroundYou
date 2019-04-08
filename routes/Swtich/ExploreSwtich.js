import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { createSwitchNavigator } from 'react-navigation'

import Explore from '../../src/Screen/Explore'

const ExploreSwitchNav = createSwitchNavigator({
    Explore: {
        screen: Explore
    }
})

export default class ExploreSwtich extends Component {
    static router = ExploreSwitchNav.router
    constructor(props) {
        super()
    }
    render() {
        const { navigation } = this.props
        return (
            <ExploreSwitchNav navigation={ navigation }/>
        )
    }
}