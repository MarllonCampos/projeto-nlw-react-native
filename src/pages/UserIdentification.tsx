import React from 'react';


import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TextInput,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { Button } from '../components/Button';

import colors from '../styles/colors'
import fonts from '../styles/fonts';


export function UserIdentification() {
    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <View style={styles.content}>
                    <View style={styles.form}>
                        <View style={styles.header}>
                            <Text style={styles.emoji}>
                                😄
                            </Text>

                            <Text style={styles.title}>
                                Como podemos {'\n'}
                                chamar você
                            </Text>
                        </View>

                        <TextInput
                            style={styles.input}
                            placeholder="Digite um nome"
                        />
                        <View style={styles.footer}>

                            <Button />

                        </View>
                    </View>
                </View>
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
        alignItems:'center'
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