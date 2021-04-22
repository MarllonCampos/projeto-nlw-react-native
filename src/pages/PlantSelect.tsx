import { useNavigation } from '@react-navigation/core'
import React, { useEffect, useState } from 'react'
import { View, StyleSheet, Text, FlatList,ActivityIndicator } from 'react-native'
import { EnviromentButton } from '../components/EnvironmentButton'

import { Header } from '../components/Header'
import { Load } from '../components/Load'
import { PlantCardPrimary } from '../components/PlantCardPrimary'
import { PlantProps } from '../libs/storage'

import { api } from '../services/api'

import colors from '../styles/colors'
import fonts from '../styles/fonts'

interface EnviromentProps {
    key: string,
    title: string
}



export function PlantSelect() {
    const [enviroment, setEnviroment] = useState<EnviromentProps[]>([]);
    const [plants, setPlants] = useState<PlantProps[]>([]);
    const [enviromentSelected, setEnviromentSelected] = useState('all')
    const [filteredPlants, setFilteredPlants] = useState<PlantProps[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const [page, setPage] = useState(1)
    const [loadingMore, setLoadingMore] = useState(false)

    const navigation = useNavigation();

    function handleEnviromentSelected(environment: string) {
        setEnviromentSelected(environment)
        if (environment == 'all') {
            return setFilteredPlants(plants)
        }
        const filtered = plants.filter(plant =>
            plant.environments.includes(environment)
        )
        setFilteredPlants(filtered)
    }


    async function fetchPlants() {
        const { data } = await api.get('plants', {
            params: {
                _sort: 'name',
                _order: 'asc',
                _page: page,
                _limit: 6
            }
        });

        if (!data) {
            return setIsLoading(true)
        } 
        if (page > 1) {
            setPlants(oldValue => [...oldValue, ...data])
            setFilteredPlants(oldValue => [...oldValue, ...data])
          } else {
            setPlants(data);
            setFilteredPlants(data);
          }

        setIsLoading(false)
        setLoadingMore(false)
    }




    function handleFetchMore(distance: number) {

        if (distance < 1) return

        setLoadingMore(true)
        setPage(oldValue => oldValue + 1)
        fetchPlants();
    }


    function handlePlantSelect(plant: PlantProps) {
        navigation.navigate(`PlantSave`,{plant})
    }


    useEffect(() => {
        async function fetchEnviroment() {
            const { data } = await api.get('plants_environments', {
                params: {
                    _sort: 'title',
                    _order: 'asc'
                }
            });

            setEnviroment([{ key: 'all', title: 'Todos' }, ...data])
        }

        fetchEnviroment();
    }, [])

    useEffect(() => {


        fetchPlants();

    }, [])

    if (isLoading) {
        return <Load />
    }

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
                    keyExtractor={(item) => String(item.key)}
                    renderItem={({ item }) => (
                        <EnviromentButton
                            active={item.key === enviromentSelected}
                            title={item.title}
                            onPress={() => { handleEnviromentSelected(item.key) }}
                        />)}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.enviromentList}
                    ListHeaderComponent={<View />}
                    ListHeaderComponentStyle={{ marginRight: 32 }}
                />
            </View>

            <View style={styles.plants}>

                <FlatList
                    data={filteredPlants}
                    keyExtractor={(item) => String(item.id)}
                    renderItem={({ item }) => (<PlantCardPrimary onPress={()=> {handlePlantSelect(item)}} data={item} />)}
                    showsVerticalScrollIndicator={false}
                    numColumns={2}
                    ListFooterComponent={loadingMore ? <ActivityIndicator style={{marginTop:5, marginBottom:10}} color={colors.green}/> : <View style={{marginTop:10}}/>} 
                    onEndReachedThreshold={0.1}

                    onEndReached={({distanceFromEnd}) => 
                        handleFetchMore(distanceFromEnd)
                }
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
    enviromentList: {
        height: 40,
        justifyContent: 'center',
        paddingBottom: 5,
        marginVertical: 32,
    },
    plants: {
        flex: 1,
        paddingHorizontal: 32,
        justifyContent: 'center'
    },

})




