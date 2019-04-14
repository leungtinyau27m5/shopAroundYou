import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import Product from '../../Product'

const colorLevel = [
    '#ffffff', '#ffe6cc', '#ffdab3', '#ffce99', '#ffc180', '#ffb566', '#ffa94d', '#ff9c33', '#ff901a', '#ff8400'
]


export default class Products extends Component {
    render() {
        return (
            <View>
                <Product 
                    name={this.props.product_name}
                    price={this.props.price}
                    imageUri={`${serverConn.serverAssets}${this.props.image_uri}`}
                />
            </View>
        )
    }
}