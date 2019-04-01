import React, { Component } from 'react'
import {
    View,
    BackHandler,
    ScrollView,
    Dimensions,
    SafeAreaView,
    Text
} from 'react-native'
import { WebView } from 'react-native-webview'

import { serverConn } from '../../queryData/server'
import HeaderNav from '../Component/HeaderNav'
import Recommendation from '../Component/Recommendation'

export default class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            text: 'as'
        }
        this.googleMap = null
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
    locateMyPosition = () => {
        const data = {
            hello: 'hello world'
        }
        this.googleMap.postMessage(JSON.stringify(data))
    }
    addMessage(msg) {
        console.log('hellllllo')
        this.setState({
            text: 'asdf'
        })
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        return(
            <View style={{paddingBottom: 100}}>
                <HeaderNav locateMyPosition={this.locateMyPosition}/>
                <Text>{this.state.text}</Text>
                <ScrollView>
                    <WebView 
                        ref={(webView) => this.googleMap = webView}
                        /*
                        onMessage={(evt) => {
                            this.responseMsg(evt.nativeEvent.data)
                        }}*/
                        style={{ height: 200}}
                        javaScriptEnabled={true}
                        //source={{ uri: "https://google.com" }}
                        source={{ uri: serverConn.serverGoogleMapUri }}
                        //onMessage={this.addMessage.bind(this)}
                        //onMessage={() => console.log('asdf')}
                        onMessage={event => {
                            this.addMessage(event.nativeEvent.data)
                            //alert(event.nativeEvent.data)
                        }}
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
    /*
<WebView 
                        ref={(webView) => this.googleMap = webView}
                        onMessage={(evt) => {
                            this.responseMsg(evt.nativeEvent.data)
                        }}
                        style={{ height: 200}}
                        javaScriptEnabled={true}
                        //source={{ uri: "https://google.com" }}
                        source={{ uri: serverConn.serverGoogleMapUri }}
                    />
    */
}