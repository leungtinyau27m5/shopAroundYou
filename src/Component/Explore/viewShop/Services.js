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

export default class Services extends Component {
    render() {
        const { service } = this.props
        console.log(`${serverConn.serverAssets}${service.image_uri}`)
        return (
            <View style={{
                
            }}>
                <View style={styles.container}>
                    <View style={styles.imageContainer}>
                        <Image
                            source={{ uri: `${serverConn.serverAssets}${service.image_uri}` }}
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
                            >{service.pid}</Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#333',
                                    marginLeft: 10
                                }}
                            >{service.s_name}</Text>
                        </View>
                        <View style={styles.content}>
                            <Text>{service.type_description}</Text>
                            <Text>{service.description}</Text>
                            <View style={{
                                alignItems: 'flex-end'
                            }}>
                                <Text>{`$ ${service.price_min}`}</Text>
                                <Text>{`$ ${service.price_max}`}</Text>
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