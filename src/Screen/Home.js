import React, { Component } from 'react'
import {
    View,
    BackHandler,
    ScrollView,
    Dimensions,
    ToastAndroid,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
//import styled from 'styled-components/native'
import BackgroundTimer from 'react-native-background-timer'
import LinearGradient from 'react-native-linear-gradient'
import {NavigationEvents} from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage'

import StackReact from '../Component/carousel/StackRect'
import HeaderNav from '../Component/HeaderNav'
import Recommendation from '../Component/Recommendation'
import { serverConn } from '../../queryData/server';

export default class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            personalData: null
        }
        this._getData()
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.alertDialogBox)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.alertDialogBox)
    }
    _getData = async() => {
        let temp = await AsyncStorage.getItem('personalData')
        temp = JSON.parse(temp)
        if (temp == null) return 
        this.setState({
            personalData: temp
        }, () => {
            console.log(this.state.personalData)
        })
        /*
        const data = {
            request: 'CheckAuthToken',
            token: temp.token,
            userType: temp.userType
        }
        fetch(serverConn.serverUri, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then(responseData => {
            console.log(responseData)
            if (responseData) {
                this.setState({
                    personalData: temp
                }, () => {
                    console.log(this.state.personalData)
                })
            } else {
                ToastAndroid.show('Token checking is failed! Please Login Again', ToastAndroid.LONG)
            }
        })*/
    }
    sceneIsFocus = () => {
        BackHandler.addEventListener('hardwareBackPress', this.alertDialogBox)
    }
    sceneIsBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.alertDialogBox)
    }
    alertDialogBox = () => {
        ToastAndroid.show('Double press to exit', ToastAndroid.SHORT)
        BackHandler.addEventListener('hardwareBackPress', this.doubleBackButtonPress)
        const doubleBack = BackgroundTimer.setTimeout(() => {
            BackHandler.removeEventListener('hardwareBackPress', this.doubleBackButtonPress)
        }, 2000)
        return true
    }
    doubleBackButtonPress = () => {
        BackHandler.exitApp()
        return true
    }
    searchScreen = () => {
        this.notInFocus()
        this.props.navigation.navigate('Explore')
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        return(
            <View style={{paddingBottom: 100}}>
                <NavigationEvents 
                onDidBlur={() => this.sceneIsBlur()}
                onDidFocus={() => this.sceneIsFocus()}/>
                <HeaderNav 
                    //locateMyPosition={this.locateMyPosition}
                    searchScreen={this.searchScreen}
                    //filterResult={this.filterResult}
                />
                <ScrollView>
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        colors={['#323232', '#323232']}
                        style={{paddingVertical: 10}}
                    >
                        <Text style={[{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontSize: 26,
                            color: '#80FF80'}, styled.titleContainer]}>
                            Most Wellcome This Week
                        </Text>
                    </LinearGradient>
                    <StackReact paginationBgColor='#333' paginationDotColor='#FFF'/>
                    <Recommendation
                        width={screenWidth}
                        height={200}
                        title={'Popular'}
                        target='popular_products'
                    />
                </ScrollView>
            </View>
        )
    }
}
const styled = StyleSheet.create({
    titleContainer: {
        paddingVertical: 10
    }
})