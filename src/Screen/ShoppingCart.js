import React, { Component } from 'react'
import {
    View,
    Text,
    BackHandler,
    StyleSheet,
    Dimensions,
    ScrollView
} from 'react-native'
import {NavigationEvents} from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'

export default class ShoppingCart extends Component {
    constructor(props) {
        super()
        this.state = {
            products: null,
            isCart: true,
            isLoading: false
        }
        console.log('hello schopping cart screen')
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
    }

    backToHomeScreen = () => {
        this.props.navigation.navigate('Home')
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
        return true
    }
    _sceneIsFocus = () => {
        BackHandler.addEventListener('hardwareBackPress', this.backToHomeScreen)
        this._getProducts()
    }
    _getProducts = async() => {
        this.setState({
            isLoading: true
        })
        let products = []
        await AsyncStorage.getAllKeys().then((keys) => {
            AsyncStorage.multiGet(keys).then((result) => {
                result.map((ele, index) => {
                    if (ele[0] !== 'filterItems' && ele[0] !== 'location' && ele[0] !== 'personalData' && ele[0] !== 'myIcon') {
                        products.push(JSON.parse(ele[1]))
                    }
                })
                this._productsReady(products)
                /*
                result.map((req) => req.forEach((ele, index) => {
                    console.log(req[0])
                }))*/
            })
        })
    }
    _productsReady = (products) => {
        this.setState({
            products: products,
            isLoading: false
        })
    }
    _scrollEvent = (event) => {
        const num = Math.floor(event.nativeEvent.contentOffset.x)
        if (num == 0) {
            this.setState({
                isCart: true
            })
        } else {
            this.setState({
                isCart: false
            })
        }
    }
    _renderCartPage = (products) => {
        if (products == null) return (<View></View>)

        let newArr = products.map((ele, index) => {
            if (ele.isInCart) {
                return (
                    <Text>{ele.detail.product_name}</Text>
                )
            }
        })
        return newArr
    }
    _renderLovePage = (products) => {
        if (products == null) return (<View></View>)
        let newArr = products.map((ele, index) => {
            console.log(ele.isLoved)
            if (ele.isLoved) {
                return (
                    <Text>{ele.detail.product_name}</Text>
                )
            }
        })
        return newArr
    }
    render() {
        const { products } = this.state

        return (
            <View>
                <NavigationEvents 
                onDidFocus={()=> this._sceneIsFocus()}/>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading .... '}
                    textStyle={{fontSize: 20, color: '#333'}}
                    color={'#333'}
                />
                <View style={styles.titleContainer}>
                    <Text style={styles.titleText}>Shopping Cart</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                }}>
                    <View style={[styles.tabs, this.state.isCart ? styles.tabIsOn : styles.tabIsOff ]}>
                        <Text style={[styles.tabText, this.state.isCart ? styles.tabTextIsOn : styles.tabTextIsOff]}>Cart</Text>
                    </View>
                    <View style={[styles.tabs, !this.state.isCart ? styles.tabIsOn : styles.tabIsOff ]}>
                        <Text style={[styles.tabText, !this.state.isCart ? styles.tabTextIsOn : styles.tabTextIsOff]}>Love</Text>
                    </View>
                </View>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={true}
                    scrollIndicatorInsets={{top: 10, Left: 10, bottom: 10, right: 10}}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={this._scrollEvent}
                >
                    <View
                        style={styles.tabPage}
                    >
                        {this._renderCartPage(products)}
                    </View>
                    <View
                        style={styles.tabPage}
                    >
                        {this._renderLovePage(products)}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    titleContainer: {
        paddingVertical: 8,
        paddingHorizontal: 10,
        height: 60,
        width: screenWidth,
        backgroundColor: '#007ACC',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 22,
        color: '#DDD'
    },
    tabs: {
        flex: 1,
        paddingVertical: 15,
        justifyContent: 'center',
        alignItems: 'center',
    },
    tabIsOn: {
        backgroundColor: '#FF1488',
    },
    tabIsOff: {
        backgroundColor: '#F6F6F6'
    },
    tabText: {
        fontSize: 18
    },
    tabTextIsOn: {
        color: '#F6F6F6'
    },
    tabTextIsOff: {
        color: '#7F7F7F'
    },
    tabPage: {
        width: screenWidth,
        height: screenHeight - 200,
        borderColor: '#333',
        borderWidth: 1
    }
})