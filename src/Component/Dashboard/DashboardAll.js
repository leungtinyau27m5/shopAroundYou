import React, { Component } from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image
} from 'react-native'

function ItemContainer(props) {
    return (
        <View style={styles.itemContainer}>
            {props.items.map((item, index) => {
                return (
                    <TouchableOpacity key={`item-${item}`}>
                        <Text style={[styles.itemTitle, index % 2 == 0 ? {backgroundColor: '#FFF'} : {backgroundColor: '#F6F6F6'}]}>{item}</Text>
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
            
        }
    }
    render() {
        return (
            <View style={[{marginTop: 35}]}>
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.itemHeader}>My Account</Text>
                </View>
                <ItemContainer items={["Settings", "My addresses", "My comments"]} />
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.itemHeader}>Orders</Text>
                </View>
                <ItemContainer items={["Records", "Payments"]} />
                <View style={styles.itemHeaderContainer}>
                    <Text style={styles.itemHeader}>About Us</Text>
                </View>
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