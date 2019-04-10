import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    BackHandler,
    Image,
    StyleSheet
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import { Fumi } from 'react-native-textinput-effects'

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
                overflow: 'hidden',
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
                        alignItems: 'center',
                        textAlign: 'center',
                        width: '100%'
                    }}>
                        <Fumi
                            style={{
                                width: '80%',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderWidth: 1
                            }}
                            label={'Merchant Code (shop use only)'}
                            iconClass={FontAwesomeIcon}
                            iconName={'building-o'}
                            iconColor={'#007ACC'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                        />
                        <Fumi
                            style={{
                                marginTop: 10,
                                width: '80%',
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderWidth: 1
                            }}
                            label={'User Name'}
                            iconClass={FontAwesomeIcon}
                            iconName={'user'}
                            iconColor={'#f95a25'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                        />
                        <Fumi
                            style={{
                                width: '80%',
                                marginTop: 10,
                                marginLeft: 'auto',
                                marginRight: 'auto',
                                borderWidth: 1
                            }}
                            label={'******'}
                            iconClass={FontAwesomeIcon}
                            iconName={'key'}
                            iconColor={'#E5E510'}
                            iconSize={20}
                            iconWidth={40}
                            inputPadding={16}
                        />
                        <View style={{ marginTop: 55, flexDirection: 'row' }}>
                            <TouchableOpacity 
                                onPress={() => this.props.userLogin()}
                                style={[styled.buttons, styled.loginButton]}>
                                <Text style={styled.buttonText}>Login</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                onPress={() => this.props.showLoginModal()}
                                style={[styled.buttons, styled.cancelButton]}>
                                <Text style={styled.buttonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
const styled = StyleSheet.create({
    buttons: {
        paddingHorizontal: 20,
        paddingVertical: 10,
        borderColor: '#FFF',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: '#FFD600',
        marginLeft: 5,
        marginRight: 5
    },
    loginButton: {
        backgroundColor: '#00D580'
    },
    cancelButton: {
        backgroundColor: '#CC0B00'
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF'
    }
})