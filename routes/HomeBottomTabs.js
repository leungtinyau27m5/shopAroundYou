import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Image,
} from 'react-native'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HomeSwtich from './Swtich/HomeSwitch'
import Dashboard from '../src/Screen/Dashboard'
import Explore from '../src/Screen/Explore'
import CartSwitch from './Swtich/ShoppingCartSwitch'

const MaterialBottomTabs = createMaterialBottomTabNavigator({
    Home: { 
        screen: HomeSwtich,
        navigationOptions: ({ navigation }) => ({
            title: 'Home',
            tabBarColor: '#FF9800'
        })
    },
    Explore: { 
        screen: Explore,
        navigationOptions: ({ navigation }) => ({
            title: 'Explore',
            tabBarColor: '#007ACC'
        })
    },
    ShoppingCart: { 
        screen: CartSwitch,
        navigationOptions: ({ navigation }) => ({
            title: 'Cart',
            tabBarColor: '#FF1188'
        })
    },
    Dashboard: { 
        screen: Dashboard,
        navigationOptions: ({ navigation }) => ({
            title: 'Dashboard',
            tabBarColor: '#159F5C'
        })
    },
}, {
    initialRouteName: 'Home',
    shifting: true,
    activeTintColor: '#FFFFFF',
    activeColor: '#F0EDF6',
    backBehavior: false,
    //inactiveColor: '#3e2465',
    defaultNavigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, horizontal, tintColor }) => {
            const { routeName } = navigation.state;
            let IconComponent = Ionicons;
            let iconName;
            if (routeName === 'Home') {
                iconName='md-home'
            } else if (routeName === 'Dashboard') {
                iconName='ios-options'
            } else if (routeName === 'ShoppingCart') {
                iconName='md-cart'
            } else if (routeName === 'Explore') {
                iconName='md-search'
            }
            return <IconComponent name={ iconName } size={ 25 } color={ tintColor } />
        }
    })
})
export default class HomeBottomTabs extends Component {
    static router = MaterialBottomTabs.router
    render() {
        const { navigation } = this.props
        return (
            <MaterialBottomTabs navigation={ navigation }/>
        )
    }
}