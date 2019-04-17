import React, { Component } from 'react'
import {
    View,
    Text,
    BackHandler,
    StyleSheet,
    Dimensions,
    ScrollView,
    Image,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import { serverConn } from '../Server/config'
import {NavigationEvents} from 'react-navigation'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage'
import Spinner from 'react-native-loading-spinner-overlay'
import BackgroundTimer from 'react-native-background-timer'

class ProductInCart extends Component {
    constructor(props) {
        super()
        this.state = {
            value: props.value,
            newAdd: 1,
            isLoading: false
        }
    }
    _changeQuantity = (value) => {
        if (value >= 0 && value <= 100) {
            this.setState({
                value: value
            })
        }
    }
    _addNewQuantity = (value) => {
        if (value >= 0 && value <= 100) {
            this.setState({
                newAdd: value
            })
        }
    }
    _addToCart = async(product) => {
        console.log(product)
        const data = {
            isLoved: false,
            isInCart: true,
            detail: product,
            value: this.state.newAdd
        }
        await AsyncStorage.setItem(product.pid, JSON.stringify(data))
        this.props.addItemToCartPage(data)
    }
    render() {
        const { product } = this.props
        return (
            <View style={{
                alignSelf: 'center',
                width: screenWidth * 0.9,
                paddingVertical: 8,
                paddingHorizontal: 15,
                borderColor: this.props.themeColor,
                borderWidth: 2,
                borderRadius: 25,
                marginTop: 12
            }}>
                <View style={{flexDirection: 'row'}}>
                    <View style={{width: 100}}>
                        <View style={{
                            width: 100,
                            height: 100,
                            borderRadius: 50,
                            overflow: 'hidden',
                            borderColor: this.props.themeColor,
                            borderWidth: 1
                        }}>
                            <Image
                                source={{uri: `${serverConn.serverAssets}${product.image_uri}`}}
                                style={{
                                    width: 100,
                                    height: 100
                                }}
                            />
                        </View>
                        <View style={{width: 100, marginTop: 10, alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={() => {
                                    this.props.removeItem(product.pid, this.props.isCart)
                                }}
                                style={{
                                    borderColor: '#FF0000',
                                    borderWidth: 2,
                                    paddingHorizontal: 8,
                                    paddingVertical: 5,
                                    width: 80,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    flexDirection: 'row'
                                }}
                            >
                                <FontAwesome
                                    name={`trash-o`}
                                    size={22}
                                    style={{color: '#FF0000'}}
                                />
                                <Text style={{marginLeft: 5, color: '#FF0000'}}>Delete</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={{
                        flex: 1,
                        paddingLeft: 10
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{fontSize: 20, color: '#CB574F'}}>{product.product_name}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text>Type: </Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>{product.p_type_name}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text>From Shop: </Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>{product.shop_name}</Text>
                            </View>
                        </View>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{flex: 1}}>
                                <Text>Description: </Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>{product.description}</Text>
                            </View>
                        </View>
                        <View style={[{flexDirection: 'row'}, !this.props.isCart ? {display: 'none'} : {display: 'flex'}]}>
                            <View style={{flex: 1}}>
                                <Text>Quantity: </Text>
                            </View>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <FontAwesome
                                        onPress={() => this._changeQuantity(this.state.value - 1)}
                                        name={`minus`}
                                        size={10}
                                    />
                                </View>
                                <View style={{flex: 1}}>
                                    <Text style={{fontSize: 18, color: '#FF1488'}}>{this.state.value}</Text>
                                </View>
                                <View style={{flex: 1, justifyContent: 'center'}}>
                                    <FontAwesome
                                        onPress={() => this._changeQuantity(this.state.value + 1)}
                                        name={`plus`}
                                        size={10}
                                    />
                                </View>
                            </View>
                        </View>
                        <View style={[{flexDirection: 'row'}, !this.props.isCart ? {display: 'none'} : {display: 'flex'}]}>
                            <View style={{flex: 1}}>
                                <Text>Price: </Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text>$ {product.price}</Text>
                            </View>
                        </View>
                        <View style={[{flexDirection: 'row'}, !this.props.isCart ? {display: 'none'} : {display: 'flex'}]}>
                            <View style={{flex: 1}}>
                                <Text>Subtotal: </Text>
                            </View>
                            <View style={{flex: 1}}>
                                <Text style={{fontSize: 18, color: '#FF1488'}}>$ {product.price * this.state.value}</Text>
                            </View>
                        </View>
                        <View style={[{flexDirection: 'row', marginTop: 15}, this.props.isCart ? {display: 'none'} : {display: 'flex'}]}>
                            <View style={{justifyContent: 'center'}}>
                                <FontAwesome
                                    onPress={() => this._addNewQuantity(this.state.newAdd - 1)}
                                    name={`minus`}
                                    size={20}
                                />
                            </View>
                            <View style={{justifyContent: 'center'}}>
                                <Text style={{fontSize: 22, color: '#FF1488', marginLeft: 12, marginRight: 12}}>{this.state.newAdd}</Text>
                            </View>
                            <View style={{justifyContent: 'center'}}>
                                <FontAwesome
                                    onPress={() => this._addNewQuantity(this.state.newAdd + 1)}
                                    name={`plus`}
                                    size={20}
                                />
                            </View>
                            <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end', position: 'absolute', bottom: 0, right: 0}}>
                                <TouchableOpacity
                                    onPress={() => this._addToCart(product)}
                                    style={{
                                        borderColor: '#7FB546',
                                        borderWidth: 2,
                                        paddingHorizontal: 8,
                                        paddingVertical: 5,
                                        width: 80,
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        flexDirection: 'row'
                                    }}
                                >
                                    <FontAwesome
                                        name={`cart-plus`}
                                        size={22}
                                        style={{color: '#7FB546'}}
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const pStyle = StyleSheet.create({

})
let totalAmount = 0
export default class ShoppingCart extends Component {
    constructor(props) {
        super()
        this.state = {
            products: null,
            isCart: true,
            isLoading: false,
            totalAmount: 0
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
    removeItem = async(pid, isCart) => {
        console.log('removeItem', pid)
        let json = await AsyncStorage.getItem(pid)
        let asyncData = JSON.parse(json)
        if (isCart)
            asyncData.isInCart = false
        else
            asyncData.isLoved = false
        await AsyncStorage.setItem(pid, JSON.stringify(asyncData))

        let products = this.state.products

        for (let i = 0; i < products.length; i++) {
            if (products[i].detail.pid === pid) {
                //products.splice(i, 1)
                if (isCart)
                    products[i].isInCart = false
                else
                    products[i].isLoved = false
            }
        }
        this.setState({
            products: products
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
        let amount = 0
        let newArr = products.map((ele, index) => {
            if (ele.isInCart) {
                //console.log('_renderCartPage', ele)
                amount += ele.detail.price * ele.value
                return (
                    <ProductInCart
                        themeColor='#007ACC'
                        key={`cart-${index}`}
                        product={ele.detail}
                        value={ele.value}
                        removeItem={this.removeItem}
                        isCart={true}
                    />
                )
            }
        })
        totalAmount = amount
        return newArr
    }
    _renderLovePage = (products) => {
        if (products == null) return (<View></View>)
        let newArr = products.map((ele, index) => {
            console.log(ele.isLoved)
            if (ele.isLoved) {
                return (
                    <ProductInCart
                        themeColor='#FF1488'
                        key={`love-${index}`}
                        product={ele.detail}
                        removeItem={this.removeItem}
                        isCart={false}
                        addItemToCartPage={this.addItemToCartPage}
                    />
                )
            }
        })
        return newArr
    }
    addItemToCartPage = (product) => {
        let products = this.state.products
        let pos = null
        if (products !== null) {
            for (let i = 0; i <products.length; i++) {
                if (products[i].detail.pid === product.detail.pid)
                    pos = i
            }
            if (pos !== null) {
                products[pos] = product
            } else {
                products.push(product)
            }
        } else {
            products.push(product)
        }
        this.setState({
            products: products
        })
        this._getProducts()
    }
    _checkOut = () => {
        const products = this.state.products
        if (products == null || products.length <= 0 || totalAmount <= 0) return

        this.setState({
            isLoading: true
        })
        const bgTimer = BackgroundTimer.setTimeout(() => {
            this.setState({
                isLoading: false
            })
            ToastAndroid.show('Payment is handled', ToastAndroid.SHORT)
        }, 3000)
        for (let i = 0; i < products.length; i++) {
            this.removeItem(products[i].detail.pid, true)
        }
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
                <View style={[{justifyContent: 'center'}, this.state.isCart ? {display: 'flex'} : {display: 'none'}]}>
                    <View style={{flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 8, justifyContent: 'center'}}>
                        <View style={{justifyContent: 'center'}}>
                            <Text style={{fontSize: 18}}>Total: </Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <Text style={{fontSize: 26, color: '#7FB546', fontWeight: 'bold'}}>$ {totalAmount}</Text>
                        </View>
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <TouchableOpacity
                                onPress={() => this._checkOut()}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    paddingHorizontal: 15,
                                    paddingVertical: 8,
                                    borderRadius: 15,
                                    borderColor: '#7FB546',
                                    borderWidth: 1
                                }}
                            >
                                <FontAwesome
                                    name={`money`}
                                    size={32}
                                    style={{
                                        color: '#7FB546'
                                    }}
                                />
                                <View
                                    style={{justifyContent: 'center',
                                marginLeft: 8}}
                                >
                                    <Text style={{fontSize: 20}}>Check</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
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
        height: screenHeight - 260,
        borderColor: '#333',
        borderWidth: 1,
        paddingVertical: 20,

    }
})