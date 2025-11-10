import { Image, StyleSheet, Text } from 'react-native';

import { View } from '@/components/Themed';
import { FlatList } from 'react-native';

import Event from '@/components/Event';
import { getEvents } from '@/hooks/RowContext';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';



// Title, Description, Date, Time, Club, Location
export default function Home() {

  const router = useRouter();
  const responses = getEvents();
  


   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://nyc.cloud.appwrite.io/v1/storage/buckets/68f8ed13003a261f4bcb/files/68f8efae0034f5b9beef/view?project=68f8ed01002593f33953&mode=admin');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const json = await response.json();
        setData(json);
        setNewData(json);
      } catch (error) {
      
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []); 

  const [data, setData] = useState();
  const [newData, setNewData] = useState();
  const [loading, setLoading] = useState(true);


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
      data={data}
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
