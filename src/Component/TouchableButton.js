import React, { Component} from 'react'
import {
    TouchableOpacity,
    Text,
    Button,
    Image
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class TouchableButton extends Component {
    render () {
        return (
            <TouchableOpacity 
                style={{paddingHorizontal: 10}} 
                onPress={() => this.props.handleOnClick()}>
                <Ionicons
                    name={this.props.iconName}
                    size={ 28 }
                    color={'#FFF'}
                />
            </TouchableOpacity>
        )
    }
}