import React, { Component } from 'react'
import {
    View,
    BackHandler,
    ScrollView,
    Dimensions,
    SafeAreaView
} from 'react-native'
import { WebView } from 'react-native-webview'

import HeaderNav from '../Component/HeaderNav'
import Recommendation from '../Component/Recommendation'

export default class Home extends Component {
    constructor(props) {
        super()
    }
    componentDidMount() {
        this._sub = this.props.navigation.addListener(
            'didFocus',
            this._eventLsitenerAddtoScene
        )
    }
    _eventLsitenerAddtoScene = () => {
        BackHandler.addEventListener('hardwareBackPress', this.homePageOnPressBackButton)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.homePageOnPressBackButton)
        this._sub.remove()
    }
    homePageOnPressBackButton = () => {
        BackHandler.exitApp()
        return true
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        return(
            <View style={{paddingBottom: 100}}>
                <HeaderNav />
                <ScrollView>
                    <WebView 
                        style={{ height: 200}}
                        source={{ uri: "https://google.com" }}
                    />
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