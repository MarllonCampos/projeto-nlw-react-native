import React from 'react'
import {  Text, Image, StyleSheet, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import userImg from '../assets/marllon.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'

export function Header() {
    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.username}>Marllon</Text>
            </View>

            <Image source={userImg} style={styles.image}/>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop:getStatusBarHeight(),
        paddingVertical:20
    },
    image:{
        width:70,
        height:70,
        borderRadius:35
    },
    greeting:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.text,
    },
    username:{
        fontSize:32,
        color:colors.heading,
        fontFamily:fonts.heading,
        lineHeight:40

    }
})