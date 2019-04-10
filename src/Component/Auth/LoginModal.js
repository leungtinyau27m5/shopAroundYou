import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    BackHandler,
    Image
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import LinearGradient from 'react-native-linear-gradient';

export default class LoginModal extends Component {
    componentDidMount() {
        console.log('mount')
        //BackHandler.addEventListener('hardwareBackPress', () => {console.log('byebye')})
    }
    componentWillUnmount() {
        //BackHandler.removeEventListener('hardwareBackPress', this.props.showLoginModal)
        console.log('unmount')
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height
        return (
            <View style={{
                width: screenWidth * 0.9,
                height: screenHeight * 0.9,
                backgroundColor: '#FFF',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 25,
                overflow: 'hidden'
            }}>
                <LinearGradient 
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={['#3CB0FF', '#007ACC']}
                    style={{
                        alignItems: 'flex-end',
                        paddingRight: 20,
                        backgroundColor: '#358C00'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.showLoginModal()}
                        style={{
                            
                        }}
                    >
                        <Ionicons
                            style={{color: '#FFF'}}
                            name="ios-close"
                            size={55}
                        />
                    </TouchableOpacity>
                </LinearGradient>
                <View>
                    <View
                        style={{
                            height: 180,
                            width: 180,
                            marginLeft: 'auto',
                            marginRight: 'auto',
                            borderRadius: 90,
                            overflow: 'hidden'
                        }}
                    >
                        <Image
                            source={require('../../assets/img/user.png')}
                            style={{
                                width: 180,
                                height: 180
                            }}
                        />
                    </View>
                    <View style={{
                        marginTop: 35,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <View><Text>asdf</Text></View>
                    </View>
                </View>
            </View>
        )
    }
}