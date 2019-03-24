import React, { Component } from 'react'
import {
    TouchableOpacity,
    View,
    Text,
    Image
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import ImageOverlay from 'react-native-image-overlay'

export default class Category extends Component {
    render() {
        return (
            <TouchableOpacity
                style={{
                    width: 55,
                    height: 55,
                    borderRadius: 15,
                    backgroundColor: '#FFF',
                    justifyContent: 'center',
                }}
            >
                <View style={{alignItems: 'center', justifyContent: 'center'}}>
                    <Image
                        source={this.props.imageUri}
                    />
                    <Text style={{fontSize: 12}}>
                        {this.props.name}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }
}