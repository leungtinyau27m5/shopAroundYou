import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Styles } from '../constants/Styles'

export default class StackReact extends Component {
    constructor(props) {
        super()
        this.state = {
            activeSlide: 0,
            thisWeekData: [
                {
                    shopName: '力生五金',
                    type: '五金行', 
                    imageUri: require('../../assets/img/KLB_01.jpg'),
                    text: 'hello1'
                },
                {
                    shopName: 'SHOP',
                    type: '精品',
                    imageUri: require('../../assets/img/KLB_02.jpg'),
                    text: 'hello2'
                },
                {
                    shopName: 'The Body Shop',
                    type: '美容/零售',
                    imageUri: require('../../assets/img/KLB_03.jpg'),
                    text: 'hello3'
                },
                {
                    shopName: '小店',
                    type: '零售',
                    imageUri: require('../../assets/img/KLB_04.jpg'),
                    text: '力生五金'
                },
                {
                    shopName: '雜貨店',
                    type: '雜貨',
                    imageUri: require('../../assets/img/KLB_05.jpg'),
                    text: '老式雜貨店, 柴米油鹽醬醋茶芝麻綠豆花膠冬菇'
                },
            ]
        }
        this._carousel = null
    }
    carouselIsClicked = (index) => {
        if (index == this._carousel.currentIndex)
            console.log('innnnn')
        else
            this._carousel.snapToItem(index)
    }
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={Styles.slide}
                onPress={() => { 
                //this._carousel.snapToItem(index)
                this.carouselIsClicked(index)
              }}
            >
                <View style={Styles.card}>
                    <Image
                        style={Styles.cardImage}
                        source={item.imageUri}
                    />
                    <View style={Styles.title}>
                        <View style={{justifyContent: 'space-between', flexDirection: 'row', paddingHorizontal: 15}}>
                            <Text style={[Styles.cardText, {fontSize: 18, textDecorationLine: 'underline'}]}>{item.shopName}</Text>
                            <Text>Rating</Text>
                        </View>
                        <Text style={[Styles.cardText, {paddingHorizontal: 15}]}>
                            {item.text}
                        </Text>
                        <Text style={{marginRight: 'auto', marginLeft: 'auto', fontSize: 12, color: '#FFF'}}>
                            Shop Owner
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    /*
    get pagination() {
        return (
            <Pagination
                dotsLength={this.state.thisWeekData.length}
                activeDotIndex={this.state.activeSlide}
                containerStyle={{ 
                    backgroundColor: this.props.paginationBgColor
                }}
                dotStyle={{
                    width: 5,
                    height: 5,
                    borderRadius: 5,
                    marginHorizontal: 8,
                    backgroundColor: 'rgba(255, 255, 255, 0.92)'
                }}
                inactiveDotStyle={{

                }}
                inactiveDotOpacity={0.4}
                inactiveDotScale={0.6}
            />
        )
    }*/
    render() {
        const { thisWeekData, activeSlide } = this.state
        const screenWidth = Dimensions.get('window').width
        return (
            <View>
                    <Carousel
                        ref={(c) => { this._carousel = c }}
                        data={this.state.thisWeekData}
                        renderItem={this._renderItem}
                        sliderWidth={screenWidth}
                        //layout={'tinder'}
                        //layoutCardOffset={9}
                        sliderHeight={300}
                        itemWidth={screenWidth * 0.7}
                        itemHeight={256}
                        firstItem={0}
                        //onScroll={(index) => console.log(index)}
                    />
            </View>
        )
    }
}