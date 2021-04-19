import React, {useState} from 'react';

import {SafeAreaView ,Image, Text, TouchableOpacity, View, StyleSheet} from 'react-native'

import wateringImg from '../assets/watering.png';
import { Button } from '../components/Button';
import colors from '../styles/colors'

export function Welcome() {
    const [isVisible, setisVisible] = useState(true);

    function handleVisibility() {
        setisVisible(!isVisible)
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.title}> 
                Gerencia {'\n'}
                suas plantas {'\n'}
                de forma fácil
            </Text>

            {
                isVisible && 
                <Image source={wateringImg} style={styles.image} />
            }
            


            <Text style={styles.subtitle}>
                Não esqueça mais de regar suas plantas.
                Nós cuidamos de lembrar você sempre que precisar.
            </Text>


        <Button title='>' />
          
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex:1,
        alignItems:'center',
        justifyContent:'space-between',
        paddingTop:32,
    },
    title:{
        fontSize:32,
        fontWeight:'bold',
        textAlign:'center',
        color: colors.heading,
        marginTop:38,
    },
    image: {
        width:292,
        height:284
    },
    subtitle: {
        textAlign:'center',
        fontSize:18,
        paddingHorizontal:20,
        color:colors.heading,
    },

   
})