import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import AsyncStorage from '@react-native-async-storage/async-storage'

import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    TouchableWithoutFeedback,
    Keyboard,
    Alert
} from 'react-native';
import { Button } from '../components/Button';

import colors from '../styles/colors'
import fonts from '../styles/fonts';


export function UserIdentification() {
    const navigation = useNavigation();

    const [isFocused, setIsFocused] = useState(false)
    const [isFilled, setIsFilled] = useState(false)
    const [name, setName] = useState<string>()



    function handleInputBlur() {
        setIsFocused(false)
        setIsFilled(!!name);
    }

    function handleInputFocus() {
        setIsFocused(true)
    }

    function HandleInputChange(value: string) {
        setIsFilled(!!value)
        setName(value)
    }

    async function HandleSubmit() {
        if(!name)    return Alert.alert('Me diz como chamar você 😿')
        
        // await AsyncStorage.setItem('@plantmanager:user',name,() => {Alert.alert('Salvo no dispositivo')}) Utilizando callback (da pra chamar um component)

        try {
            await AsyncStorage.setItem('@plantmanager:user',name)
            navigation.navigate('Confirmation')
        }catch {
            return Alert.alert('Não foi possível salvar o seu nome 😿')
        }
    }
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.content}>
                        <View style={styles.form}>
                            <View style={styles.header}>
                                <Text style={styles.emoji}>
                                    {isFilled ? '😄' : '😃'}
                                </Text>

                                <Text style={styles.title}>
                                    Como podemos {'\n'}
                                chamar você
                            </Text>
                            </View>

                            <TextInput
                                style={
                                    [styles.input,
                                    (isFocused || isFilled) && { borderColor: colors.green }
                                    ]

                                }
                                placeholder="Digite um nome"
                                onBlur={handleInputBlur}
                                onFocus={handleInputFocus}
                                onChangeText={HandleInputChange}

                            />
                            <View style={styles.footer}>
                                <Button
                                    onPress={HandleSubmit}
                                    title="Confirmar"
                                />
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-around'

    },
    content: {
        flex: 1,
        width: '100%',
    },
    form: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 54,
    },
    header: {
        alignItems: 'center'
    },
    title: {
        fontSize: 24,
        textAlign: 'center',
        color: colors.heading,
        fontFamily: fonts.heading,
        lineHeight: 32,
        marginTop: 20,
    },
    emoji: {
        fontSize: 44
    },
    input: {
        borderBottomWidth: 1,
        borderColor: colors.gray,
        color: colors.heading,
        width: '100%',
        fontSize: 18,
        marginTop: 50,
        padding: 10,
        textAlign: 'center'
    },
    footer: {
        marginTop: 40,
        width: '100%',
        paddingHorizontal: 20


    }
})