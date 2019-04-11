import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    StyleSheet,
    ToastAndroid,
    Switch,
    ScrollView
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Fumi } from 'react-native-textinput-effects'
import { Checkbox } from 'react-native-paper'
import DateTimePicker from 'react-native-modal-datetime-picker'
import BackgroundTimer from 'react-native-background-timer'
import { imagePicker, iconUri } from '../Auth/Permission'
import AsyncStorage from '@react-native-community/async-storage';

export default class LoginModal extends Component {
    constructor(props) {
        super()
        this.state = {
            isLabour: false,
            username: null,
            password: null,
            isRemember: true,
            isLogin: true,
            isDateTimePickerVisible: false,

            regUsername: null,
            regPassword: null,
            regEmail: null,
            regPhoneNumber: null,
            regBirthday: null,
            regIcon: null,
        }
    }
    componentDidMount() {

    }
    componentWillUnmount() {

    }
    _handleToggleSwitch = () => {
        this.setState((prevState) => ({
            isLabour: !prevState.isLabour
        }))
    }
    _handleDatePicked = (date) => {
        const newDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
        console.log(newDate)
        this.setState({
            isDateTimePickerVisible: false,
            regBirthday: newDate
        })
    }
    scrollingEvent = (event) => {
        const num = Math.floor(event.nativeEvent.contentOffset.x)
        const screenWidth = Dimensions.get('window').width * 0.9
        if (num == 0) {
            this.setState({
                isLogin: true
            })
        } else {
            this.setState({
                isLogin: false
            })
        }
    }
    _userIcon = () => {
        imagePicker()       
        this.changeIcon() 
    }
    changeIcon = async() => {
        let imageUri;
        const bgTimer = BackgroundTimer.setTimeout(async() => {
            imageUri = await AsyncStorage.getItem('myIcon')
            const uriPart = imageUri.split('.')
            const fileExtension = uriPart[uriPart.length - 1]
            const randomName = Math.random().toString(36).substring(7)
            const imageDetail = {
                uri: imageUri,
                name: `${randomName}.${fileExtension}`,
                type: `image/${fileExtension}`
            }
            this.setState({
                regIcon: imageUri
            }, () => {
                console.log(this.state.regIcon)
            })
        }, 5000)
    }
    _userlogin = () => {
        let formCompleted = true
        let msg = 'Incompleted!'
        console.log(this.state.merchantCode)
        if (this.state.username == null) {
            msg += ' Invalid username!'
            formCompleted = false
        }
        if (this.state.password == null) {
            msg += ' Invalid password!'
            formCompleted = false
        }
        if (formCompleted) 
            this.props.userLogin(this.state.isLabour, this.state.username, this.state.password, this.state.isRemember)
        else 
            ToastAndroid.show(msg, ToastAndroid.SHORT)
    }
    _userRegister = () => {
        const content = {
            regUsername: this.state.regUsername,
            regPassword: this.state.regPassword,
            regEmail: this.state.regEmail,
            regPhoneNumber: this.state.regPhoneNumber,
            regBirthday: this.state.regBirthday,
            regIcon: this.state.regIcon
        }
        let isGoingOn = false
        //console.log('login page', content)
        
        let reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        let msg = ''
        if (content.regUsername == null || content.regUsername.length < 6)
            msg += 'username cant be null or less than 6'
        else if (content.regPassword == null || content.regPassword.length < 6)
            msg += 'password cant be null or less than 6'
        else if (content.regEmail == null || !reg.test(content.regEmail))
            msg += 'invalid email'
        else if (content.regPhoneNumber == null || content.regPhoneNumber.length < 8)
            msg += 'invalid phone number'
        else if (content.regBirthday == null)
            msg += 'birthday cant be null'
        else 
            isGoingOn = true
        
        if (!isGoingOn) {
            ToastAndroid.show(msg, ToastAndroid.LONG)
            return
        }
        
        this.props.customerRegister(content)
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height
        return (
            <View style={{
                width: screenWidth * 0.9,
                height: screenHeight * 0.9,
                backgroundColor: '#FFF',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 25,
                overflow: 'hidden',
            }}>
                <LinearGradient 
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={['#3CB0FF', '#007ACC']}
                    style={{
                        alignItems: 'flex-end',
                        paddingRight: 20,
                        backgroundColor: '#358C00'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.showLoginModal()}
                        style={{
                            
                        }}
                    >
                        <Ionicons
                            style={{color: '#FFF'}}
                            name="ios-close"
                            size={55}
                        />
                    </TouchableOpacity>
                </LinearGradient>
                <View style={{  width: screenWidth * 0.9, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <View style={[styled.tabs]}>
                        <Text style={[styled.tabsText, this.state.isLogin ? {color: '#629F22'} : {color: '#333'}]}>Login</Text>
                    </View>
                    <View style={[styled.tabs]}>
                        <Text style={[styled.tabsText, this.state.isLogin ? {color: '#333'} : {color: '#FF9900'}]}>Register</Text>
                    </View>
                </View>
                <ScrollView
                    horizontal={true}
                    pagingEnabled={true}
                    showsHorizontalScrollIndicator={true}
                    scrollIndicatorInsets={{top: 10, Left: 10, bottom: 10, right: 10}}
                    scrollEventThrottle={16}
                    onMomentumScrollEnd={this.scrollingEvent}
                >
                    <View style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth * 0.9 }}>
                        <View
                            style={{
                                height: 140,
                                width: 140,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderRadius: 90,
                                overflow: 'hidden',
                                justifyContent: 'center', 
                                alignItems: 'center',
                                borderColor: '#333',
                                borderWidth: 1
                            }}
                        >
                            <Image
                                source={require('../../assets/img/user.png')}
                                style={{
                                    width: 140,
                                    height: 140
                                }}
                            />
                        </View>
                        <View style={{
                            marginTop: 35,
                            width: screenWidth * 0.9,
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center',
                            width: '100%',
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', alignItems: 'center'}}>
                                <Text style={styled.switchButtonText}>Shop Labour ?</Text>
                                <Text style={styled.switchButtonText}>No</Text>
                                <Switch 
                                    onValueChange={this._handleToggleSwitch}
                                    value={this.state.isLabour}
                                />
                                <Text style={styled.switchButtonText}>Yes</Text>
                            </View>
                            <Fumi
                                onChangeText={(text) => { this.setState({ username: text })}}
                                style={{
                                    marginTop: 10,
                                    width: '80%',
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    borderWidth: 1
                                }}
                                label={'User Name'}
                                iconClass={FontAwesomeIcon}
                                iconName={'user'}
                                iconColor={'#f95a25'}
                                iconSize={20}
                                iconWidth={40}
                                inputPadding={16}
                            />
                            <Fumi
                                onChangeText={(text) => { this.setState({ password: text })}}
                                secureTextEntry={true}
                                style={{
                                    width: '80%',
                                    marginTop: 10,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    borderWidth: 1
                                }}
                                label={'******'}
                                iconClass={FontAwesomeIcon}
                                iconName={'key'}
                                iconColor={'#E5E510'}
                                iconSize={20}
                                iconWidth={40}
                                inputPadding={16}
                            />
                            <TouchableOpacity
                                onPress={() => { this.setState((prevState) => ({ isRemember: !prevState.isRemember })) }}
                            >
                                <View style={{flexDirection: 'row', justifyContent: 'center' ,alignItems: 'center'}}>
                                    <Checkbox
                                        status={this.state.isRemember ? 'checked' : 'unchecked'}
                                        onPress={() => {  this.setState((prevState) => ({ isRemember: !prevState.isRemember })) }}
                                    />
                                    <Text style={styled.switchButtonText}>Remember me ?</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ marginTop: 25, flexDirection: 'row' }}>
                                <TouchableOpacity 
                                    onPress={() => this._userlogin()}
                                    style={[styled.buttons, styled.loginButton]}>
                                    <Text style={styled.buttonText}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    onPress={() => this.props.showLoginModal()}
                                    style={[styled.buttons, styled.cancelButton]}>
                                    <Text style={styled.buttonText}>Cancel</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>




                    <ScrollView>
                        <View style={{ alignItems: 'center', justifyContent: 'center', width: screenWidth * 0.9, paddingBottom: 25, paddingTop: 35 }}>
                        <Text style={{
                            position: 'absolute', 
                            right: 15, 
                            top: 15, 
                            color: '#FF6666',
                            textDecorationLine: 'underline'
                        }}>Shop Register?</Text>
                        <Text>Select your Icon</Text>
                        <View
                            style={{
                                height: 140,
                                width: 140,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderRadius: 90,
                                overflow: 'hidden',
                                justifyContent: 'center', 
                                alignItems: 'center',
                                borderColor: '#333',
                                borderWidth: 1
                            }}
                        >
                            <TouchableOpacity onPress={() => this._userIcon()}>
                                <Image
                                    source={this.state.regIcon !== null ? {uri: this.state.regIcon} : require('../../assets/img/user.png')}
                                    style={{
                                        width: 140,
                                        height: 140
                                    }}
                                />
                            </TouchableOpacity>
                        </View>
                        <Fumi
                            onChangeText={(text) => { this.setState({ regUsername: text })}}
                            //secureTextEntry={true}
                            style={{
                                width: '80%',
                                marginTop: 10,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderWidth: 1
                            }}
                            label={'user name'}
                            iconClass={FontAwesomeIcon}
                            iconName={'user'}
                            iconColor={'#1971C2'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                        />
                        <Fumi
                            onChangeText={(text) => { this.setState({ regPassword: text} )}}
                            secureTextEntry={true}
                            style={{
                                width: '80%',
                                marginTop: 10,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderWidth: 1
                            }}
                            label={'******'}
                            iconClass={FontAwesomeIcon}
                            iconName={'key'}
                            iconColor={'#1971C2'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                        />
                        <Fumi
                            onChangeText={(text) => { this.setState({ regEmail: text} )}}
                            //secureTextEntry={true}
                            style={{
                                width: '80%',
                                marginTop: 10,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderWidth: 1
                            }}
                            label={'Email'}
                            iconClass={FontAwesomeIcon}
                            iconName={'envelope-o'}
                            iconColor={'#E5E510'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                        />
                        <Fumi
                            keyboardType='numeric'
                            onChangeText={(text) => { this.setState({ regPhoneNumber: text} )}}
                            //secureTextEntry={true}
                            style={{
                                width: '80%',
                                marginTop: 10,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderWidth: 1
                            }}
                            label={'Phone Number'}
                            iconClass={FontAwesomeIcon}
                            iconName={'phone'}
                            iconColor={'#E5E510'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                        />
                        <TouchableOpacity
                            style={{
                                width: '100%'
                            }} 
                            onPress={() => { 
                                this.setState((prevState) => ({ isDateTimePickerVisible: !prevState.isDateTimePickerVisible })) 
                            }}
                        >
                            <Fumi
                                //onChangeText={(text) => { this.setState({ password: text })}}
                                //secureTextEntry={true}
                                editable={false}
                                style={{
                                    width: '80%',
                                    marginTop: 10,
                                    marginLeft: 'auto',
                                    marginRight: 'auto',
                                    borderWidth: 1
                                }}
                                label={'Birthday'}
                                iconClass={FontAwesomeIcon}
                                iconName={'birthday-cake'}
                                iconColor={'#E5E510'}
                                iconSize={20}
                                iconWidth={40}
                                inputPadding={16}
                                value={this.state.regBirthday}
                            />
                        </TouchableOpacity>
                        <DateTimePicker
                            isVisible={this.state.isDateTimePickerVisible}
                            onConfirm={this._handleDatePicked}
                            onCancel={() => { this.setState({ isDateTimePickerVisible: false })}}
                        />
                        
                            <View style={{ marginTop: 25, flexDirection: 'row' }}>
                                <TouchableOpacity 
                                    onPress={() => this._userRegister()}
                                    style={[styled.buttons, {backgroundColor: '#FF9900'}]}>
                                    <Text style={styled.buttonText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </ScrollView>
                </ScrollView>
            </View>
        )
    }
}
const styled = StyleSheet.create({
    tabs: {
        flex: 1,
        paddingVertical: 8,
        paddingHorizontal: 25,
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabsText: {
        fontSize: 16
    },
    buttons: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FFD600',
        marginLeft: 5,
        marginRight: 5
    },
    switchButtonText: {
        fontSize: 14,
        marginLeft: 8,
        marginRight: 8
    },
    loginButton: {
        backgroundColor: '#00D580'
    },
    cancelButton: {
        backgroundColor: '#CC0B00'
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF'
    }
})