import React, { Component } from 'react'
import {
    View,
    BackHandler,
    ScrollView,
    Dimensions,
    ToastAndroid,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image
} from 'react-native'
//import styled from 'styled-components/native'
import BackgroundTimer from 'react-native-background-timer'
import LinearGradient from 'react-native-linear-gradient'
import {NavigationEvents} from 'react-navigation'
import Carousel, { Pagination } from 'react-native-snap-carousel';

import { Styles } from '../Component/constants/Styles'
import HeaderNav from '../Component/HeaderNav'
import Recommendation from '../Component/Recommendation'

export default class Home extends Component {
    constructor(props) {
        super()
        this.state = {
            activeSlide: 0, 
            thisWeekData: [
                {
                    shopName: '力生五金',
                    type: '五金行', 
                    imageUri: require('../assets/img/KLB_01.jpg'),
                    text: 'hello1'
                },
                {
                    shopName: 'SHOP',
                    type: '精品',
                    imageUri: require('../assets/img/KLB_02.jpg'),
                    text: 'hello2'
                },
                {
                    shopName: 'The Body Shop',
                    type: '美容/零售',
                    imageUri: require('../assets/img/KLB_03.jpg'),
                    text: 'hello3'
                },
                {
                    shopName: '小店',
                    type: '零售',
                    imageUri: require('../assets/img/KLB_04.jpg'),
                    text: '力生五金'
                },
                {
                    shopName: '雜貨店',
                    type: '雜貨',
                    imageUri: require('../assets/img/KLB_05.jpg'),
                    text: '老式雜貨店, 柴米油鹽醬醋茶芝麻綠豆花膠冬菇'
                },
            ]
        }
        this._carousel = null
    }
    componentDidMount() {
        BackHandler.addEventListener('hardwareBackPress', this.alertDialogBox)
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.alertDialogBox)
    }
    sceneIsFocus = () => {
        BackHandler.addEventListener('hardwareBackPress', this.alertDialogBox)
    }
    sceneIsBlur = () => {
        BackHandler.removeEventListener('hardwareBackPress', this.alertDialogBox)
    }
    alertDialogBox = () => {
        ToastAndroid.show('Double press to exit', ToastAndroid.SHORT)
        BackHandler.addEventListener('hardwareBackPress', this.doubleBackButtonPress)
        const doubleBack = BackgroundTimer.setTimeout(() => {
            BackHandler.removeEventListener('hardwareBackPress', this.doubleBackButtonPress)
        }, 2000)
        return true
    }
    doubleBackButtonPress = () => {
        BackHandler.exitApp()
        return true
    }
    searchScreen = () => {
        this.notInFocus()
        this.props.navigation.navigate('Explore')
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
                        <Text style={[Styles.cardText, {fontSize: 18}]}>{item.shopName}</Text>
                        <Text style={Styles.cardText}>
                            {item.text}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    get pagination() {
        const { thisWeekData, activeSlide } = this.state
        return (
            <Pagination
                dotsLength={thisWeekData.length}
                activeDotIndex={activeSlide}
                containerStyle={{ 
                    backgroundColor: '#333'
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
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        return(
            <View style={{paddingBottom: 100}}>
                <NavigationEvents 
                onDidBlur={() => this.sceneIsBlur()}
                onDidFocus={() => this.sceneIsFocus()}/>
                <HeaderNav 
                    //locateMyPosition={this.locateMyPosition}
                    searchScreen={this.searchScreen}
                    //filterResult={this.filterResult}
                />
                <ScrollView>
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 1}}
                        colors={['#323232', '#323232']}
                        style={{paddingVertical: 10}}
                    >
                        <Text style={[{
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            fontSize: 26,
                            color: '#80FF80'}, styled.titleContainer]}>
                            Most Wellcome This Week
                        </Text>
                    </LinearGradient>
                    <View>
                    <Carousel
                        ref={(c) => { this._carousel = c }}
                        data={this.state.thisWeekData}
                        renderItem={this._renderItem}
                        sliderWidth={screenWidth}
                        layout={'stack'}
                        layoutCardOffset={18}
                        sliderHeight={300}
                        itemWidth={screenWidth * 0.7}
                        itemHeight={256}
                        firstItem={0}
                        autoplay={true}
                        onSnapToItem={(index) => this.setState({ activeSlide: index })}
                        //onScroll={(index) => console.log(index)}
                    />
                    { this.pagination }
                    </View>
                    <Recommendation
                        width={screenWidth}
                        height={200}
                        title={'Popular'}
                        target='popular_products'
                    />
                </ScrollView>
            </View>
        )
    }
}
const styled = StyleSheet.create({
    titleContainer: {
        paddingVertical: 10
    }
})