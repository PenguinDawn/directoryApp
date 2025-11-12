import { Image, StyleSheet, Text } from 'react-native';

import { View } from '@/components/Themed';
import { FlatList } from 'react-native';

import Event from '@/components/Event';
import { APPWRITE_CONFIG, createAppWriteService, EventRow } from '@/lib/appwrite';
import { useRouter } from 'expo-router';
import { useCallback, useEffect, useMemo, useState } from 'react';



// Title, Description, Date, Time, Club, Location
export default function Home() {

  const router = useRouter();

    const [newD, setNewD] = useState<EventRow[] | null>();
    const [filter, setFilter] = useState("");
  
    const appWriteService = useMemo(() => createAppWriteService(APPWRITE_CONFIG), [])
    const [events, setEvents] = useState<EventRow[] | null>();
  
  
    const loadEvents = useCallback(async () => {
      let myData = await appWriteService.getEvents();
      setEvents(myData);
    }, [appWriteService]);
  
  
    useEffect(() => {
      loadEvents();
    }, [loadEvents])
  
  

// Title, Description, Date, Time, Club, Location
      return (
    <FlatList
      style={styles.flatListed}
      ListHeaderComponent={
        <View style={{backgroundColor: "black"}}>
        <View style={styles.heading}>
          <Image source={require('@/assets/images/XBX.png')} style={styles.imgYeah}/>
          <Image source={require('@/assets/images/PiKappa.png')} style={styles.imgYeah}/>
          <Image source={require('@/assets/images/SigmaRho.png')} style={styles.imgYeah}/>
          <Image source={require('@/assets/images/XiChi.png')} style={styles.imgYeah}/>
          <Image source={require('@/assets/images/OmegaChi.png')} style={styles.imgYeah}/>
      </View>
      <Text style={styles.title}>Events</Text>
      <View>{}</View>
      </View>
      }
      data={events}
      keyExtractor={(item) => item.title}
      ListEmptyComponent={
        <View style={[styles.viewed, {backgroundColor: "black"}]}>
          <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>No events today :(</Text>
        </View>
      }
      renderItem={({item}) => 
            <Event title={item.title} club={item.club} time={item.time} description={item.description} date={item.date} location={item.location}/>}>
    </FlatList>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "black",
  },
  search: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 8,
    borderWidth: 4,
    gap: 3,
    padding: 3,
    marginTop: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: "white",
  },
  flatListed: {
    backgroundColor: "black",
  },
  viewed: {
    alignItems: "center",
  },
  heading: {
    flexDirection: "row",

  },
  imgYeah: {
    width: "20%",
    height: 100,
  },
  title: {
    color: "white",
    alignSelf: "center",
    fontSize: 30,
    paddingTop: 20,
    paddingBottom: 20,
  }
});
