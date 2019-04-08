import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Image,
    BackHandler
} from 'react-native'
import {NavigationEvents} from 'react-navigation'

export default class Dashboard extends Component {
    componentDidMount() {
        
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    sceneIsFocus = () => {
        BackHandler.addEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    backToHomeScreen = () => {
        this.props.navigation.navigate('Home')
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
        return true
    }
    render() {
        return (
            <View>
                <NavigationEvents 
                onDidFocus={()=> this.sceneIsFocus()}/>
                <Text>
                    Personal
                </Text>
            </View>
        )
    }
}