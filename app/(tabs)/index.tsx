import { useRouter } from 'expo-router';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
export default function LoginScreen() {
  const router = useRouter();
  return (
    <View style={styles.container}>

      <View style={[styles.container, {alignItems: "center", justifyContent: "center", gap: 15}]}>
      <Text style={styles.nameStyle}>Login</Text>
       <TextInput style={styles.search} placeholder='Username'></TextInput>
       <TextInput style={styles.search} placeholder='Password'></TextInput>
        <Pressable style={styles.press} onPress={() => router.navigate('/directory')}>
          <Text style={styles.pressText}>Submit</Text>
        </Pressable>
      </View>
    </View>
  );
}


 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#330365",
},
  separator: {
      height: 1,
      width: '100%',
      backgroundColor: "white",
  },
    listed: {
        flexDirection: 'column',
        gap: 8,
        fontSize: 18,
        width: '50%',
        marginInline: "auto",
    },
    textStyle: {
        fontSize: 16,
        color: "white",
    },
    press: {
      padding: 5,
      backgroundColor: "#d29cefff",
        borderRadius: 8,
        cursor: "pointer",
        width: "30%",
        alignItems: "center",
        marginTop: 10,
    },
    pressText: {
      color: "black",
      fontWeight: "bold",
      fontSize: 16,
    },
    nameStyle: {
        fontSize: 36,
        color: "white",
        fontWeight: "bold",
        letterSpacing: 1,
         marginBottom: 10,
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
    fontSize: 16,

  },

})
