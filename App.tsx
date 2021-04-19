import React from 'react';

import {View, Text, StyleSheet} from 'react-native'


export default function App() {
  return(
    <View style={styles.container}>
      <Text style={styles.title}>
        Bem-vindo a Next Level Week 
      </Text>
      <Text style={styles.description}>
        NLW #5
      </Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    backgroundColor:'#999'
  },

  title: {
    fontSize:22,
    color:'#333',
    fontWeight:'bold'
  },

  description: {
    fontSize:12,
    color:'#666',

  }

})