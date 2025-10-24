import { Search } from 'lucide-react-native';
import { FlatList, Pressable, StyleSheet, Text, TextInput } from 'react-native';

import Card from '@/components/Card';
import Header from '@/components/Header';
import { View } from '@/components/Themed';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Directory() {
  const router = useRouter();
  
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
  const [filter, setFilter] = useState("");


  const sendFilter = () => {
    if(filter === " ") {
      setData(newData);
      return;
    }
    setData(newData.filter((person) => (person.firstName).toLowerCase().includes(filter.toLowerCase().trim()) || (person.lastName).toLowerCase().includes(filter.toLowerCase().trim())))
  };

  const entering = (event) => {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission
        sendFilter(); // Call the filter function
    }
  }

  return (
    <FlatList
      style={styles.flatListed}
      ListHeaderComponent={
        <View style={styles.container}>
          <Header />
        <View style={styles.search}>
        <Pressable onPress={sendFilter} >
          <Search size={18} />
        </Pressable>
        <TextInput placeholder='Search' onKeyPress={entering} value={filter} onChangeText={(text) => {setFilter(text)}}></TextInput>
        </View>
        <View style={styles.separator} />
      </View>
      }
      data={data}
      keyExtractor={(item) => item.name}
      ListEmptyComponent={
        <View style={[styles.viewed, {backgroundColor: "black"}]}>
          <Text style={{color: "white", fontWeight: "bold", fontSize: 20}}>No students found :(</Text>
        </View>
      }
      renderItem={({item}) => <Pressable
      onPress={() => 
          router.push({
            pathname: `/(tabs)/[name]`,
            params: { name: item.firstName + " " + item.lastName, office: item.officer, status: item.relationshipStatus, imgsrc: item.imageURL, phone: item.phone, email: item.email, classCol: item.classification, showEmail: item.showEmail, showPhone: item.showPhone}
          })
      }
      ><Card imgsrc={item.imageURL} name={item.firstName + " " + item.lastName} office={item.officer} status={item.relationshipStatus}/> </Pressable>}>
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
    borderColor: "#b390f1ff",
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
  }

  
});
