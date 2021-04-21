import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList } from 'react-native'
import { EnviromentButton } from '../components/EnvironmentButton'

import { Header } from '../components/Header'
import { api } from '../services/api'


import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentProps {
    key:string,
    title:string
}


export function PlantSelect() {
    const [enviroment,setEnviroment] = useState<EnviromentProps[]>([]);
    useEffect(() => {
        async function fetchEnviroment() {
            const { data }  = await api.get('plants_environments');

            setEnviroment([{key:'all',title:'Todos'}, ...data])
        }

        fetchEnviroment();
    },[])
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Header />

                <Text style={styles.title}>Em qual ambiente</Text>
                <Text style={styles.subtitle}>você quer colocar sua planta?</Text>

            </View>
           
           <View>
               <FlatList 
                    data={enviroment} 
                    renderItem={({item}) => (<EnviromentButton key={`${item.key}`} title={item.title} />)} 
                    horizontal 
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                    ListHeaderComponent={<View />}
                    ListHeaderComponentStyle={{ marginRight: 32 }}
                />
           </View>
         </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    header: {
        paddingHorizontal: 30
    },
    title: {
        fontSize: 17,
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 20,
        marginTop: 25

    },
    subtitle: {
        fontSize: 17,
        fontFamily: fonts.text,
        lineHeight: 20,
        color: colors.heading,
    },
    enviromentList:{
        height:40,
        justifyContent:'center',
        paddingBottom:5,
        marginVertical:32,
    }
})




