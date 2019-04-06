import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Image,
    BackHandler
} from 'react-native'
import { WebView } from 'react-native-webview'
import { serverConn } from '../../queryData/server'
import { geolocation } from '../Component/Auth/Permission'

export default class Explore extends Component {
    constructor(props) {
        super()
        this.state = {
            geolocation: null
        }
        this.googleMap = null
        geolocation()
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    backToHomeScreen = () => {
        this.props.navigation.navigate('Home')
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
        return true
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
    addMessage(msg) {
        console.log('hellllllo')
        this.setState({
            text: 'asdf'
        })
    }
    render() {
        return (
            <View style={{height: '100%'}}>
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
        )
    }
}