import React, { Component } from 'react'
import {
    View,
    Text,
    Image,
    StyleSheet,
    TouchableOpacity,
    ToastAndroid
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

export default class Product extends Component {
    constructor(props) {
        super()
        this.state = {
            isLoved: false,
            isAdded: false
        }
    }
    componentWillMount() {
        
    }
    changeFavourite = () => {
        let msg = 'product is added in favourite'
        this.setState((prevState) => ({
            isLoved: !prevState.isLoved
        }))
    }
    changeCart = () => {
        let msg = 'product is added in cart'
        this.setState((prevState) => ({
            isAdded: !prevState.isAdded
        }))
    }
    handleOnClickDetail = () => {
        //ToastAndroid.show('hello', ToastAndroid.SHORT)
    }
    render() {
        return (
            <View 
                style={{flexDirection: 'row'}}  
            >
                <View style={{flex: 1}}>
                <Image
                    source={{ uri: this.props.imageUri }}
                    style={{width: 135, height: 160, borderRadius: 15}}
                    resizeMode='stretch'
                />
                </View>
                <View style={{flex: 1, paddingHorizontal: 8}}>
                    <View 
                        style={{
                            borderBottomColor: '#FFF',
                            borderBottomWidth: 1, 
                            paddingTop: 5
                    }}>
                        <Text style={styles.name}>
                            {this.props.name}
                        </Text>
                    </View>
                    <View style={styles.content}>
                        <View style={styles.rateContainer}>
                            <Text style={styles.rate}>
                                Rating
                            </Text>
                        </View>
                        <View style={styles.priceContainer}>
                            <Text style={styles.price}>
                                {`$ ${this.props.price}`}
                            </Text>
                            <View style={{position: 'absolute', right: 0, paddingTop: 8}}>
                                <TouchableOpacity 
                                    style={{textAlign: 'right'}}
                                    onPress={() => this.changeFavourite()}>
                                    <Ionicons
                                        name={this.state.isLoved ? "ios-heart" : "ios-heart-empty"}
                                        size={30}
                                        color='#FF0000'
                                    />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                    style={{textAlign: 'right'}}
                                    onPress={() => this.changeCart()}>
                                    <Ionicons
                                        name="ios-cart"
                                        size={30}
                                        color={this.state.isAdded ? "#36B449" : "#888888"}
                                    />
                                </TouchableOpacity>
                            </View>
                            <TouchableOpacity
                                onPress={() => this.handleOnClickDetail()} 
                                style={{
                                    marginTop: 40, 
                                    position: 'absolute', 
                                    left: 0, 
                                    flexDirection: 'row',
                                    borderWidth: 1,
                                    borderColor: '#36B449',
                                    padding: 3,
                                    borderRadius: 15
                            }}>
                                <Ionicons
                                    name="ios-list"
                                    size={25}
                                    color={'#36B449'}
                                />
                                <Text 
                                    style={{
                                        marginLeft: 10,
                                        fontSize: 16,
                                        color: '#36B449',
                                }}>
                                    Read More
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    name: {
        fontSize: 22,
        color: '#000',
        alignItems: 'center',
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    content: {
        marginTop: 15
    },
    rateContainer: {
    },
    rate: {
        fontSize: 15
    },
    priceContainer: {
        marginTop: 20,
        flexDirection: 'row'
    },
    price: {
        fontSize: 28,
        color: '#FF0000'
    }
})