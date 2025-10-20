import { Search } from 'lucide-react-native';
import { FlatList, Pressable, StyleSheet, TextInput } from 'react-native';

import Card from '@/components/Card';
import Header from '@/components/Header';
import { View } from '@/components/Themed';
import { useRouter } from 'expo-router';

export default function Directory() {
  const router = useRouter();

  const sendFilter = () => {};
  let memberData = [ {
    name: 'Carl Perkins',
    office: 'Officer',
    imgsrc: "@/assets/images/splash-icon.png",
    status: 'Single',
    classCol: "Junior",
    email: "carl.perkins@students.fhu.edu",
    phone: "777-888-9999",
  }];

  return (
    <FlatList
      style={styles.flatListed}
      ListHeaderComponent={
        <View style={styles.container}>
          <Header />
        <View style={styles.search}>
        <Pressable onPress={sendFilter}>
          <Search size={18} />
        </Pressable>
        <TextInput placeholder='Search'></TextInput>
        </View>
        <View style={styles.separator} />
      </View>
      }
      data={memberData}
      renderItem={({item}) => <Pressable
      onPress={() => 
          router.push({
            pathname: `/(tabs)/[name]`,
            params: { name: item.name, office: item.office, status: item.status, imgsrc: item.imgsrc, phone: item.phone, email: item.email, classCol: item.classCol}
          })
      }
      
      
      ><Card imgsrc={item.imgsrc} name={item.name} office={item.office} status={item.status}/> </Pressable>}>
    </FlatList>
)}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "#330365",
  },
  search: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 8,
    borderColor: "#b390f1ff",
    borderWidth: 4,
    gap: 3,
    padding: 3,
    color: "#2c06d7ff",
    marginTop: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
    backgroundColor: "white",
  },
  flatListed: {
    backgroundColor: "#330365",
  },

  
});
