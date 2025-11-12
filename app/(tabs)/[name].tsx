import Header from '@/components/Header';
import { useAuth } from '@/hooks/AuthContext';
import { router, useLocalSearchParams } from "expo-router";
import { ChevronLeft, Heart } from 'lucide-react-native';
import { Image, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';



export default function NameScreen() {
        const {user, member} = useAuth();
        let club = member?.club; // change this to rely on the user data

        let themeCol;
        if (club === "xbx") {
            themeCol = {backgroundColor: "#6c27e3ff"}
        }
        else if (club === "pka") {
            themeCol = {backgroundColor: "#e01919ff"}
        }
        else if (club === "ox") {
            themeCol = {backgroundColor: "#31d287ff"}
        }
        else if (club === "ep") {
            themeCol = {backgroundColor: "#b0a475ff"}
        }
        else {
            themeCol =  {backgroundColor: "#308fe2ff"}
        }

    const {name, office, status, imgsrc, phone, email, classCol, showEmail, showPhone } = useLocalSearchParams();
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
    <ScrollView style={styles.container}>
      <Header title="Directory" club={club}/>
      <View style={[styles.container, {alignItems: "center"}]}>
          <Pressable style={[styles.goBackDirectory]} onPress={() => router.navigate('/directory')}>
                <ChevronLeft size={32} style={styles.chevvy}/>
                <Text style={styles.goBack}>Go Back To Directory</Text>
          </Pressable>
      
      <View style={[styles.card, themeCol, {height: 370}]}>
        <View style={styles.imgStyle}>
            <Image style={styles.imgWidth} source={{ uri: imgsrc.toString()}} />
        </View>
        <View style={styles.listed}>
            <Text style={styles.nameStyle}>{name}</Text>
            {
              office != undefined && 
              <Text style={[styles.textStyle, styles.officeText]}>{office}</Text>
            }
            
            <Text style={styles.textStyle}>{classCol}</Text>
            <View style={styles.singleLine}>
                <Heart fill="white" stroke="white" size={20} />
                <Text style={styles.textStyle}>{status}</Text>
            </View>
            

             <View style={styles.separator} />

             {showPhone &&
             <Pressable onPress={openTelephone}><Text style={styles.textStyle}>{phone}</Text></Pressable>
             }

             {showEmail &&
             <Pressable onPress={openEmail}><Text style={styles.textStyle}>{email}</Text></Pressable>
             }
        </View>

      </View>

      </View>
    </ScrollView>
  );
}


 
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
},
  separator: {
      height: 1,
      width: '100%',
      backgroundColor: "white",
  },
    card: {
        // justifyContent: 'space-between',
        width: "80%",
       fontFamily: 'sans-serif',
        fontWeight: 'semibold',
        padding: 15,
        fontSize: 16,
        flexDirection: 'column',
        gap: 5,
        marginInline: 'auto',
        borderRadius: 5,
    },
    listed: {
        flexDirection: 'column',
        gap: 8,
        fontSize: 18,
        width: '60%',
        marginInline: "auto",
        
    },
    textStyle: {
        fontSize: 16,
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
        width: "50%",
        height: "40%",
        marginInline: "auto",
    },
 
    singleLine: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginLeft: 2,
        marginBottom: 2,
    },
    officeText: {
        backgroundColor: "#000000ff",
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
      backgroundColor: "black",
      color: "white",
      paddingLeft: 20,
      paddingBottom: 5,
      paddingTop: 5,
    },
    chevvy: {
      marginTop: 3,
    },
    imgWidth: {
        width: "100%",
        height: "100%",
        borderRadius: 5,
    },

})
