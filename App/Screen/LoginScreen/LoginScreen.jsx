import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import Colors from '../../../Utils/Colors'
import * as WebBrowser from "expo-web-browser";
import { useWarmUpBrowser } from '../../../hooks/warmUpBrowser';
import { useOAuth } from '@clerk/clerk-expo';


WebBrowser.maybeCompleteAuthSession();
export default function LoginScreen() {
  useWarmUpBrowser();
 
  const { startOAuthFlow } = useOAuth({ strategy: "oauth_google" });
  const onPress=async()=>{
    try {
      const { createdSessionId, signIn, signUp, setActive } =
        await startOAuthFlow();
 
      if (createdSessionId) {
        setActive({ session: createdSessionId });
      } else {
        // Use signIn or signUp for next steps such as MFA
      }
    } catch (err) {
      console.error("OAuth error", err);
    }
  }
  return (
    <View style={{
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:30
    }}>
      <Image source={require('./../../../assets/images/logo.png')}
            style={styles.logoImage}
      />
      <Image source={require('./../../../assets/images/Nightclub.png')}
            style={styles.bgImage}
      />
      <View style={{padding:20}}>
          <Text style={styles.heading}>Your Ultimate Nightclub Finder</Text>
          <Text style={styles.desc}>Find your next move in one click</Text>
          <TouchableOpacity style={styles.button}
          onPress={onPress}>
            <Text style={styles.buttonText}>Login With Google</Text>
          </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    logoImage:{
        width:120,
        height:100,
        objectFit:'contain'
    },
    bgImage:{
     width:'110%',
      height:250,
      marginTop:20,
      objectFit:'cover'
    },
    heading:{
      fontSize:25,
      fontFamily:'montserrat-bold',
      textAlign:'center',
      marginTop:20
    },
    desc:{
      fontSize:17,
      fontFamily:'montserrat',
      marginTop:15,
      textAlign:'center',
      color:Colors.GRAY
    },
    button:{
      backgroundColor:Colors.PRIMARY,
      padding:16,
      display:'flex',
      borderRadius:99,
      marginTop:30
    },
    buttonText:{
      color:Colors.WHITE,
      textAlign:'center',
      fontFamily:'montserrat-bold',
      fontSize:17
    }
})