import { Search } from 'lucide-react-native';
import { FlatList, Pressable, StyleSheet, Text, TextInput } from 'react-native';

// const {user, loading, login, register} = useAuth();



import Card from '@/components/Card';
import Header from '@/components/Header';
import { View } from '@/components/Themed';
import { useAuth } from '@/hooks/AuthContext';
import { Link, useRouter } from 'expo-router';
import { useEffect, useState } from 'react';

export default function Directory() {

  let {user, member} = useAuth();
  const router = useRouter();
        let club = member?.club; // change to use user club
        
        let themeCol;
        if (club === "XBX") {
            themeCol = "#6c27e3ff"
        }
        else if (club === "PKA") {
            themeCol =  "#e01919ff"
        }
        else if (club === "OX") {
            themeCol = "#31d287ff"
        }
        else if (club === "EP") {
            themeCol = "#f5f064ff"
        }
        else {
            themeCol =  "#308fe2ff"
        }

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

  if(user) {
      return (
    <FlatList
      style={styles.flatListed}
      ListHeaderComponent={
        <View style={styles.container}>
          {/* change to use user club */}
          <Header title="Directory" club={club}/> 
        <View style={[styles.search, {borderColor: themeCol}]}>
        <Pressable onPress={sendFilter} >
          <Search size={18} />
        </Pressable>
        <TextInput placeholder='Search' onKeyPress={entering} value={filter} onChangeText={(text) => {setFilter(text)}} clearButtonMode="always"></TextInput>
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
      renderItem={({item}) => 
      <Pressable
      onPress={() => 
          router.push({
            pathname: `/(tabs)/[name]`,
            params: { name: item.firstName + " " + item.lastName, office: item.officer, status: item.relationshipStatus, imgsrc: item.imageURL, phone: item.phone, email: item.email, classCol: item.classification, showEmail: item.showEmail, showPhone: item.showPhone}
          })}>
        <Card club={club} imgsrc={item.imageURL} name={item.firstName + " " + item.lastName} office={item.officer} status={item.relationshipStatus}/> 
      </Pressable>}>
    </FlatList>
)
  }

   return (
    <View style={{height: "100%"}}>
      <Header title="Directory" club="" />
      <View style={[styles.container2, {height: "90%"}]}>

        <Text style={styles.title}>You need to login to see this page.</Text>

        <Link href="/auth" style={styles.link}>
          <Text style={styles.linkText}>Login {"->"}</Text>
        </Link>
      </View>
    </View>
  );
}

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
  container2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: "black",
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "white",
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 18,
    color: '#cde3f7ff',
    textDecorationLine: "underline",
  },
}
);
