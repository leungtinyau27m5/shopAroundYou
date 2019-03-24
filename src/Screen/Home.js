import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Image,
    SafeAreaView,
    ScrollView,
    ImageBackground
} from 'react-native'

import HeaderNav from '../Component/HeaderNav'
import ScrollCategories from '../Component/ScrollCategories'

export default class Home extends Component {
    constructor(props) {
        super()
    }
    render() {
        return(
            <SafeAreaView style={{ flex: 1 }}>
                <HeaderNav />
                <ScrollView>
                    <ScrollView style={{ backgroundColor: '#9CDCDE', height: 230, borderTopColor: '#FFF', borderTopWidth: 1 }}>
                        <View style={{
                            marginTop: 25, 
                            alignItems: 'center', 
                            justifyContent:'center'
                        }}>
                            <Text style={{ 
                                fontSize: 25,
                                borderRadius: 25, 
                                borderWidth: 1, 
                                borderColor: '#FFF', 
                                color: '#FFF',
                                width: 150,
                                textAlign: 'center'
                            }}>Categories</Text>
                        </View>
                        <View>
                            <ScrollCategories />
                        </View>
                    </ScrollView>
                    <View style={{padding: 15, alignItems: 'center', justifyContent: 'center'}}>
                        <ImageBackground
                            source={require('../assets/img/03.jpg')}
                            style={{
                                width: 350,
                                height: 105
                            }}
                        >
                            <Text style={{ fontSize: 45, color: '#000', textAlign: 'center'}}>
                                Promotion
                            </Text>
                        </ImageBackground>
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}