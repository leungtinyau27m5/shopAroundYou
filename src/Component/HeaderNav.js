import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    SafeAreaView,
    ScrollView,
    Image,
    TouchableOpacity
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import TouchableButton from './TouchableButton'

export default class HeaderNav extends Component {
    render() {
        return (
            <View style={{paddingTop: 10, paddingHorizontal: 10, backgroundColor: '#9CDCDE', paddingBottom: 15}}>
                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
                    <View style={{flex: 5}}>
                        <TouchableOpacity>
                            <Image
                                source={require('../assets/img/all_around_you.png')}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={{
                        flex: 7, 
                        flexDirection: 'row', 
                        flexWrap: 'wrap', 
                        alignItems: 'flex-end', 
                        alignSelf: 'flex-end', 
                        justifyContent: 'center', 
                        position: 'absolute', 
                        right: 0}
                    }>
                        <TouchableButton iconName='md-menu'/>
                        <TouchableButton iconName='md-home'/>
                        <TouchableButton iconName='md-locate'/>
                        <TouchableButton iconName='md-search'/>
                    </View>
                </View>
            </View>
        )
    }
}