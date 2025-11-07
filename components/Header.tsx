import { StyleSheet, Text, View } from 'react-native';


const Header = ({title, club}: {title:string, club:string}) => {

  let themeCol;
  if (club === "XBX") {
    themeCol = {backgroundColor: "#b390f1ff"}
  }
  else if (club === "Pi Kappa") {
    themeCol = {backgroundColor: "#f56464ff"}
  }
  else if (club === "Omega Chi") {
    themeCol = {backgroundColor: "#99cdb5ff"}
  }
  else if (club === "Sigma Rho") {
    themeCol = {backgroundColor: "#f5f064ff"}
  }
  else {
    themeCol =  {backgroundColor: "#64b1f5ff"}
  }

  return (
    <View style={[styles.maroon, themeCol]}>
      <Text style={[styles.texted]} >
        {title}
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
    },
    texted : {
      fontSize: 30,
      fontWeight: "bold",
    },
})
