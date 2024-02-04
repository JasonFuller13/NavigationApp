import { View, Text, ActivityIndicator, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Colors from '../../../Utils/Colors'
import { getFirestore } from 'firebase/firestore';
import { app } from '../../../Utils/FirebaseConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { useUser } from '@clerk/clerk-expo';
import PlaceItem from '../HomeScreen/PlaceItem';


export default function FavoriteScreen() {

  const db = getFirestore(app);
  const [favList, setFavList] = useState([]);
  const { user } = useUser();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    user && getFav();
  }, [user])

  const getFav = async () => {
    setLoading(true)
    setFavList([])
    const q = query(collection(db, "club-fav-place"),
      where("email", "==", user?.primaryEmailAddress?.emailAddress));

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setFavList(favList => [...favList, doc.data()]);
      setLoading(false);
    });
  }

  return (
    <View style={{
      backgroundColor: Colors.GRAY
    }}>
      <Text style={{
        padding: 20,
        fontFamily: 'montserrat-medium',
        fontSize: 30
      }}>Favorite Places</Text>
      {!favList ? <View style={{
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      >
        <ActivityIndicator
          size={'large'}
          color={Colors.PRIMARY}
        />
        <Text style={{ fontFamily: 'montserrat', marginTop: 5 }}>
          Loading...
        </Text>
      </View> : null}
      <FlatList
        data={favList}
        onRefresh={() => getFav()}
        refreshing={loading}
        style={{
          paddingBottom: 200
        }}
        renderItem={({ item, index }) => (
          <PlaceItem
            place={item.place} isFav={true}
            markedFav={() => getFav()}
          />
        )}
      />
      <View style={{
        marginBottom: 200, height: 200
      }}>

      </View>
    </View>
  )
}