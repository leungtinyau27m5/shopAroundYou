import React, { Component } from 'react'
import AsyncStorage from '@react-native-community/async-storage'

export async function personalData() {
    let temp = await AsyncStorage.getItem('personalData')
    if (temp !== null) {
        temp = JSON.parse(temp)
        return temp
    } else {
        return null
    }
}
/*
export default class Data extends Component {
    constructor(props) {
        super()
        this.state = {
            personalData: null
        }
        this._getPersonalData()
    }
    _getPersonalData = async() => {
        let temp = await AsyncStorage.getItem('personalData')
        if (temp !== null) {
            temp = JSON.parse(temp)
            this.setstate({
                personalData: temp
            })
        }
    }
}*/
