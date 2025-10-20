import { StyleSheet, Text, View } from 'react-native';


const Header = ({...props}) => {

  return (
    <View style={[styles.maroon]}>
      <Text style={[styles.texted]} >
        Directory
      </Text>
    </View>
  )
}

export default Header

const styles = StyleSheet.create({
    maroon: {
        height: 'auto',
        fontFamily: 'sans-serif',
        fontWeight: 'semibold',
        padding: 15,
        paddingLeft: "5%",
        paddingTop: 50,
        fontSize: 16,
        flexDirection: 'row',
        width: '100%',
        backgroundColor:  "#b390f1ff",
    },
    texted : {
      fontSize: 30,
      fontWeight: "bold",
    },
})
