import { View, Image, StyleSheet } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Feather } from '@expo/vector-icons';
import Colors from '../../../Utils/Colors';

export default function Header() {
    const {user}=useUser();
  return (
    <View
    style={styles.container}
    >
      <Image source={{uri:user?.imageUrl}}
      style={{width:45,height:45,borderRadius:99}}
      />
      <Image source={require('./../../../assets/images/logo.png')}
        style={{width:99,height:65,objectFit:'contain',
        backgroundColor:Colors.WHITE_TRANSP, borderRadius:99}}
      />
      <Feather name="filter" size={28} color="white" />
      
    </View>
  )
}
const styles = StyleSheet.create({
    container:{
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        
    }
})