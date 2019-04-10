import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    BackHandler,
    Dimensions,
    TouchableOpacity,
} from 'react-native'
import { WebView } from 'react-native-webview'
import {NavigationEvents} from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';

import { serverConn } from '../../queryData/server'
import { geolocation } from '../Component/Auth/Permission'

import { Styles } from '../Component/constants/Styles'
import HeaderNav from '../Component/HeaderNav'
import DefaultRect from '../Component/carousel/DefaultRect'

export default class Explore extends Component {
    constructor(props) {
        super()
        this.state = {
            geolocation: null,
        }
        this.googleMap = null
        geolocation()
    }
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
    addMessage(msg) {
        console.log('hellllllo')
        this.setState({
            text: 'asdf'
        })
    }
    filterResult = () => {
        
    }
    locateMyPosition = async() => {
        if (this.state.geolocation == null) {
            const locationJson = await AsyncStorage.getItem('location')
            if (locationJson !== null) 
                location = JSON.parse(locationJson)
            else 
                ToastAndroid('Location Permission is not granted')
            this.setState({
                geolocation: location
            }, () => {
                const request = {
                    requestType: 'myLocation',
                    details: {
                        location: location
                    }
                }
                this.googleMap.postMessage(JSON.stringify(request))
            })
        } else {
            const request = {
                requestType: 'myLocation',
                details: {
                    location: this.state.geolocation
                }
            }
            this.googleMap.postMessage(JSON.stringify(request))
        }
    }
    onSearch = () => {
        
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        return (
            <View style={{height: '100%'}}>
                <NavigationEvents 
                onDidFocus={()=> this.sceneIsFocus()}/>
                <HeaderNav
                    filterResult={this.filterResult}
                    locateMyPosition={this.locateMyPosition}
                    //searchScreen={this.onSearch}
                />
                <View style={{flex: 1}}>
                    <WebView 
                        ref={(webView) => this.googleMap = webView}
                        style={{ height: '100%'}}
                        javaScriptEnabled={true}
                        source={{ uri: serverConn.serverGoogleMapUri }}
                        onMessage={event => {
                            this.addMessage(event.nativeEvent.data)
                        }}
                    />
                </View>
                <View style={[{flex: 1}, this.state.geolocation !== null ? {display: 'flex'} : {display: 'none'}]}>
                    <DefaultRect />
                </View>
            </View>
        )
    }
}