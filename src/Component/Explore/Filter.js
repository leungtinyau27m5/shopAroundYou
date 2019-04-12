import React, { Component } from 'react'
import {
    View,
    Text,
    Button,
    Image,
    StyleSheet,
    BackHandler,
    Dimensions,
    TouchableOpacity,
    Picker,
    TextInput
} from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import RNPickerSelect from 'react-native-picker-select'

const rangeM = [
    { label: '<500m', value: 500 },
    { label: '<800m', value: 800 },
    { label: '<1500m', value: 1500 },
    { label: '<2000m', value: 2000 },
    { label: '<3000m', value: 3000 },
    { label: 'unlimited', value: 0 }
]
const shopTypes = [
    { label: 'all', value: 0 },
    { label: 'Tutor', value: 1 },
    { label: '五金鋪', value: 2 },
    { label: '通渠', value: 3 }
]
const shopRates = [
    { label: 'all', value: 0 },
    { label: '1 star', value: 1 },
    { label: '2 star', value: 2 },
    { label: '3 star', value: 3 },
    { label: '4 star', value: 4 },
    { label: '5 star', value: 5 },
]
export default class Filter extends Component {
    constructor(props) {
        super()
        this.state = {
            rangeInM: 100,
            shopType: 0,
            shopRate: 5
        }
        this._rangeInMPicker = null
        this._shopType = null
        this._shopRate = null
    }
    prepareData = () => {
        this.props.doFiltering(this.state)
    }
    render() {
        const screenWidth = Dimensions.get('window').width
        const screenHeight = Dimensions.get('window').height
        return (
            <View
                style={{
                    width: screenWidth * 0.9,
                    height: screenHeight * 0.9,
                    backgroundColor: '#FEEADD',
                    borderRadius: 15,
                    overflow: 'hidden'
                }}
            >
                <View style={styles.header}>
                    <View style={{height: 50, justifyContent: 'center'}}>
                        <Text style={{fontSize: 20, color: '#EEE', fontWeight: 'bold'}}>Shop Filter</Text>
                    </View>
                    <TouchableOpacity 
                        onPress={() => this.props.showFilterModal()}
                        style={{
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: 50,
                            width: 50,
                            position: 'absolute',
                            right: 0,
                            padding: 8,
                        }}
                    >
                        <Ionicons
                            style={styles.closeButton}
                            name={'ios-close'}
                            size={32}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.body}>
                    <View style={styles.filterItem}>
                        <Text style={styles.filterItemText}>Range (m)</Text>
                        <RNPickerSelect
                            //placeholder={placeholder}
                            items={rangeM}
                            useNativeAndroidPickerStyle={false}
                            onValueChange={value => {
                                this.setState({
                                    rangeInM: value,
                                });
                            }}
                            onUpArrow={() => {
                                //this.inputRefs.firstTextInput.focus();
                            }}
                            onDownArrow={() => {
                                //this.inputRefs.favSport1.togglePicker();
                            }}
                            style={pickerSelectStyles}
                            value={this.state.rangeInM}
                            ref={el => {
                                this._rangeInMPicker = el;
                            }}
                        />
                    </View>
                    <View style={styles.filterItem}>
                        <Text style={styles.filterItemText}>Shop Type</Text>
                        <RNPickerSelect
                            //placeholder={placeholder}
                            items={shopTypes}
                            useNativeAndroidPickerStyle={false}
                            onValueChange={value => {
                                this.setState({
                                    shopType: value,
                                });
                            }}
                            onUpArrow={() => {
                                //this.inputRefs.firstTextInput.focus();
                            }}
                            onDownArrow={() => {
                                //this.inputRefs.favSport1.togglePicker();
                            }}
                            style={pickerSelectStyles}
                            value={this.state.shopType}
                            ref={el => {
                                this._shopType = el;
                            }}
                        />
                    </View>
                    <View style={styles.filterItem}>
                        <Text style={styles.filterItemText}>Shop Rating</Text>
                        <RNPickerSelect
                            //placeholder={placeholder}
                            items={shopRates}
                            useNativeAndroidPickerStyle={false}
                            onValueChange={value => {
                                this.setState({
                                    shopRate: value,
                                });
                            }}
                            onUpArrow={() => {
                                //this.inputRefs.firstTextInput.focus();
                            }}
                            onDownArrow={() => {
                                //this.inputRefs.favSport1.togglePicker();
                            }}
                            style={pickerSelectStyles}
                            value={this.state.shopRate}
                            ref={el => {
                                this._shopRate = el;
                            }}
                        />
                    </View>
                    <View style={{ marginTop: 25, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity 
                            onPress={() => this.prepareData()}
                            style={[styles.buttons, styles.OnGoingButton]}>
                            <Text style={styles.buttonText}>Filter</Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            onPress={() => this.props.showFilterModal()}
                            style={[styles.buttons, styles.cancelButton]}>
                            <Text style={styles.buttonText}>Cancel</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    header: {
        height: 50,
        borderTopRightRadius: 15,
        borderTopLeftRadius: 15,
        backgroundColor: '#FF9A50',
        justifyContent: 'center',
        flexDirection: 'row'
    },
    closeButton: {
        color: '#FFF',
        fontWeight: 'bold',
    },
    body: {
        flex: 1,
        backgroundColor: '#FFF',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
    },
    filterItem: {
        paddingVertical: 8,
        paddingHorizontal: 15,
        height: 90,
        justifyContent: 'center'    
    },
    filterItemText: {
        fontSize: 18,
    },
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
    OnGoingButton: {
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
const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
      fontSize: 16,
      paddingVertical: 12,
      paddingHorizontal: 10,
      borderWidth: 1,
      borderColor: 'gray',
      borderRadius: 4,
      color: '#333',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
    inputAndroid: {
      fontSize: 16,
      paddingHorizontal: 10,
      paddingVertical: 8,
      borderWidth: 0.5,
      borderColor: '#FF8A8A',
      borderRadius: 8,
      color: 'black',
      paddingRight: 30, // to ensure the text is never behind the icon
    },
  });
  