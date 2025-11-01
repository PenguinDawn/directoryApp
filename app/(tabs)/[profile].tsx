import { Pressable, StyleSheet, Text, View } from 'react-native';



// import { Colors } from '@/constants/Colors';


import Header from '@/components/Header';
// import ProfilePic from '@/components/profilePic';
// import Seperator from '@/components/Seperator';
import { useRouter } from 'expo-router';
import { useState } from 'react';
export default function ProfileScreen() {

  

  const router = useRouter();

      const [name, setName] = useState("Carl");
      const [userName, setuserName] = useState("Carlos2004");
      const [password, setPassword] = useState("password");
      const [mealplan, setmealplan] = useState("A");
      const [meals, setMeals] = useState(14);
      const [reset, setReset] = useState("week");
      const [lionBucks, setBucks] = useState(175);

      const [showing, setShowing] = useState(false);

  

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.textHolder}>
          {/* name */}
        <Text style={[styles.listingStyle, ]}>{name}</Text>
          {/* username */}
        <Text style={[styles.listingStyle, ]}>Username: {userName}</Text>
          {/* password */}
        <View style={styles.passwordContainer}>
          <Text style={[styles.listingStyle, ]}>Password: 

             {showing && (
            <Text> {password}</Text>
          )}
          </Text>
          {/* show password */}
         
          <Pressable onPress={() => {setShowing(!showing)}} style={[styles.showButton]}>Show</Pressable>
    
          {/* make the conditional showing */}
        </View>
      </View>



      <View style={styles.textHolder}>
          {/* meal plan */}
          <Text style={[styles.listingStyle]}>Meal Plan {mealplan} ({meals} meals a {reset})</Text>
          {/* dining dollars given */}
          <Text style={[styles.listingStyle]}>${lionBucks} per semester</Text>
      </View>


      <Pressable style={styles.buttonHolder} onPress={() => {router.navigate("/login")}}>Logout</Pressable>
      {/* logout */}

      {/* display */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  textHolder: {
    width: "60%",
    gap: 10,
  },
  progressHolder: {
    flexDirection: "column",
    width: "65%",
    alignItems: "center",
  },
  middle: {
    marginInline: "auto",
  },
  listingStyle: {
    fontSize: 16,
    fontFamily: "Tangerine",
  },
  textUnderline: {
    textDecorationLine: "underline",
  },
  passwordContainer: {
    flexDirection: "row",
    gap: 4,
    justifyContent: "space-between",
    
  },
  buttonHolder: {
    backgroundImage: "linear-gradient(to right bottom, #901431, #87112c, #7e0d28, #750923, #6c061f, #64051d, #5d051c, #55041a, #4b051a, #420719, #380818, #2f0816)",
    color: 'white',
    fontFamily: 'sans-serif',
    padding: 10,
    borderRadius: 5,
    cursor: "pointer",
  },
   showButton: {
    backgroundImage: "linear-gradient(to right bottom, #901431, #87112c, #7e0d28, #750923, #6c061f, #64051d, #5d051c, #55041a, #4b051a, #420719, #380818, #2f0816)",
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: 14,
    padding: 5,
    borderRadius: 5,
    cursor: "pointer",
  },
  flexer: {
      flexDirection: "row",
      justifyContent: 'center',
      borderBottomLeftRadius: 10,
      borderBottomRightRadius: 10,
      padding: 5,
      paddingTop: 10,
      paddingBottom: 10,
    },

});
