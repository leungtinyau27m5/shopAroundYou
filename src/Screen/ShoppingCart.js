import React, { Component } from 'react'
import {
    View,
    Text,
    BackHandler
} from 'react-native'
import {NavigationEvents} from 'react-navigation'

export default class ShoppingCart extends Component {
    componentDidMount() {
        
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
    }

    backToHomeScreen = () => {
        this.props.navigation.navigate('Home')
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
        return true
    }
    sceneIsFocus = () => {
        BackHandler.addEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    render() {
        return (
            <View>
                <NavigationEvents 
                onDidFocus={()=> this.sceneIsFocus()}/>
                <Text>
                    ShoppingCart
                </Text>
            </View>
        )
    }
}