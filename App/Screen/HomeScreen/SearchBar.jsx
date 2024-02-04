import { View, Text } from 'react-native'
import React from 'react'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Colors from '../../../Utils/Colors';
import { Ionicons } from '@expo/vector-icons';

export default function SearchBar({searchedLocation}) {
    
  return (
    <View style={{
      display:'flex',
      flexDirection:'row',
      marginTop:15,
      paddingHorizontal:5,
      backgroundColor:Colors.WHITE,
      borderRadius:6
    }}>
        <Ionicons name="location" size={24} color={Colors.GRAY} 
        style={{paddingTop:10, paddingLeft:5}} />
      <GooglePlacesAutocomplete
      placeholder='Search nearby clubs' 
      fetchDetails={true}
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        
        searchedLocation(details?.geometry?.location)
      }}
      query={{
        key: 'AIzaSyC723kx6S0GHAYI7Zj_7fESGpv_7x92RSU',
        language: 'en',
      }}
    />
    </View>
  )
}