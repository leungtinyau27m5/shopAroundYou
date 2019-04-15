import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
} from 'react-native'
import Carousel from 'react-native-snap-carousel';

import { Styles } from '../../Component/constants/Styles'
import { serverConn } from '../../Server/config'
let dataSize = 0

export default class StackReact extends Component {
    constructor(props) {
        super()
        this.state = {
            activeSlide: 0,
            thisWeekData: null
        }
        this._carousel = null
    }
    componentDidUpdate() {
        dataSize = this.props.data.length
    }
    carouselIsClicked = (shop, index) => {
        if (index == this._carousel.currentIndex)
            this.props.viewShopAction(shop)
        else
            this._carousel.snapToItem(index)
    }
    _carouselOnScroll = (event) => {
        const num = Math.floor(event.nativeEvent.contentOffset.x)
        const screenWidth = Dimensions.get('window').width
        let index = 0
        let isChanged = false
        for (let i = 0; i < dataSize; i++) {
            if (num <= i * screenWidth) {
                index = i
                if (this.state.activeSlide !== index) {
                    isChanged = true
                    this.setState({
                        activeSlide: i
                    })
                    i = dataSize
                }
            }
        }
        if (isChanged)
            this.props.viewShopOnScroll(index)
    }
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={Styles.slide}
                onPress={() => { 
                this.carouselIsClicked(item, index)
              }}
            >
                <View style={Styles.card}>
                    <Image
                        style={[Styles.cardImage, {width: '100%', height: 145}]}
                        source={{uri: `${serverConn.serverAssets}${item.image_uri}`}}
                    />
                    <View style={Styles.title}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15}}>
                            <Text style={[Styles.cardText, {fontSize: 18, textDecorationLine: 'underline'}]}>{item.shop_name}</Text>
                            <Text style={{
                                color: '#FFF'
                            }}>{item.overall_avg}</Text>
                        </View>
                        <Text style={[Styles.cardText, {paddingHorizontal: 15}]}>
                            {item.description}
                        </Text>
                        <Text style={{marginRight: 'auto', marginLeft: 'auto', fontSize: 12, color: '#FFF'}}>
                            {item.formatted_address}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        let shopDetail = this.props.data
        console.log('ex carousel ', shopDetail)
        const screenWidth = Dimensions.get('window').width
        return (
            <View>
                    <Carousel
                        ref={(c) => { this._carousel = c }}
                        //data={this.state.thisWeekData}
                        data={shopDetail}
                        renderItem={this._renderItem}
                        sliderWidth={screenWidth}
                        //layout={'tinder'}
                        //layoutCardOffset={9}
                        sliderHeight={300}
                        itemWidth={screenWidth * 0.7}
                        itemHeight={256}
                        firstItem={0}
                        useScrollView={true}
                        pagingEnabled={true}
                        scrollEventThrottle={16}
                        onScroll={this._carouselOnScroll}
                        //onScrollEndDrag={this._carouselOnScroll}
                        //onScroll={(index) => {console.log('it is on scroll')}}
                    />
            </View>
        )
    }
}