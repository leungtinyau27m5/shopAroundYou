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
import Carousel from 'react-native-snap-carousel';

import { serverConn } from '../../queryData/server'
import { geolocation } from '../Component/Auth/Permission'

import { Styles } from '../Component/constants/Styles'
import HeaderNav from '../Component/HeaderNav'

export default class Explore extends Component {
    constructor(props) {
        super()
        this.state = {
            geolocation: null,
            thisWeekData: [
                {
                    shopName: '力生五金',
                    type: '五金行', 
                    imageUri: require('../assets/img/KLB_01.jpg'),
                    text: 'hello1'
                },
                {
                    shopName: 'SHOP',
                    type: '精品',
                    imageUri: require('../assets/img/KLB_02.jpg'),
                    text: 'hello2'
                },
                {
                    shopName: 'The Body Shop',
                    type: '美容/零售',
                    imageUri: require('../assets/img/KLB_03.jpg'),
                    text: 'hello3'
                },
                {
                    shopName: '小店',
                    type: '零售',
                    imageUri: require('../assets/img/KLB_04.jpg'),
                    text: '力生五金'
                },
                {
                    shopName: '雜貨店',
                    type: '雜貨',
                    imageUri: require('../assets/img/KLB_05.jpg'),
                    text: '老式雜貨店, 柴米油鹽醬醋茶芝麻綠豆花膠冬菇'
                },
            ]
        }
        this.googleMap = null
        this._carousel = null
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
    carouselIsClicked = (index) => {
        if (index == this._carousel.currentIndex)
            console.log('innnnn')
        else
            this._carousel.snapToItem(index)
    }
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={Styles.slide}
                onPress={() => { 
                //this._carousel.snapToItem(index)
                this.carouselIsClicked(index)
              }}
            >
                <View style={Styles.card}>
                    <Image
                        style={Styles.cardImage}
                        source={item.imageUri}
                    />
                    <View style={Styles.title}>
                        <Text style={[Styles.cardText, {fontSize: 18}]}>{item.shopName}</Text>
                        <Text style={Styles.cardText}>
                            {item.text}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
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
                    <Carousel
                        ref={(c) => { this._carousel = c }}
                        data={this.state.thisWeekData}
                        renderItem={this._renderItem}
                        sliderWidth={screenWidth}
                        //layout={'tinder'}
                        //layoutCardOffset={9}
                        sliderHeight={300}
                        itemWidth={screenWidth * 0.7}
                        itemHeight={256}
                        firstItem={0}
                        //onScroll={(index) => console.log(index)}
                    />
                </View>
            </View>
        )
    }
}