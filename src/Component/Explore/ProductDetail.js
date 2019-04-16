import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native'
import { serverConn } from '../../Server/config'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import AsyncStorage from '@react-native-community/async-storage';
import Modal from 'react-native-modal'

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
                comments: 'asdf'
            })
        })
        .catch(error => console.log(error))
        .done()
    }
    render() {
        const { comments } = this.state
        console.log(comments)
        if (comments == null) return(<View></View>)
        return (
            <View style={{width: screenWidth *0.9, height: screenHeight * 0.8, backgroundColor: '#FFF'}}>
                <Text>Product Details</Text>
            </View>
        )
    }
}
const screenWidth = Dimensions.get('window').width
const screenHeight = Dimensions.get('window').height
const styles = StyleSheet.create({

})