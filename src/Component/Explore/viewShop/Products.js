import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    TextInput
} from 'react-native'
import { serverConn } from '../../../Server/config'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal'
import ProductDetail from '../ProductDetail'

const NumberInput = (props) => {
    return (
        <View style={{
            width: props.width,
            height: props.height,
            flexDirection: 'row',
            justifyContent: 'center',
            textAlign: 'center'
        }}>
            <View
                style={{
                    justifyContent: 'center'
                }}
            >
                <FontAwesome
                    onPress={() => {
                        props.changeValue(props.value - 1)
                    }}
                    name={`minus`}
                    size={props.buttonSize}
                />
            </View>
            <View
                style={{
                    justifyContent: 'center'
                }}
            >
            <TextInput
                style={{
                    fontSize: props.fontSize,
                    borderColor: '#333',
                    borderWidth: 1,
                    padding: 0,
                    height: 20 + props.fontSize,
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                    textAlign: 'center',
                    justifyContent: 'center',
                    marginLeft: 5,
                    marginRight: 5
                }}
                onChangeText={(value) => props.changeValue(value)}
                keyboardType='numeric'
                value={props.value.toString()}
            />
            </View>
            <View
                style={{
                    justifyContent: 'center'
                }}
            >
            <FontAwesome
                onPress={() => {
                    props.changeValue(props.value + 1)
                }}
                name={`plus`}   
                size={props.buttonSize}
                style={{
                    justifyContent: 'center'
                }}
            />
            </View>
        </View>
    )
}
export default class Products extends Component {
    constructor(props) {
        super()
        this.state = {
            isLoved: false,
            isInCart: false,
            productModal: false,
            value: 1
        }
        //console.log('product page', this.props)
        if (props.product !== null)
            this._getProductStatus(props.product.pid)
    }
    _getProductStatus = async(pid) => {
        //console.log('products, _getProductStatus', pid)
        let status = await AsyncStorage.getItem(pid).then((json) => {
            let s
            if (json !== null) {
                s = JSON.parse(json)
                this.setState({
                    isLoved: s.isLoved,
                    isInCart: s.isInCart
                })
            }
        })
    }
    _addToCart = (pid) => {
        this.setState((prevStatus) => ({
            isLoved: false,
            isInCart: !prevStatus.isInCart
        }), async() => {
            let status = {
                isLoved: this.state.isLoved,
                isInCart: this.state.isInCart,
                detail: this.props.product,
                value: this.state.value
            }
            await AsyncStorage.setItem(pid, JSON.stringify(status))
        })
    }
    _addToLoved = (pid) => {
        this.setState((prevStatus) => ({
            isInCart: false,
            isLoved: !prevStatus.isLoved
        }), async() => {
            let status = {
                isLoved: this.state.isLoved,
                isInCart: this.state.isInCart,
                detail: this.props.product,
                value: this.state.value
            }
            await AsyncStorage.setItem(pid, JSON.stringify(status))
        })
    }
    _showProductModal = () => {
        this.setState((prevStatus) => ({
            productModal: !prevStatus.productModal
        }))
    }
    render() {
        const { product } = this.props
        const { comment } = this.props
        if (product == null) return (<View></View>)
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
                            >{product.p_type_name}</Text>
                            <Text
                                style={{
                                    fontSize: 18,
                                    color: '#333',
                                    marginLeft: 10
                                }}
                            >{product.product_name}</Text>
                        </View>
                        <View style={styles.content}>
                            <Text style={{
                                marginTop: 15,
                                fontSize: 20,
                                color: '#EE0000'
                            }}>$ {product.price}</Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    width: '100%'
                                }}
                            >
                                <View style={{alignItems: 'flex-start', flex: 1, justifyContent: 'center'}}>
                                    <NumberInput
                                        width={80}
                                        height={50}
                                        changeValue={(value) => {
                                            if (value >=1 && value <= 100) {
                                                this.setState({
                                                    value: value
                                                })
                                            }
                                        }}
                                        buttonSize={15}
                                        fontSize={18}
                                        value={this.state.value}
                                    />
                                    <TouchableOpacity
                                        style={[{flex: 1}, styles.resButton]}
                                        onPress={() => this._showProductModal()}
                                    >
                                        <FontAwesome
                                            name={`list-ul`}
                                            size={16}
                                            style={{marginRight: 5}}
                                        />
                                        <Text>View More</Text>
                                    </TouchableOpacity>

                                </View>
                                <View style={{
                                    alignItems: 'flex-end',
                                    flex: 1
                                }}>
                                    <TouchableOpacity 
                                        onPress={() => this._addToLoved(product.pid)}
                                        style={styles.resButton}>
                                        <FontAwesome
                                            name={!this.state.isLoved ? `heart-o` : `heart`}
                                            size={16}
                                            style={[{marginRight: 5}, this.state.isLoved ? {color: '#CC0000'} : {color: '#757575'}]}
                                        />
                                        <Text
                                            style={[this.state.isLoved ? {color: '#CC0000'} : {color: '#757575'}]}
                                        >{!this.state.isLoved ? 'add to love' : 'remove'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        onPress={() => this._addToCart(product.pid)}
                                        style={styles.resButton}>
                                        <FontAwesome
                                            name={`cart-plus`}
                                            size={16}
                                            style={[{marginRight: 5}, this.state.isInCart ? {color: '#9DD860'} : {color: '#757575'}]}
                                        />
                                        <Text
                                            style={[this.state.isInCart ? {color: '#9DD860'} : {color: '#757575'}]}
                                        >{!this.state.isInCart ? 'add to cart' : 'remove'}</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
                <Modal 
                    isVisible={this.state.productModal} 
                    onBackdropPress={() => this._showProductModal()}
                    onBackButtonPress={() => {this.setState({ productModal: false })}}
                >
                    <ProductDetail
                        product={product}
                        isLoved={this.state.isLoved}
                        isInCart={this.state.isInCart}
                        addToCart={this._addToCart}
                        addToLoved={this._addToLoved}
                    />
                </Modal>
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
    },
    resButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 2
    }
})