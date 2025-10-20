import Header from '@/components/Header';
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Heart } from 'lucide-react-native';
import { Image, Linking, Pressable, StyleSheet, Text, View } from 'react-native';


export default function NameScreen() {

    const {name, office, status, imgsrc, phone, email, classCol } = useLocalSearchParams();
    const mailtoUrl = `mailto:${email}`;
  
    const openEmail = async () => {
      try {
        const supported = await Linking.canOpenURL(mailtoUrl);
        if (supported) {
          await Linking.openURL(mailtoUrl);
        } else {
          console.log("Can't handle mailto URL on this device.");
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    const openTelephone= async () => {
      try {
        const supported = await Linking.canOpenURL(`tel:${phone}`);
        if (supported) {
          await Linking.openURL(`tel:${phone}`);
        } else {
          console.log("Can't handle tel: URL on this device.");
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    };

    

    return (
    <View style={styles.container}>
      <Header />
      <View style={[styles.container, {alignItems: "center"}]}>
      <Pressable style={[styles.goBackDirectory]} onPress={() => router.navigate('/directory')}>
      
            <ChevronLeft size={32} style={styles.chevvy}/>
            <Text style={styles.goBack}>Go Back To Directory</Text>

      </Pressable>
      
      <View style={[styles.card]}>
        <View style={styles.imgStyle}>
            <Image src={imgsrc}/>
        </View>
        <View style={styles.listed}>
            <Text style={styles.nameStyle}>{name}</Text>
            <Text style={[styles.textStyle, styles.officeText]}>{office}</Text>
            <Text style={styles.textStyle}>{classCol}</Text>
            <View style={styles.singleLine}>
                <Heart fill="white" stroke="white" size={20} />
                <Text style={styles.textStyle}>{status}</Text>
            </View>
            

             <View style={styles.separator} />

              <Pressable onPress={openTelephone}><Text style={styles.textStyle}>{phone}</Text></Pressable>
             
             <Pressable onPress={openEmail}><Text style={styles.textStyle}>{email}</Text></Pressable>
        
        </View>
    </View>

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
    card: {
        height: "80%",
        width: "90%",
        // justifyContent: 'space-between',
        backgroundImage: "linear-gradient(to right top, #330365, #491c81, #5f339e, #7549bc, #8b60db)",
        fontFamily: 'sans-serif',
        fontWeight: 'semibold',
        padding: 15,
        fontSize: 16,
        flexDirection: 'column',
        gap: 5,
        marginInline: 'auto',
        marginBottom: 25,
    },
    listed: {
        flexDirection: 'column',
        gap: 8,
        fontSize: 18,
        width: '60%',
        marginInline: "auto",
    },
    textStyle: {
        fontSize: 14,
        color: "white",
    },
    nameStyle: {
        fontSize: 24,
        color: "white",
        fontWeight: "bold",
        letterSpacing: 1,
    },
    imgStyle: {
        borderRadius: 5,
        backgroundColor: 'gray',
        width: "50%",
        height: "30%",
        marginInline: "auto",
    },
 
    singleLine: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginLeft: 2,
    },
    officeText: {
        backgroundColor: "#330365",
        borderRadius: 5,
        padding: 5,
        paddingInline: 10,
        marginLeft: -5,
        alignSelf: "flex-start",
    },
    goBack : {
      fontSize: 20,
      color: "white",
    },
    goBackDirectory: {
      flexDirection: "row",
      alignItems: "center",
      // marginLeft: 2,
      justifyContent: "flex-start",
      width: "100%",
      height: "10%",
      backgroundColor: "#330365",
      color: "white",
      paddingLeft: 20,
      paddingBottom: 5,
      paddingTop: 5,
    },
    chevvy: {
      marginTop: 3,
    },

})
