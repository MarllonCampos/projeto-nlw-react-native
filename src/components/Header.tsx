import React, {useEffect,useState} from 'react'
import {  Text, Image, StyleSheet, View } from 'react-native'
import { getStatusBarHeight } from 'react-native-iphone-x-helper'
import userImg from '../assets/marllon.png'
import colors from '../styles/colors'
import fonts from '../styles/fonts'
import AsyncStorage from '@react-native-async-storage/async-storage'
export function Header() {
    const [userName,setUserName] = useState<string>();


    async function getUserNameFromAsyncStorage() {
        const user = await AsyncStorage.getItem('@plantmanager:user');
        setUserName(user || '');
    }

    
    useEffect(() => {
        getUserNameFromAsyncStorage();
    },[userName])
    return (
        <View style={styles.container}>

            <View>
                <Text style={styles.greeting}>Olá</Text>
                <Text style={styles.username}>{userName}</Text>
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