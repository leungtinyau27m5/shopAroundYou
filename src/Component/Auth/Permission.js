import React, { Component } from 'react'
import {
    PermissionsAndroid,
    ToastAndroid,
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import Geolocation from 'react-native-geolocation-service'
import ImagePicker from 'react-native-image-picker'
import ImageCropPicker from 'react-native-image-crop-picker'
const options = {
    ititle: 'select your icon',
    storageOptions: {
        skipBackup: true,
        path: 'images',
    }
}
export let iconUri = null
export const imagePicker = async() => {
    try{
    ImagePicker.showImagePicker(options, (response) => {
        if (response.didCancel) {
            //ToastAndroid.show('Image picker is closed', ToastAndroid.SHORT)
        } else if (response.error) {
            ToastAndroid.show('permission is not granted', ToastAndroid.SHORT)
        } else {
            const source = { uri: response.uri }
            cropImage(source)        
        }
    }, () => {
    }).catch((err) => {

    })
    } catch (error) {
        
    }
}
export const cropImage = async(source) => {
    try {
        return new Promise((resolve, reject) => {
            ImageCropPicker.openCropper({
                path: source.uri,
                width: 400,
                height: 400
            }).then(async(image) => {
                await AsyncStorage.setItem('myIcon', image.path)
                iconUri = image
            }).catch(() => {

            })
        })
    } catch (err) {

    }
}
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