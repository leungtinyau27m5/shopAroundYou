import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
import { serverConn } from '../../../Server/config'

const colorLevel = [
    '#ffffff', '#ffe6cc', '#ffdab3', '#ffce99', '#ffc180', '#ffb566', '#ffa94d', '#ff9c33', '#ff901a', '#ff8400'
]


export default class Products extends Component {
    render() {
        const { product } = this.props
        return (
            <View style={{
                
            }}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: `${serverConn.serverAssets}${product.image_uri}` }}
                            style={{
                                width: 120,
                                height: 120
                            }}
                        />
                    </View>
                    <View style={{ flex: 1 }}>
                        <View style={{flexDirection: 'row'}}>
                            <Text
                                style={{
                                    fontSize: 14,
                                    color: '#333'
                                }}
                            >{product.pid}</Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#333',
                                    marginLeft: 10
                                }}
                            >{product.product_name}</Text>
                        </View>
                        <View style={styles.content}>
                            <Text>{product.p_type_name}</Text>
                            <Text>{product.description}</Text>
                            <View style={{
                                alignItems: 'flex-end'
                            }}>
                                <Text>asdf</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const screenWidth = Dimensions.get('window').width
const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 15,
        paddingVertical: 20,
        flexDirection: 'row',
        width: '100%',
        borderColor: '#000',
        borderWidth: 1,
        marginTop: 15,
        borderRadius: 32,
    },
    imageContainer: {
        height: 120,
        width: 120,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: '#555',
        overflow: 'hidden'
    },
    content: {
        paddingHorizontal: 15,
        width: '100%',
    }
})