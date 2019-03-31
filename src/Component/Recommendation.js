import React, { Component } from 'react'
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Dimensions,
    TouchableOpacity
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'


import { serverConn } from '../../queryData/server'
import Product from './Product'
const colorLevel = [
    '#ffffff', '#ffe6cc', '#ffdab3', '#ffce99', '#ffc180', '#ffb566', '#ffa94d', '#ff9c33', '#ff901a', '#ff8400'
]
export default class Recommendation extends Component {
    constructor(props) {
        super()
        this.state = {
            width: props.width,
            height: props.height,
            productList: null,
        }
    }
    componentWillMount() {
        this.fetchData()
    }
    componentDidMount() {

    }
    storeData = (data) => {
        this.setState({
            productList: data
        })
    }
    fetchData = () => {
        const data = {
            request: this.props.target
        }
        fetch(serverConn.serverUri, {
            method: 'POST',
            header: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then((response) => response.json())
        .then(responseData => {
            this.storeData(responseData)
        })
        .catch((error) => {
            console.log("server request Error", error)
        })
        .done()
    }
    render() {
        let newArray
        if (this.state.productList) {
            newArray = this.state.productList.map((ele, index) => {
                return (
                    <LinearGradient style={[styles.container, {width: this.props.width, height: this.props.height}]}
                    colors={[colorLevel[index], colorLevel[index + 1]]}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    key={`p-${index}`}>
                        <Product 
                        name={ele.product_name}
                        price={ele.price}
                        imageUri={`${serverConn.serverAssets}${ele.image_uri}`}/>
                    </LinearGradient>
                )
            })
        }
        return (
            <View style={{flex: 1, backgroundColor: '#FFF'}}>
            <Text style={{
                fontSize: 26, 
                color: '#e60000',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}>
                {this.props.title}
            </Text>
            <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={true}
                scrollIndicatorInsets={{top: 10, Left: 10, bottom: 10, right: 10}}
                scrollEventThrottle={16}
            >
            { newArray }
            </ScrollView>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
        paddingHorizontal: 25,
        paddingVertical: 15
    }
})