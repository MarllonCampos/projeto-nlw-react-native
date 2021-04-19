import React from 'react';

import {View, Text, StyleSheet} from 'react-native'
import { Welcome } from './src/pages/Welcome';


export default function App() {
  return(
    <Welcome />
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