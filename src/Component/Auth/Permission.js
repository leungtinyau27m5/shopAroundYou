import React, { Component } from 'react'
import {
    PermissionsAndroid,
    ToastAndroid,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service'

export const geolocation = async() => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
                title: 'The app wants to access your location',
                message: 
                    'Locate yourself' + 
                    'show what shops around you',
                buttonNeutral: 'Ask Me Later',
                buttonNegative: 'Cancel',
                buttonPositive: 'OK'
            }
        )
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //ToastAndroid.show('Geolocation can be used', ToastAndroid.SHORT)
            Geolocation.getCurrentPosition(
                (position) => {
                    AsyncStorage.setItem('location', JSON.stringify(position))
                    //console.log(position)
                },
                (error) => {
                    console.log('Geolocation error', error.message)
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
            )
        } else {
            let oldLocation = AsyncStorage.getItem('location')
                if (oldLocation == null)
                    ToastAndroid.show('Geolication is not granted', ToastAndroid.SHORT)
                else
                    ToastAndroid.show('Using last location', ToastAndroid.SHORT)
        }
    } catch (err) {
        console.warn(err)
    }
}