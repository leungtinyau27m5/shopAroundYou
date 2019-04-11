import React, { Component } from 'react'
import {
    View,
    Text,
    Dimensions,
    TouchableOpacity,
    Image,
    StyleSheet,
    ToastAndroid,
    Switch,
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';

export default class LogOutModal extends Component {
    render() {
        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height
        return (
            <View style={{
                width: screenWidth * 0.8,
                height: 200,
                backgroundColor: '#FFF',
                marginLeft: 'auto',
                marginRight: 'auto',
                borderRadius: 25,
                overflow: 'hidden',
            }}>
                <LinearGradient 
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={['#FFFFB3', '#FFFF00']}
                    style={{
                        alignItems: 'flex-end',
                        paddingRight: 20,
                        backgroundColor: '#358C00'
                    }}
                >
                    <TouchableOpacity
                        onPress={() => this.props.showLogOutModal()}
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
                <Text style={{
                    marginLeft: 'auto',
                    marginRight: 'auto',
                    fontSize: 22,
                    fontWeight: 'bold'
                }}>Do Your Want to Logout ??</Text>
                <View style={{justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{ marginTop: 55, flexDirection: 'row' }}>
                        <TouchableOpacity 
                            onPress={() => this.props.userLogout()}
                            style={[styled.buttons, styled.loginButton]}>
                            <Text style={styled.buttonText}>LogOut</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.showLogOutModal()}
                            style={[styled.buttons, styled.cancelButton]}>
                            <Text style={styled.buttonText}>Cancel</Text>
                        </TouchableOpacity>
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
    switchButtonText: {
        fontSize: 14,
        marginLeft: 8,
        marginRight: 8
    },
    loginButton: {
        backgroundColor: '#CC0B00'
    },
    cancelButton: {
        backgroundColor: '#00D580'
    },
    buttonText: {
        fontSize: 16,
        color: '#FFF'
    }
})