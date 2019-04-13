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
import Modal from 'react-native-modal'
import Spinner from 'react-native-loading-spinner-overlay'
import BackgroundTimer from 'react-native-background-timer'

import { serverConn } from '../Server/config'
import { geolocation } from '../Component/Auth/Permission'

import HeaderNav from '../Component/HeaderNav'
import ExCarousel from './Explore/ExCarousel'
import Filter from '../Component/Explore/Filter'

export default class Explore extends Component {
    constructor(props) {
        super()
        this.state = {
            isLoading: false,
            geolocation: null,
            filterModalIsVisible: false,
            firstTime: true,
            isShowShop: false
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
        console.log(msg)
        //console.log('hellllllo')
        this.setState({
            text: 'asdf'
        })
    }
    showFilterModal = () => {
        this.setState((prevState) => ({
            filterModalIsVisible: !prevState.filterModalIsVisible
        }))
    }
    doFiltering = (filterItems) => {
        this.setState({
            isLoading: true
        })
        console.log(filterItems.myAddress == null)
        /*
        if (filterItems.myAddress == null) 
            if (this.state.firstTime)
                this.locateMyPosition()*/
        const counter = BackgroundTimer.setTimeout(() => {
            const request = {
                requestType: 'filterShops',
                details: filterItems
            }
            console.log('my request to filter items', request)
            this.googleMap.postMessage(JSON.stringify(request))
            this.setState({
                isLoading: false,
                firstTime: false,
                isShowShop: true
            }, () => {
                this.showFilterModal()
            })
        }, 2000)
    }
    locateMyPosition = async() => {
        if (this.state.geolocation == null) {
            const locationJson = await AsyncStorage.getItem('location')
            if (locationJson !== null) 
                location = JSON.parse(locationJson)
            else 
                ToastAndroid('Location Permission is not granted')
            this.setState({
                geolocation: location,
                isShowShop: true
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
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading .... '}
                    textStyle={{fontSize: 20, color: '#333'}}
                    color={'#333'}
                />
                <HeaderNav
                    filterResult={this.showFilterModal}
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
                <View style={[{flex: 1}, this.state.isShowShop !== false ? {display: 'flex'} : {display: 'none'}]}>
                    <ExCarousel 
                    
                    />
                </View>
                <Modal
                    isVisible={this.state.filterModalIsVisible} 
                    onBackdropPress={() => this.showFilterModal()}
                    onBackButtonPress={() => {this.setState({ filterModalIsVisible: false })}}
                >
                    <Filter
                        doFiltering={this.doFiltering}
                        showFilterModal={this.showFilterModal}
                        locateMyPosition={this.locateMyPosition}
                    />
                </Modal>
            </View>
        )
    }
}