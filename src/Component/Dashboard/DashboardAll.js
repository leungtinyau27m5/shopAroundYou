import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    ToastAndroid
} from 'react-native'
import Modal from 'react-native-modal'

function ItemContainer(props) {
    return (
        <View style={styles.itemContainer}>
            {props.items.map((item, index) => {
                return (
                    <TouchableOpacity 
                        onPress={() => item.onClickModal()}
                        key={`item-${item.name}-${index}`}>
                        <Text style={[styles.itemTitle, index % 2 == 0 ? {backgroundColor: '#FFF'} : {backgroundColor: '#F6F6F6'}]}>{item.name}</Text>
                    </TouchableOpacity>
                )
            })}
        </View>
    )
}

export default class DashboardAll extends Component {
    constructor(props) {
        super() 
        this.state = {
            activeSlide: 0,
            addressesModal: false,
            commentsModal: false,
            recordsModal: false,
        }
    }
    _showAddressModal = () => {
        this.setState((prevState) => ({
            addressesModal: !prevState.addressesModal
        }))
    }
    _showCommentsModal = () => {
        this.setState((prevState) => ({
            commentsModal: !prevState.commentsModal
        }))
    }
    _showRecordsModal = () => {
        this.setState((prevState) => ({
            recordsModal: !prevState.recordsModal
        }))
    }
    _notifyNotFinished(){
        ToastAndroid.show('Coming soon.....', ToastAndroid.SHORT)
    }
    render() {
        return (
            <View style={[{marginTop: 35}]}>
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.itemHeader}>My Account</Text>
                </View>
                <ItemContainer
                    items={[
                        {
                            name: "Settings",
                            onClickModal: this._notifyNotFinished
                        },
                        {
                            name: "My addresses",
                            onClickModal: this._showAddressModal
                        },
                        {
                            name: "My Comments",
                            onClickModal: this._showCommentsModal
                        },
                    ]}
                />
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.itemHeader}>Orders</Text>
                </View>
                <ItemContainer
                    items={[
                        {
                            name: "Records",
                            onClickModal: this._showRecordsModal
                        },
                        {
                            name: "Payments",
                            onClickModal: this._notifyNotFinished
                        }
                    ]}
                />
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.itemHeader}>About Us</Text>
                </View>
                <Modal
                    isVisible={this.state.addressesModal} 
                    onBackdropPress={() => this._showAddressModal()}
                    onBackButtonPress={() => {this.setState({ addressesModal: false })}}
                >
                    <View></View>
                </Modal>
                <Modal
                    isVisible={this.state.commentsModal} 
                    onBackdropPress={() => this._showCommentsModal()}
                    onBackButtonPress={() => {this.setState({ commentsModal: false })}}
                >
                    <View></View>
                </Modal>
                <Modal
                    isVisible={this.state.recordsModal} 
                    onBackdropPress={() => this._showRecordsModal()}
                    onBackButtonPress={() => {this.setState({ recordsModal: false })}}
                >
                    <View></View>
                </Modal>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    itemHeaderContainer: {
        paddingVertical: 15,
        paddingHorizontal: 15,
        backgroundColor: '#FFE1B5'
    },
    itemHeader: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#000',
        textShadowColor: 'rgba(255, 151, 151, 0.75)',
        textShadowOffset: {width: 1, height: 1},
        textShadowRadius: 1
    },
    itemTitle: {
        paddingVertical: 10,
        paddingHorizontal: 25,
        fontSize: 18,
        color: '#000',
        textShadowColor: 'rgba(217, 217, 255, 0.75)',
        textShadowOffset: {width: -1, height: 1},
        textShadowRadius: 1
    }
})