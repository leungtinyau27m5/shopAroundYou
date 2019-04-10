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
import LoadingScreen from '../Component/LoadingScreen'

//import Settings from '../Component/Dashboard/Settings'

HEADER_MAX_HEIGHT = 80
HEADER_MIN_HEIGHT = 40
PROFILE_MAX_HEIGHT = 100
PROFILE_MIN_HEIGHT = 60
export default class Dashboard extends Component {
    constructor(props) {
        super()
        this.state = {
            personalData: {
                username: null,
                image: null,
                cid: null,
                token: null,
            },
            buttons: {
                login: true,
                register: true
            },
            headerCurve: {
                cy: 900
            },
            loginModal: false,
            isLoading: false,
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
        let personalData = await AsyncStorage.getItem('personalData')
        if (personalData !== null)
            personalData = JSON.parse(personalData)
        this.setState({
            personalData: personalData
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
    userLogin = () => {
        this.showLoginModal()
        this.setState({
            isLoading: true
        })
        const jobDone = backgroundTimer.setTimeout(() => {
            this.setState({
                isLoading: false
            })
        }, 2000)
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
        return (
            <View>
                <NavigationEvents 
                onDidFocus={()=> this.sceneIsFocus()}/>
                <Spinner
                    visible={this.state.isLoading}
                    textContent={'Logging in ... '}
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
                            onPress={() => this.showLoginModal()}
                        >
                            <Text style={{ color: '#F6F6F6', fontSize: 14, fontWeight: 'bold'}}>
                                {this.state.username == null ? 'Touch me to login' : this.state.username}
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
                        onPress={() => this.showLoginModal()}
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
                            source={require('../assets/img/user.png')} 
                        />
                    </Animated.View>
                    </TouchableOpacity>
                    <View>
                        <Text style={{ 
                        color: '#000', fontWeight: 'bold', fontSize: 18, paddingLeft: 10}}>
                            {this.state.username == null ? 'Touch me to login' : this.state.username}
                        </Text>
                    </View>
                    <View>
                        <DashboardAll personalData={this.state.personalData} />
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
                    />
                </Modal>
            </View>
        )
    }
}