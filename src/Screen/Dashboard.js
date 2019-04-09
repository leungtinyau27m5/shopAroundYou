import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Image,
    BackHandler,
    StyleSheet,
    Dimensions,
    ScrollView,
    TouchableOpacity
} from 'react-native'
import { NavigationEvents } from 'react-navigation'
import LinearGradient from 'react-native-linear-gradient'
import Recommendation from '../Component/Recommendation'

const styledSetting = StyleSheet.create({
    titleContainer: {
        fontSize: 22,
        paddingVertical: 8,
        backgroundColor: '#323232',
        color: '#FFF',
        paddingHorizontal: 15
    },
    itemTextContainer: {
        fontSize: 16,
        paddingVertical: 8
    }
})
function Item(props) {
    return (
        <TouchableOpacity style={styledSetting.titleContainer}>
            <Text style={styledSetting.title}>{props.itemName}</Text>
        </TouchableOpacity>
    )
}
class SettingBlock extends Component {
    constructor(props) {
        super()
        this.state = {

        }
    }
    render() {
        return (
            <View style={{marginTop: 55}}>

            </View>
        )
    }
}
export default class Dashboard extends Component {
    componentDidMount() {
        
    }
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    sceneIsFocus = () => {
        BackHandler.addEventListener('hardwareBackPress', this.backToHomeScreen)
    }
    backToHomeScreen = () => {
        this.props.navigation.navigate('Home')
        BackHandler.removeEventListener('hardwareBackPress', this.backToHomeScreen)
        return true
    }
    render() {
        return (
            <View>
                <NavigationEvents 
                onDidFocus={()=> this.sceneIsFocus()}/>
                <View
                    style={[styled.headerContainer]}
                >
                    <View style={[styled.iconContainer]}>
                        <LinearGradient 
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 1}}
                            colors={['#4DFF88', '#149F5C']}
                            style={[styled.headerBottom]}>
                            <View style={{paddingTop: 15}}>
                                <View style={{
                                    paddingHorizontal: 20,
                                    justifyContent: 'space-between',
                                    flexDirection: 'row'
                                }}>
                                    <TouchableOpacity style={{}}>
                                        <Text>LogIn</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{}}>
                                        <Text>LogIn</Text>
                                    </TouchableOpacity>
                                </View>
                                <Image
                                    source={require('../assets/img/KLB_01.jpg')}
                                    style={styled.avatar}
                                />
                                <Text style={styled.myName}>
                                Your User name
                                </Text>
                            </View>
                        </LinearGradient>
                    </View>
                </View>
                <ScrollView
                    style={[styled.contentContainer]}
                >
                    <SettingBlock 
                    />
                    <Recommendation
                        width={window.width}
                        height={200}
                        title={'Your Recent Interests'}
                        target='popular_products'
                    />
                </ScrollView>
            </View>
        )
    }
}
const window = Dimensions.get('window')
const styled = StyleSheet.create({
    headerContainer: {
        alignSelf: 'center',
        width: window.width,
        overflow: 'hidden',
        height: window.width / 1.7,
        backgroundColor: '#FFF'
    },
    iconContainer: {
        borderRadius: window.width,
        width: window.width * 2,
        height: window.width * 2,
        marginLeft: -(window.width / 2),
        position: 'absolute',
        bottom: 0,
        overflow: 'hidden'
    },
    headerBottom: {
        height: window.width / 1.7,
        width: window.width,
        position: 'absolute',
        bottom: 0,
        marginLeft: window.width / 2,
        textAlign: 'center'
        //backgroundColor: '#9DD6EB'
    },
    myName: {
        marginTop: 10,
        fontSize: 20,
        color: '#FFF',
        textShadowRadius: 3,
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 1)',
        textShadowOffset: {width: 3, height: -1},
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    avatar: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width: window.width * 0.3,
        height: window.width * 0.3,
        borderRadius: window.width * 0.3 / 2,
    },
    contentContainer: {
        backgroundColor: '#FFF',
    }
})