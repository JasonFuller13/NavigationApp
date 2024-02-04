import { View, Text } from 'react-native'
import React, { useContext } from 'react'
import { Marker } from 'react-native-maps'
import { SelecedMarkerContext } from '../../Context/SelectedMarkerContext'

export default function Markers({index, place}) {
  
    const {selectedMarker, setSelectedMarker}=useContext(SelecedMarkerContext);
    return (
    <Marker
          coordinate={{
            latitude:place.location?.latitude,
            longitude:place.location?.longitude,
          }}

          onPress={()=>setSelectedMarker(index)}
        >
          {/* <Image source={require('./../../../assets/images/car-marker.png')}
            style={{width:60,height:90}}
        />*/}
        </Marker>
  )
}