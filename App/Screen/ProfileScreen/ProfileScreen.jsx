import { View, Image, StyleSheet, Text } from 'react-native'
import React from 'react'
import { useUser } from '@clerk/clerk-expo'
import { Feather } from '@expo/vector-icons';
import Colors from '../../../Utils/Colors';

export default function ProfileScreen() {
  const { user } = useUser();
  return (
    <View style={{
      backgroundColor: Colors.GRAY
    }}>
      <Text style={{
        padding: 20,
        fontFamily: 'montserrat-medium',
        fontSize: 30
      }}>My Profile</Text>
      <View
        style={styles.container}
      >
        <Image source={{ uri: user?.imageUrl }}
          style={{ width: 150, height: 150, borderRadius: 99 }}
        />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 150


  }
})