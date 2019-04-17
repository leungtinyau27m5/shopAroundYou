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
import AutoHeightImage from 'react-native-auto-height-image'
import Modal from 'react-native-modal'

const DrawStar = () => {
    return (
        <FontAwesome
            size={15}
            name={`star`}
            style={{
                color: '#FFCD42'
            }}
        />
    )
}

class UserComment extends Component {
    constructor(props) {
        super()
    }
    _renderRatingStar = (rate) => {
        let stars = []
        for (let i = 0; i < Math.floor(rate); i++) {
            stars.push(<DrawStar key={`user-rate-${i}`}/>)
        }
        return stars
    }
    render() {
        const borderColor = Math.floor(this.props.userComment.rate) >= 3 ? '#7FB546' : '#CB574F'
        return (
            <View
                style={{
                    width: screenWidth * 0.9 * 0.8,
                    borderColor: borderColor,
                    borderWidth: 2,
                    alignSelf: 'center',
                    padding: 8,
                    borderRadius: 20
                }}
            >
                <View
                    style={{
                        flexDirection: 'row',
                    }}
                >
                    <View
                        style={{
                            width: 80,
                            height: 80,
                            overflow: 'hidden',
                            borderColor: '#222',
                            borderWidth: 1,
                            justifyContent: 'center',
                            borderRadius: 40,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            source={{uri: `${serverConn.serverAssets}${this.props.userComment.image_uri}` }}
                            style={{
                                width: 80,
                                height: 80
                            }}
                        />
                    </View>
                    <View
                        style={{
                            alignItems: 'center',
                            flexWrap: 'wrap',
                            paddingHorizontal: 15,
                            width: screenWidth * 0.9 * 0.8 - 30 - 80
                        }}
                    >  
                        <Text style={{flexWrap: 'wrap'}}>
                            {this.props.userComment.comment}asdfewfsadfawefasdfweafasdfwefwaaaaaa
                        </Text>
                    </View>
                </View>
                <View
                    style={{flexDirection: 'row'}}
                >
                    <View style={{width: 80}}></View>
                    <View style={{flex: 1, paddingHorizontal: 15}}>
                        <Text>Rate Given: </Text>
                    </View>
                    <View style={{flex: 1, flexDirection: 'row'}}>
                        {this._renderRatingStar(this.props.userComment.rate)}
                    </View>
                </View>
            </View>
        )
    }
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
            comments: null,
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
    _renderComments = (comments) => {
        console.log(comments)
        if (comments == null || comments == '') {
            return (
                <View style={{width: '100%', padding: 20}}>
                    <Text>There is no comment about that product yet</Text>
                </View>
            )
        }
        let commentArr = comments.map((ele, index) => {
            return (<UserComment key={`user-comment-${index}`} userComment={ele} />)
        })
        return commentArr
    }
    render() {
        const { comments } = this.state
        const { product } = this.props
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
                    <View style={{
                        flex: 1,
                        paddingLeft: 15
                    }}>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.textItem, {
                                fontSize: 18
                            }]}>{product.product_name}</Text>
                            <Text style={[styles.textItem, {
                                fontSize: 18,
                                color: '#DD0000'
                            }]}>$ {product.price}</Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.textItem, {
                                fontSize: 16
                            }]}>Type: </Text>
                            <Text style={[styles.textItem, {
                                fontSize: 16
                            }]}>{product.p_type_name}</Text>
                        </View>
                        <View style={styles.titleContainer}>
                            <Text style={[styles.textItem, {fontSize: 16}]}>Rate: </Text>
                            <View style={{flex: 1, flexDirection: 'row'}}>
                                {this._renderRatingStar(comments.avg_rate)}
                            </View>
                        </View>
                        <View style={{
                            alignItems: 'flex-end',
                            paddingRight: 20
                        }}>
                        <TouchableOpacity 
                            onPress={() => this.props.addToLoved(product.pid)}
                            style={styles.resButton}>
                                <FontAwesome
                                    name={!this.props.isLoved ? `heart-o` : `heart`}
                                    size={16}
                                    style={[{marginRight: 5}, this.props.isLoved ? {color: '#CC0000'} : {color: '#757575'}]}
                                />
                                <Text
                                    style={[this.props.isLoved ? {color: '#CC0000'} : {color: '#757575'}]}
                                >{!this.props.isLoved ? 'add to love' : 'remove'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => this.props.addToCart(product.pid)}
                            style={styles.resButton}>
                            <FontAwesome
                                name={`cart-plus`}
                                size={16}
                                style={[{marginRight: 5}, this.props.isInCart ? {color: '#9DD860'} : {color: '#757575'}]}
                            />
                                <Text
                                    style={[this.props.isInCart ? {color: '#9DD860'} : {color: '#757575'}]}
                                    >{!this.props.isInCart ? 'add to cart' : 'remove'}</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <View
                    style={{
                        height: 120,
                        marginTop: 10,
                        justifyContent: 'center',
                        borderBottomColor: '#111',
                        borderBottomWidth: 2
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
                <ScrollView>
                    <View
                    style={{
                        width: screenWidth * 0.9 * 0.9,
                        borderColor: '#333',
                        borderWidth: 1,
                        borderRadius: 15,
                        height: 120,
                        flexWrap: 'wrap',
                        marginTop: 20,
                        alignSelf: 'center',
                        paddingHorizontal: 10,
                        paddingVertical: 8
                    }}
                    >
                        <Text>{product.description}</Text>
                    </View>
                    <View
                        style={{
                            marginTop: 20
                        }}
                    >
                        <Text style={{fontSize: 20, alignSelf: 'center'}}>User Comments</Text>
                        {this._renderComments(comments.comments)}
                    </View>
                </ScrollView>
            </View>
        )
    }
}
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({
    titleContainer: {
        flexDirection: 'row',
        width: '100%'
    },
    textItem: {
        flex: 1,
    },
    resButton: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 5,
        paddingHorizontal: 2,
        marginTop: 5
    }
})