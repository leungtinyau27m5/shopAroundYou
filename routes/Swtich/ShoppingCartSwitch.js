import React, { Component } from 'react'
import {
    View,
    Text,
    Button
} from 'react-native'
import { createSwitchNavigator } from 'react-navigation'

import ShoppingCart from '../../src/Screen/ShoppingCart'

const CartSwiwtchNav = createSwitchNavigator({
    ShoppingCart: {
        screen: ShoppingCart
    }
})

export default class HomeSwitch extends Component {
    static router = CartSwiwtchNav.router
    constructor(props) {
        super()
    }
    render() {
        const { navigation } = this.props
        return (
            <CartSwiwtchNav navigation={ navigation }/>
        )
    }
}