import React, { Component } from 'react'
import {
    View,
    Text,
    BackHandler
} from 'react-native'

export default class ShoppingCart extends Component {
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    backToHomeScreen = () => {
        this.props.navigation.navigate('Home')
        return true
    }
    render() {
        return (
            <View>
                <Text>
                    ShoppingCart
                </Text>
            </View>
        )
    }
}