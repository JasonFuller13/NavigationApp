import { View, Text, Image, Dimensions, Pressable, ToastAndroid, Alert, Platform, Linking } from 'react-native'
import React from 'react'
import Colors from '../../../Utils/Colors'
import GlobalApi from '../../../Utils/GlobalApi'
import { FontAwesome5 } from '@expo/vector-icons';
import { deleteDoc, getFirestore } from "firebase/firestore";
import { app } from '../../../Utils/FirebaseConfig';
import { doc, setDoc } from "firebase/firestore";
import { LinearGradient } from 'expo-linear-gradient';
import { useUser } from '@clerk/clerk-expo';
import { FontAwesome } from '@expo/vector-icons';
export default function PlaceItem({ place, isFav, markedFav }) {
  const PLACE_PHOTO_BASE_URL = "https://places.googleapis.com/v1/";
  const { user } = useUser();
  const db = getFirestore(app);
  const onSetFav = async (place) => {
    await setDoc(doc(db, "club-fav-place", (place.id).toString()),
      {
        place: place,
        email: user?.primaryEmailAddress?.emailAddress
      }
    );
    markedFav()
    Alert.alert('Favorite Added')
  }

  const onRemoveFav = async (placeId) => {
    await deleteDoc(doc(db, "club-fav-place", placeId.toString()));
    Alert.alert('Favorite Removed')
    markedFav()
  }

  const onDirectionClick = () => {
    const url = Platform.select({
      ios: "maps:" + place.location.latitude + "," + place?.location?.longitude + "?q=" + place?.formattedAddress,
      andriod: "geo" + place.location.latitude + "," + place?.location?.longitude + "?q=" + place?.formattedAddress,
    });

    Linking.openURL(url);
  }
  return (
    <View
      style={{
        backgroundColor: Colors.GRAY,
        margin: 5,
        borderRadius: 10,
        width: Dimensions.get('screen').width * .9
      }}
    >
      <LinearGradient
        colors={['transparent', 'white', 'white', 'gray']}
      >
        {!isFav ? <Pressable style={{
          position: 'absolute', right: 0,
          margin: 5
        }}
          onPress={() => onSetFav(place)}
        >
          <FontAwesome5 name="heart" size={40}
            color="white" />
        </Pressable> :

          <Pressable style={{
            position: 'absolute', right: 0,
            margin: 5
          }}
            onPress={() => onRemoveFav(place.id)}
          >
            <FontAwesome name="heart" size={40}
              color={Colors.PRIMARY} />
          </Pressable>}

        <Image source={
          place?.photos ?
            {
              uri: PLACE_PHOTO_BASE_URL + place?.photos[0]?.name +
                "/media?key=" + GlobalApi?.API_KEY + "&maxHeightPx=800&maxWidthPx=1200"
            }
            : require('./../../../assets/images/Nightclub.png')}
          style={{
            width: '100%', borderRadius: 10,
            height: 190, zIndex: -1
          }}
        />
        <View style={{ padding: 15 }}>
          <Text style={{
            fontSize: 23,
            fontFamily: 'montserrat-bold'
          }}>{place.displayName?.text}</Text>
          <View style={{
            marginTop: 5
          }}>
            <Text style={{
              fontFamily: 'montserrat'
            }}>{place?.shortFormattedAddress}</Text>
            <Pressable
              onPress={() => onDirectionClick()}
              style={{
                position: 'absolute', right: 0, bottom: 0,
                margin: 3, borderRadius: 6, backgroundColor: Colors.PRIMARY, padding: 12, paddingHorizontal: 14
              }}>
              <FontAwesome name="location-arrow" size={25}
                color="white" />
            </Pressable>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}