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
import Spinner from 'react-native-loading-spinner-overlay'
import backgroundTimer from 'react-native-background-timer'
//import Product from '../../Component/Product'
import Products from '../../Component/Explore/viewShop/Products'
import Services from '../../Component/Explore/viewShop/Services'
import Labours from '../../Component/Explore/viewShop/Labours'

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
            shopDetail: null,
            isLoading: false
        }
        this._tabsScrollView = null
    }
    componentDidMount() {

    }
    componentWillUnmount() {
        
    }
    _sceneIsFocus = () => {
        BackHandler.addEventListener('hardwareBackPress', this.backToExplore)
        if (this.state.shopDetail !== null)
            if (this.state.shopDetail.shop.merchant_code == this.props.navigation.state.params.shop.merchant_code)
                return
        this.setState({
            isLoading: true
        })
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
            const bgCounter = backgroundTimer.setTimeout(() => {
                this.setState({
                    isLoading: false
                })
            }, 1000)
        })
        .catch((error) => {
            console.log(error)
            ToastAndroid.show('shop request failed', ToastAndroid.LONG)
        })
        .done(() => {
            
        })
    }
    _storeData = (responseData) => {
        this.setState({
            shopDetail: responseData
        })
    }
    _sceneIsBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.backToExplore)
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
    _renderProducts = () => {
        if (this.state.shopDetail == null) return (<View><Text>There is no products</Text></View>)

        let newArr = this.state.shopDetail.products.map((ele, index) => {
            return (
                <Products
                    key={`product-${ele.pid}`}
                    product={ele}
                />
            )
        })
        return newArr
    }
    _renderServices = () => {
        if (this.state.shopDetail == null) return(<View><Text>There is no services</Text></View>)

        let newArr = this.state.shopDetail.services.map((ele, index) => {
            return (
                <Services
                    key={`service-${ele.sid}`}
                    service={ele}
                />
            )
        })
        return newArr
    }
    _renderLabours = () => {
        if (this.state.shopDetail == null) return (<View><Text>There is no Labours</Text></View>)

            let owner = []
            let sm = []
            let m = []
            let sc = []
            let c = []
            let pt = []

        for (let i = 0; i < this.state.shopDetail.labour.length; i++) {
            const ele = this.state.shopDetail.labour[i]
            if (ele.position == 'Owner')
                owner.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position = 'Senior_Manager')
                sm.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position == 'Manager')
                m.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position == 'Senior_Clerk')
                sc.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position == 'Clerk')
                c.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position == 'Part_Time_Clerk')
                pt.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
        }
        return (
            <View>
                <View style={styles.setCenter}>
                    <Text style={{fontSize: 18, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        Owner
                    </Text>
                    <View style={styles.iconContainer}>{owner}</View>
                </View>
                <View style={styles.setCenter}>
                    <Text style={{fontSize: 18, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        Senior Manager
                    </Text>
                    <View style={styles.iconContainer}>{sm}</View>
                </View>
                <View style={styles.setCenter}>
                    <Text style={{fontSize: 18, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        Manager
                    </Text>
                    <View style={styles.iconContainer}>{m}</View>
                </View>
                <View style={styles.setCenter}>
                    <Text style={{fontSize: 18, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        Senior Clerk
                    </Text>
                    <View style={styles.iconContainer}>{sc}</View>
                </View>
                <View style={styles.setCenter}>
                    <Text style={{fontSize: 18, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        Clerk
                    </Text>
                    <View style={styles.iconContainer}>{c}</View>
                </View>
                <View style={styles.setCenter}>
                    <Text style={{fontSize: 18, justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>
                        Part time
                    </Text>
                    <View style={styles.iconContainer}>{pt}</View>
                </View>
            </View>
        )

        /*
        let newArr = this.state.shopDetail.labour.map((ele, index) => {
            let owner
            let sm
            let m
            let sc
            let c
            let pt
            if (ele.position == 'Owner')
                owner.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position = 'Senior_Manager')
                sm.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position == 'Manager')
                m.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position == 'Senior_Clerk')
                sc.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position == 'Clerk')
                c.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
            else if (ele.position == 'Part_Time_Clerk')
                pt.push(<Labours key={`labour-${ele.labour_id}`} labour={ele} />)
        })
        return newArr*/
    }
    render() {
        const { shopDetail } = this.state
        let shopOwner = null
        let shopOwnerImage = null
        let shopImage = null
        if (shopDetail !== null) {
            for (let i = 0; i < shopDetail.labour.length; i++) {
                if (shopDetail.labour[i].position === 'Owner') {
                    shopOwner = shopDetail.labour[i].username
                    shopOwnerImage = shopDetail.labour[i].image_uri
                    i = shopDetail.labour.length
                    shopImage = shopDetail.shop.image_uri
                }
            }
        }
        return (
            <View>
                <NavigationEvents 
                    onDidBlur={() => this._sceneIsBlur()}
                    onDidFocus={() => this._sceneIsFocus()}/>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading .... '}
                    textStyle={{fontSize: 20, color: '#333'}}
                    color={'#333'}
                />
                <ScrollView>
                    <View style={styles.headerImage}>
                        <ImageBackground
                            //source={require('../../assets/img/KLB_01.jpg')}
                            source={{ uri: `${serverConn.serverAssets}${shopImage}` }}
                            style={{width: '100%', height: 180}}
                            resizeMode='cover'
                        >
                        </ImageBackground>
                        <View style={styles.shopOwnerIcon}>
                            <Image
                                //source={require('../../assets/img/user.png')}
                                source={{ uri: `${serverConn.serverAssets}${shopOwnerImage}` }}
                                style={{width: 100, height: 100, zIndex: 9}}
                            />
                        </View>
                    </View>
                    <View style={[styles.container, {
                        flexDirection: 'row',
                        justifyContent: 'space-between'
                    }]}>
                        <Text style={styles.titleText}>
                        {
                            shopDetail !== null ? shopDetail.shop.shop_name : ''
                        }
                        </Text>
                        <Text style={{fontSize: 15, textDecorationLine: 'underline'}}>
                        {
                            shopOwner !== null ? shopOwner : ''
                        }
                        </Text>
                    </View>
                    <View style={[styles.container]}>
                        <View style={{
                            paddingHorizontal: 20,
                            paddingVertical: 10,
                            borderColor: '#333',
                            borderWidth: 2,
                            minHeight: 150
                        }}>
                            <Text>
                                {shopDetail !== null ? shopDetail.shop.description : ''}
                            </Text>
                        </View>
                    </View>
                    <View style={[styles.container]}>
                        <View style={{
                            flexDirection: 'row',
                        }}>
                            <TouchableOpacity 
                            onPress={() => { 
                                this.setState((prevState) => ({ 
                                    tabs: { 
                                        isProduct: !prevState.tabs.isProduct 
                                    } 
                                }))
                                this._tabsScrollView.scrollTo({
                                    x: 0,
                                    y: 0,
                                    animated: true
                                })
                            }}
                            style={[styles.tabsButton, this.state.tabs.isProduct ? styles.tabIsOn : styles.tabIsOff]}>
                                <Text style={[styles.tabsText, this.state.tabs.isProduct ? styles.tabIsOn : styles.tabIsOff]}>Products</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                            onPress={() => { 
                                this.setState((prevState) => ({ 
                                    tabs: { 
                                        isProduct: !prevState.tabs.isProduct 
                                    } 
                                })) 
                                this._tabsScrollView.scrollTo({
                                    x: screenWidth,
                                    y: 0,
                                    animated: true
                                })
                            }}
                            style={[styles.tabsButton, !this.state.tabs.isProduct ? styles.tabIsOn : styles.tabIsOff]}>
                                <Text style={[styles.tabsText, !this.state.tabs.isProduct ? styles.tabIsOn : styles.tabIsOff]}>Services</Text>
                            </TouchableOpacity>
                        </View>
                        <ScrollView
                            ref={(ref) => {
                                this._tabsScrollView = ref
                            }}
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
                                {this._renderProducts()}
                            </View>
                            <View
                                style={styles.scrollViewPage}
                            >
                                {this._renderServices()}
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
                        <Text style={[styles.titleText, {
                                marginLeft: 'auto', 
                                justifyContent: 'center', 
                                marginRight: 'auto'
                        }]}>
                            Labours
                        </Text>
                        <View style={{
                            flexDirection: 'row',
                            flexWrap: 'wrap',
                            justifyContent: 'center',
                        }}>
                            {this._renderLabours()}
                        </View>
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
        width: screenWidth - 30,
    },
    setCenter: {
        justifyContent: 'center',
        marginTop: 20
    },
    iconContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
    }
})