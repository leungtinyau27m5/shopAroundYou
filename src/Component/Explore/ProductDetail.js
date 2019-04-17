import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
    ScrollView
} from 'react-native'
import { serverConn } from '../../Server/config'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';
import AutoHeightImage from 'react-native-auto-height-image'
import Modal from 'react-native-modal'

const DrawStar = () => {
    return (
        <FontAwesome
            size={10}
            name={`star`}
            style={{
                color: '#FFCD42'
            }}
        />
    )
}
class ImageGallery extends Component {
    constructor(props) {
        super()
        this.state = {
            showImageFullScreen: false
        }
    }
    render() {
        return (
            <View>
            <View style={{
                justifyContent: 'center',
                marginRight: 8,
                marginLeft: 8,
                width: 100, 
                borderRadius: 50,
                borderColor: '#111',
                borderWidth: 1,
                overflow: 'hidden',
                height: 100}}
            >
                <TouchableOpacity
                    onPress={() => {
                        this.setState((prevState) => ({
                            showImageFullScreen: !prevState.showImageFullScreen
                        }))
                    }}
                >
                    <Image
                        source={{ uri: `${serverConn.serverAssets}${this.props.imageUri}` }}
                        style={{
                            width: 100,
                            height: 100
                        }}
                    />
                </TouchableOpacity>
            </View>
            <Modal 
                    isVisible={this.state.showImageFullScreen} 
                    onBackdropPress={() => {  this.setState({ showImageFullScreen: false }) }}
                    onBackButtonPress={() => { this.setState({ showImageFullScreen: false }) }}
                >
                    <View
                        style={{
                            width: screenWidth * 0.9,
                            height: screenHeight,
                            justifyContent: 'center',
                            alignItems: 'center'
                        }}
                    >
                        <AutoHeightImage
                            source={{ uri: `${serverConn.serverAssets}${this.props.imageUri}` }}
                            width={screenWidth}
                        />
                    </View>
                </Modal>
            </View>
        )
    }
}
export default class ProductDetail extends Component {
    constructor(props) {
        super()
        this.state = {
            comments: null
        }
    }
    _getComments = () => {
        //console.log('_getComments', this.props)
    }
    componentDidMount() {
        /*
        console.log('component in mount', this.props)
        this.setState({
            comments: 'asdf'
        })*/
        const data = {
            request: 'getComments',
            pid: this.props.product.pid
        }
        fetch(serverConn.serverUri, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        //.then((response) => console.log(response))
        .then((response) => response.json())
        .then(res => {
            this.setState({
                comments: res
            })
        })
        .catch(error => console.log(error))
        .done()
    }
    _renderImageGallery = (product) => {
        if (product.image_gallery === '') return (<View></View>)
        let json = JSON.parse(product.image_gallery)
        let newArr
        if (json) {
            newArr = json.map((ele, index) => {
                if (ele.image_uri !== null && ele.image_uri !== '') {
                return (
                    <ImageGallery
                        key={`gallery-${index}`}
                        imageUri={ele.image_uri}
                    />
                )
                }
            })
        } else {
            newArr = null
        }
        return newArr
    }
    _renderRatingStar = (rate) => {
        let stars = []
        for (let i = 0; i < Math.floor(rate); i++) {
            stars.push(<DrawStar key={`key-${i}`}/>)
        }
        return stars
    }
    render() {
        const { comments } = this.state
        const { product } = this.props
        console.log(comments)
        console.log(this.props)
        if (comments == null) return(<View></View>)
        return (
            <View style={{
                width: screenWidth *0.9, 
                height: screenHeight * 0.8, 
                backgroundColor: '#FFF',
                borderRadius: 20,
                paddingVertical: 20
            }}>
                <View style={{
                    flexDirection: 'row'
                }}>
                    <View style={{
                        overflow: 'hidden',
                        borderRadius: 70,
                        width: 140,
                        height: 140,
                        borderColor: '#333',
                        borderWidth: 1
                    }}>
                        <Image
                            source={{uri: `${serverConn.serverAssets}${product.image_uri}` }}
                            style={{
                                width: 140,
                                height: 140
                            }}
                        />
                    </View>
                    <View
                        style={{
                            flexWrap: 'wrap',
                            paddingHorizontal: 15
                        }}
                    >
                        <Text>{product.product_name}           $ {product.price}</Text>
                        <View style={{flexDirection: 'row'}}>
                            <View style={{ }}>
                                <Text>Type: {product.p_type_name}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'center', flexWrap: 'wrap', justifyContent: 'flex-end'}}>
                                {this._renderRatingStar(comments.avg_rate)}
                            </View>
                        </View>
                        <View style={{flexWrap: 'wrap'}}>
                            <Text style={{flexWrap: 'wrap'}}>Description:    {product.description}</Text>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        height: 120,
                        marginTop: 10,
                        justifyContent: 'center'
                    }}
                >
                    <ScrollView
                        horizontal={true}
                        pagingEnabled={true}
                        showsHorizontalScrollIndicator={true}
                        scrollIndicatorInsets={{top: 10, Left: 10, bottom: 10, right: 10}}
                        scrollEventThrottle={16}
                    >
                        {this._renderImageGallery(product)}
                    </ScrollView>
                </View>
                <View
                 style={{
                     
                 }}
                >

                </View>
            </View>
        )
    }
}
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({

})