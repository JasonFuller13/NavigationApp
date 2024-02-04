import { View, Text } from 'react-native'
import React from 'react'
import HomeScreen from '../Screen/HomeScreen/HomeScreen';
import ProfileScreen from '../Screen/ProfileScreen/ProfileScreen';
import FavoriteScreen from '../Screen/FavoriteScreen/FavoriteScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import Colors from '../../Utils/Colors';

const Tab = createBottomTabNavigator();

export default function TabNavigation() {
  return (
    <Tab.Navigator screenOptions={{
      headerShown:false}}>
      <Tab.Screen name="Home" 
      component={HomeScreen}
    options={{
      tabBarLabel:'Search',
      tabBarActiveTintColor:Colors.PRIMARY,
      tabBarIcon:({color,size})=>(
          <Ionicons name="search-sharp" 
          size={size} color={color} />
        )
    }} />
    <Tab.Screen name="Favorite" 
      component={FavoriteScreen} 
      options={{
        tabBarLabel:'Favorite',
        tabBarActiveTintColor:Colors.PRIMARY,
        tabBarIcon:({color,size})=>(
          <MaterialIcons name="favorite" 
          size={size} color={color} />
          )
      }}/>
      <Tab.Screen name="Profile" 
      component={ProfileScreen} 
      options={{
        tabBarLabel:'Me',
        tabBarActiveTintColor:Colors.PRIMARY,
        tabBarIcon:({color,size})=>(
          <FontAwesome name="user" 
          size={size} color={color} />
        )
      }}
   />
      
    </Tab.Navigator>
  )
}