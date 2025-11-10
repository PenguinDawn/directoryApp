import { StyleSheet, Text, View } from 'react-native';


const Header = ({title, club}: {title:string, club:string | undefined}) => {

  let white = {color: "black"};
  let themeCol;
  if (club === "xbx") {
    themeCol = {backgroundColor: "#b390f1ff"}
  }
  else if (club === "pka") {
    themeCol = {backgroundColor: "#f56464ff"}
  }
  else if (club === "ox") {
    themeCol = {backgroundColor: "#99cdb5ff"}
  }
  else if (club === "ep") {
    themeCol = {backgroundColor: "#f5f064ff"}
  }
  else if (club == "zxd") {
    themeCol =  {backgroundColor: "#64b1f5ff"}
  }
  else {
    themeCol = {backgroundColor: "maroon"}
    white = {color: "white"}
  }

  return (
    <View style={[styles.maroon, themeCol]}>
      <Text style={[styles.texted, white]} >
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
