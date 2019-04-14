import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { 
    createSwitchNavigator,
    createStackNavigator
} from 'react-navigation'

import Explore from '../../src/Screen/Explore'
//import ViewShop from '../../src/Screen/Explores/ViewShop'
import ViewShop from '../../src/Screen/Explore/ViewShop'

const ExploreSwitchNav = createStackNavigator({
    Explore: {
        screen: Explore,
    },
    ViewShop: {
        screen: ViewShop
    }
}, {

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