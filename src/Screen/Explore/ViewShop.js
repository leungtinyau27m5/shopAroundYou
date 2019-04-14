import React, { Component } from 'react'
import {
    View,
    Text,
    BackHandler,
    StyleSheet,
    Image,
    ImageBackground,
    ScrollView,
    Dimensions,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import Product from '../../Component/Product'

import { serverConn } from '../../Server/config'

export default class ViewShop extends Component {
    static navigationOptions = {
        headerStyle: {
            backgroundColor: '#FF4A00'
        }
    }
    constructor(props) {
        super()
        this.state = {
            tabs: {
                isProduct: true,
            },
            shopDetail: null
        }
        this._tabsScrollView = null
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.backToExplore)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToExplore)
    }
    _sceneIsFocus = () => {
        console.log(this.props.navigation.state.params.shop)
        const data = {
            request: 'viewShopRequest',
            merchant_code: this.props.navigation.state.params.shop.merchant_code
        }

        fetch(serverConn.serverUri, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        //.then((response) => console.log(response))
        .then((response) => response.json())
        .then(responseData => {
            console.log(responseData)
            this._storeData(responseData)
        })
        .catch((error) => {
            console.log(error)
            ToastAndroid.show('shop request failed', ToastAndroid.LONG)
        })
    }
    _storeData = (responseData) => {
        this.setState({
            shopDetail: responseData
        })
    }
    _sceneIsBlur = () => {

    }
    backToExplore = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.backToExplore)
        this.props.navigation.navigate('Explore')
        return true
    }
    _handleScroll = (event) => {
        const num = Math.floor(event.nativeEvent.contentOffset.x)
        if (num <= 0 ) {
            this.setState({
                tabs: {
                    isProduct: true
                }
            })
        } else {
            this.setState({
                tabs: {
                    isProduct: false
                }
            })
        }
    }
    render() {
        console.log(this.state.shopDetail)
        return (
            <View>
                <NavigationEvents 
                    onDidBlur={() => this._sceneIsBlur()}
                    onDidFocus={() => this._sceneIsFocus()}/>
                <ScrollView>
                    <View style={styles.headerImage}>
                        <ImageBackground
                            source={require('../../assets/img/KLB_01.jpg')}
                            style={{width: '100%', height: 180}}
                            resizeMode='cover'
                        >
                        </ImageBackground>
                        <View style={styles.shopOwnerIcon}>
                            <Image
                                source={require('../../assets/img/user.png')}
                                style={{width: 100, height: 100, zIndex: 9}}
                            />
                        </View>
                    </View>
                    <View style={[styles.container, {
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }]}>
                        <Text style={styles.titleText}>Shop Name</Text>
                        <Text style={{fontSize: 15, textDecorationLine: 'underline'}}>Shop Owner</Text>
                    </View>
                    <View style={[styles.container]}>
                        <View style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderColor: '#333',
                            borderWidth: 2,
                            minHeight: 150
                        }}>
                            <Text>Description</Text>
                        </View>
                    </View>
                    <View style={[styles.container]}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity 
                            onPress={() => { this.setState((prevState) => ({ tabs: { isProduct: !prevState.tabs.isProduct } })) }}
                            style={[styles.tabsButton, this.state.tabs.isProduct ? styles.tabIsOn : styles.tabIsOff]}>
                                <Text style={[styles.tabsText, this.state.tabs.isProduct ? styles.tabIsOn : styles.tabIsOff]}>Products</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => { this.setState((prevState) => ({ tabs: { isProduct: !prevState.tabs.isProduct } })) }}
                            style={[styles.tabsButton, !this.state.tabs.isProduct ? styles.tabIsOn : styles.tabIsOff]}>
                                <Text style={[styles.tabsText, !this.state.tabs.isProduct ? styles.tabIsOn : styles.tabIsOff]}>Services</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            horizontal={true}
                            pagingEnabled={true}
                            showsHorizontalScrollIndicator={true}
                            scrollIndicatorInsets={{top: 10, Left: 10, bottom: 10, right: 10}}
                            scrollEventThrottle={16}
                            onMomentumScrollEnd={this._handleScroll}
                        > 
                            <View
                                style={styles.scrollViewPage}
                            >
                                <View style={{
                                    width: screenWidth,
                                    height: 200,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                }}>

                                </View>
                            </View>
                            <View
                                style={styles.scrollViewPage}
                            >
                                <Text>qwer</Text>
                            </View>
                        </ScrollView>
                    </View>
                    <View style={styles.container}>
                        <Text style={[styles.titleText, {
                                marginLeft: 'auto', 
                                justifyContent: 'center', 
                                marginRight: 'auto'
                        }]}>
                            User Comments
                        </Text>

                    </View>
                    <View style={styles.container}>
                    
                    </View>
                </ScrollView>    
            </View>
        )
    }
}
const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    headerImage: {
        height: 220,
        width: '100%',
        borderColor: '#FFF',
        borderWidth: 1
    },
    shopOwnerIcon: {
        top: -65,
        left: screenWidth - 100,
        borderRadius: 40,
        borderColor: '#FFF',
        borderWidth: 2,
        overflow: 'hidden'
    },
    container: {
        paddingHorizontal: 15,
        paddingTop: 20,
        paddingBottom: 10
    },
    titleText: {
        fontSize: 22,
        fontWeight: 'bold'
    },
    tabsButton: {
        flex: 1,
        paddingVertical: 8,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center',
        borderColor: '#AAA',
        borderWidth: 1
    },
    tabsText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    tabIsOn: {
        backgroundColor: '#FF9048',
        color: '#FFF'
    },
    tabIsOff: {
        backgroundColor: '#FFFFFF',
        color: '#757575'
    },
    scrollViewPage: {
        width: screenWidth,
        minHeight: 300
    }
})