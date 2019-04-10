import React, { Component } from 'react'
import {
    ActivityIndicator,
    View,
    Text,
    Dimensions
} from 'react-native'

export default class LoadingScreen extends Component {
    render() {
        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').Height
        return (
            <View
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: screenWidth,
                    height: screenHeight,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 2,
                    display: this.props.display ? 'flex' : 'none'
                }}
            >
                <ActivityIndicator
                    size="large"
                    color="#E5E510"
                />
            </View>
        )
    }
}