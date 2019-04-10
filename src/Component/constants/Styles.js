import React, { Component } from 'react'
import {
    StyleSheet
} from 'react-native'

export const Styles = StyleSheet.create({
    slide: {
        height: 300,
        paddingVertical: 8
    },
    card: {
        borderColor: '#000',
        borderWidth: 1,
        alignItems: 'center',
        height: 230,
        borderRadius: 25,
        overflow: 'hidden',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 11,
        },
        shadowOpacity: 0.55,
        shadowRadius: 14.78,

        elevation: 22,
    },
    cardImage: {
        height: 145,
        borderRadius: 25,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25
    },
    cardText: {
        color: '#FFF',
        justifyContent: 'center',
        //paddingHorizontal: 15
        //textAlign: 'center',
    },
    title: {
        backgroundColor: '#66595D',
        paddingTop: 8,
        //justifyContent: 'center',
        //textAlign: 'center',
        height: 85,
        width: '100%'
    },
    carouselTitleContainer: {

    }
})

