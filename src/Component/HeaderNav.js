import React, { Component } from 'react'
import {
    View,
    Image,
    StyleSheet
} from 'react-native'
import LinearGradient from 'react-native-linear-gradient'

import TouchableButton from './TouchableButton'

export default class HeaderNav extends Component {
    render() {
        return (
            <View>
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                    colors={['#FFCC80', '#FF4400']}
                    style={styles.header}
                >
                    <View style={styles.headerLogo}>
                        <Image 
                            source={require('../assets/img/all_around_you.png')}
                        />
                    </View>
                    <View style={{flex: 1, justifyContent: 'center', alignItems: 'flex-end'}}>
                        <View style={{flexDirection: 'row'}}>
                            <TouchableButton
                                spacing={5}
                                iconName="ios-funnel"
                                iconColor="#FFF"
                                iconSize={28}
                                handleOnClick={this.props.filterResult}
                            />
                            <TouchableButton
                                spacing={5}
                                iconName="ios-locate"
                                iconColor="#FFF"
                                iconSize={28}
                                handleOnClick={this.props.locateMyPosition}
                            />
                            <TouchableButton
                                spacing={5}
                                iconName="ios-search"
                                iconColor="#FFF"
                                iconSize={28}
                                handleOnClick={this.props.searchScreen}
                            />
                        </View>
                    </View>
                </LinearGradient>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        height: 72,
        flexDirection: 'row'
    },
    headerLogo: {
        marginLeft: 10,
        paddingTop: 5,
        color: '#00001A',
        flex: 1
    }
})