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
import BackgroundTimer from 'react-native-background-timer'
import {NavigationEvents} from 'react-navigation'
import Carousel from 'react-native-snap-carousel';

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
    filterResult = () => {

    }
    searchScreen = () => {

    }
    carouselIsClicked = (index) => {
        if (index == this._carousel.currentIndex)
            console.log('innnnn')
        else
            this._carousel.snapToItem(index)
    }
    _renderItem = ({item, index}) => {
        return (
            <TouchableOpacity style={styles.slide}
                onPress={() => { 
                //this._carousel.snapToItem(index)
                this.carouselIsClicked(index)
              }}
            >
                <View style={styles.card}>
                    <Image
                        style={styles.cardImage}
                        source={item.imageUri}
                    />
                    <View style={styles.title}>
                        <Text style={[styles.cardText, {fontSize: 18}]}>{item.shopName}</Text>
                        <Text style={styles.cardText}>
                            {item.text}
                        </Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height
        return(
            <View style={{paddingBottom: 100}}>
                <NavigationEvents onDidFocus={()=> console.log('it is focused')}/>
                <HeaderNav 
                    locateMyPosition={this.locateMyPosition}
                    searchScreen={this.searchScreen}
                    filterResult={this.filterResult}
                />
                <ScrollView>
                    <Text style={{
                        marginLeft: 'auto',
                        marginRight: 'auto',
                        fontSize: 26,
                        color: '#449954'}}>
                        Most Wellcome This Week
                    </Text>
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
const styles = StyleSheet.create({
    slide: {
        height: 300,
        paddingVertical: 20
    },
    card: {
        borderColor: '#000',
        borderWidth: 1,
        alignItems: 'center',
        height: 230,
        borderRadius: 25,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
    },
    cardImage: {
        height: 145,
        borderRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    cardText: {
        color: '#FFF',
        justifyContent: 'center',
        textAlign: 'center',
    },
    title: {
        backgroundColor: '#66595D',
        justifyContent: 'center',
        textAlign: 'center',
        height: 85,
        width: '100%'
    }
})