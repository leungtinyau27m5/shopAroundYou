import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    ImageBackground
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { serverConn } from '../../../Server/config'

export default class Labours extends Component {
    render() {
        const { labour } = this.props
        return (
            <View>
                <View 
                    key={`labour-${labour.labour_id}`}
                    style={styles.imageContainer}
                >
                    <ImageBackground
                        source={{ uri: `${serverConn.serverAssets}${labour.image_uri}` }}
                        style={{
                            width: 80,
                            height: 80
                        }}
                    >
                    </ImageBackground>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    imageContainer: {
        width: 80, 
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 40,
        overflow: 'hidden',
        borderColor: '#DDD',
        borderWidth: 1
    }
})