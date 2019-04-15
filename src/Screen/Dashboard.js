import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Image,
    BackHandler,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity,
    ToastAndroid,
    Animated
} from 'react-native'
 import AsyncStorage from '@react-native-community/async-storage'
import { NavigationEvents } from 'react-navigation'
import Modal from 'react-native-modal'
import Spinner from 'react-native-loading-spinner-overlay'
import backgroundTimer from 'react-native-background-timer'

import StackReact from '../Component/carousel/StackRect'
import DefaultRect from '../Component/carousel/DefaultRect'
import DashboardAll from '../Component/Dashboard/DashboardAll'
import LoginModal from '../Component/Auth/LoginModal'
import LogOutModal from '../Component/Auth/LogOutModal'
import { serverConn } from '../Server/config'

//import Settings from '../Component/Dashboard/Settings'

HEADER_MAX_HEIGHT = 80
HEADER_MIN_HEIGHT = 40
PROFILE_MAX_HEIGHT = 100
PROFILE_MIN_HEIGHT = 60
export default class Dashboard extends Component {
    constructor(props) {
        super()
        this.state = {
            personalData: null,
            buttons: {
                login: true,
                register: true
            },
            headerCurve: {
                cy: 900
            },
            loginModal: false,
            logoutModal: false,
            isLoading: false,
            usernameIsValid: false,
            scrollY: new Animated.Value(0)
        }
        this._getPersonalData()
    }
    componentDidMount() {
        
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    _getPersonalData = async() => {
        let temp = await AsyncStorage.getItem('personalData')
        temp = JSON.parse(temp)
        this.setState({
            personalData: temp
        }, () => {
            console.log(this.state.personalData)
        })
    }
    sceneIsFocus = () => {
        BackHandler.addEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    backToHomeScreen = () => {
        this.props.navigation.navigate('Home')
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
        return true
    }
    showLoginModal = () => {
        this.setState((prevState) => ({
            loginModal: !prevState.loginModal
        }))
    }
    showLogOutModal = () => {
        this.setState((prevState) => ({
            logoutModal: !prevState.logoutModal
        }))
    }
    checkDuplicate = (username) => {
        const data = {
            request: 'checkUsername',
            username: username
        }
        let result = false
        console.log(data)
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
            ToastAndroid.show('username valid checking connected', ToastAndroid.SHORT)
            this.setState({
                usernameIsValid: true
            })
        })
        .catch((error) => {
            console.log(error)
            ToastAndroid.show('username valid checking connection failed', ToastAndroid.LONG)
        })
        .done(() => { 
            //console.log('username valid', result)
            //return result
        })
        //return result
    }
    customerRegister = async(content) => {
        this.setState({
            isLoading: true
        })
        this.checkDuplicate(content.regUsername)
        const loading = backgroundTimer.setTimeout(() => {
            if (this.state.usernameIsValid) {
                const uriPart = content.regIcon.split('.')
                const fileExtension = uriPart[uriPart.length - 1]
                const randomName = Math.random().toString(36).substring(7)
                const imageDetail = {
                    uri: content.regIcon,
                    name: `${randomName}.${fileExtension}`,
                    type: `image/${fileExtension}`
                }
                const data = {
                    request: 'registerCustomer',
                    username: content.regUsername,
                    password: content.regPassword,
                    email: content.regEmail,
                    phoneNumber: content.regPhoneNumber,
                    birthday: content.regBirthday,
                }
                let body = new FormData()
                body.append('request', data.request)
                body.append('password', data.password)
                body.append('username', data.username)
                body.append('email', data.email)
                body.append('phoneNumber', data.phoneNumber)
                body.append('birthday', data.birthday)
                body.append('image', {
                    uri: imageDetail.uri,
                    name: imageDetail.name,
                    type: imageDetail.type
                })
                fetch(serverConn.serverUri, {
                    method: 'POST',
                    header: {
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data',
                    },
                    body: body
                })
                //.then((response) => console.log(response))
                .then((response) => response.json())
                .then(responseData => {
                    console.log('checking ', responseData)
                    if (responseData) {
                        ToastAndroid.show('Register success', ToastAndroid.SHORT)
                        this.setState({
                            isLoading: false
                        }, () => {
                            this.userLogin(false, content.regUsername, content.regPassword, true)
                            this.props.navigation.navigate('Home')
                        })
                    } else {
                        ToastAndroid.show('repeated username', ToastAndroid.SHORT)
                    }
                })
                .catch((error) => {
                    console.log(error)
                    ToastAndroid.show('Register connection failed', ToastAndroid.LONG)
                })
                .done(() => {
                    this.setState({
                        isLoading: false
                    })
                })
                //
                this.setState({
                    isLoading: false
                })
            }
        }, 5000)
    }
    userLogout = async() => {
        this.setState({
            isLoading: true
        })
        await AsyncStorage.removeItem('personalData')
        const backgroundCounter = backgroundTimer.setTimeout(() => {
            this.setState({
                isLoading: false,
                personalData: null
            })
        }, 2000)
        this.showLogOutModal()
        this.props.navigation.navigate('Home')
    }
    userLogin = (isLabour, un, pw, isRemember) => {
        this.setState({
            isLoading: true
        })
        const data = {
            request: 'login',
            userType: isLabour ? 'labour' : 'customer',
            username: un,
            password: pw,
            isRemember: isRemember ? true : false,
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
            ToastAndroid.show('Request Succeed', ToastAndroid.SHORT)
            this._storeData(responseData)
        })
        .catch((error) => {
            console.log(error)
            ToastAndroid.show('Fetch Request Failed', ToastAndroid.LONG)
        })
        .done(() => { 
            this.setState({ isLoading: false })
            this.showLoginModal()
            this.props.navigation.navigate('Home')
        })
    }
    _storeData = async(res) => {
        const personalData = {
            username: res.username,
            userType: res.userType,
            token: res.token,
            myIcon: res.imageUri
        }
        console.log(personalData)
        this.setState({
            personalData: personalData
        })
        await AsyncStorage.setItem('personalData', JSON.stringify(personalData))
        //console.log(await AsyncStorage.getItem('personalData'))
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        const headerHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
            extrapolate: 'clamp'
        })
        const profileHeight = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [PROFILE_MAX_HEIGHT, PROFILE_MIN_HEIGHT],
            extrapolate: 'clamp'
        })
        const profileMarginTop = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [
                HEADER_MAX_HEIGHT - (PROFILE_MAX_HEIGHT / 2), HEADER_MAX_HEIGHT + 5
            ],
            extrapolate: 'clamp'
        })
        const headerZindex = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        const headerTitleBottom = this.state.scrollY.interpolate({
            inputRange: [
                0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_MIN_HEIGHT,
                HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_MIN_HEIGHT + 26
            ],
            outputRange: [-20, -20, -20, 0],
            extrapolate: 'clamp'
        })
        const headerButtons = this.state.scrollY.interpolate({
            inputRange: [0, HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT + 5 + PROFILE_MIN_HEIGHT + 26],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        })
        //this._getPersonalData()
        return (
            <View>
                <NavigationEvents 
                onDidFocus={()=> this.sceneIsFocus()}/>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Loading .... '}
                    textStyle={{fontSize: 20, color: '#333'}}
                    color={'#333'}
                />
                <Animated.View style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    backgroundColor: '#149F5C',
                    height: headerHeight,
                    zIndex: headerZindex,
                }}>
                    <View style={{
                        flexDirection: 'row',
                        //zIndex: headerZindex,
                    }}>
                    </View>
                    <Animated.View style={{ width: '100%', position: 'absolute', alignItems: 'center', bottom: headerTitleBottom}}>
                        <TouchableOpacity
                            onPress={() => {
                                if (this.state.personalData == null)
                                    this.showLoginModal()
                                else
                                    this.showLogOutModal()
                            }}
                        >
                            <Text style={{ color: '#F6F6F6', fontSize: 14, fontWeight: 'bold'}}>
                                {this.state.personalData == null ? 'Touch me to login' : this.state.personalData.username}
                            </Text>
                        </TouchableOpacity>
                    </Animated.View>
                </Animated.View>
                <ScrollView 
                    scrollEventThrottle={16}
                    style={{
                    //flex: 1, 
                        width: screenWidth
                }}
                    onScroll={Animated.event(
                        [{nativeEvent: { contentOffset: {y: this.state.scrollY }}}]
                    )}
                >
                    <TouchableOpacity
                        onPress={() => {
                            if (this.state.personalData == null)
                                this.showLoginModal()
                            else 
                                this.showLogOutModal()
                        }}
                    >
                    <Animated.View style={{
                        //flex: 1,
                        height: profileHeight,
                        width: profileHeight,
                        borderRadius: PROFILE_MAX_HEIGHT / 2,
                        borderColor: 'white',
                        borderWidth: 3,
                        overflow: 'hidden',
                        marginTop: profileMarginTop,
                        marginLeft: 20,
                    }}>
                        <Animated.Image 
                            style={{
                                width: profileHeight,
                                height: profileHeight
                            }}
                            source={this.state.personalData == null ? require('../assets/img/user.png') : {uri: `${serverConn.serverAssets}customers/${this.state.personalData.myIcon}`}} 
                        />
                    </Animated.View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ 
                        color: '#000', fontWeight: 'bold', fontSize: 18, paddingLeft: 10}}>
                            {this.state.personalData == null ? 'Touch me to login' : this.state.personalData.username}
                        </Text>
                    </View>
                    <View>
                        <DashboardAll personalData={this.state.personalData} />
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewShop', { shop: {merchant_code: 'shop01'} })}>
                            <Text>Debug Test 01</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('ViewShop', { shop: {merchant_code: 'shop02'} })}>
                            <Text>Debug Test 02</Text>
                        </TouchableOpacity>
                        <View style={{ 
                            maringTop: 55,
                            paddingVertical: 15,
                            width: '100%',
                            backgroundColor: '#FFF'
                         }}><Text style={{
                            fontSize: 26,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                         }}>Promotion</Text></View>
                         <StackReact paginationBgColor='#FFF' paginationDotColor='#000'/>
                         <View style={{ 
                            paddingVertical: 15,
                            width: '100%',
                            backgroundColor: '#FF9800'
                         }}><Text style={{
                            fontSize: 26,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                         }}>You Recently Visit</Text></View>
                         <DefaultRect />
                    </View>
                </ScrollView>
                <Modal 
                    isVisible={this.state.loginModal} 
                    onBackdropPress={() => this.showLoginModal()}
                    onBackButtonPress={() => {this.setState({ loginModal: false })}}
                >
                    <LoginModal 
                        showLoginModal={this.showLoginModal}
                        userLogin={this.userLogin}
                        customerRegister={this.customerRegister}
                    />
                </Modal>
                <Modal
                    isVisible={this.state.logoutModal}
                    onBackdropPress={() => this.showLogOutModal()}
                    onBackButtonPress={() => { this.setState({ logoutModal: false })}}
                >
                    <LogOutModal
                        userLogout={this.userLogout}
                        showLogOutModal={this.showLogOutModal}
                    />
                </Modal>
            </View>
        )
    }
}