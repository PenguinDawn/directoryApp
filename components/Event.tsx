
import { StyleSheet, Text, View } from 'react-native';

// Title, Description, Date, Time, Club, Location

interface CardProps {
    title: string,
    description: string,
    date: string,
    location: string,
    time: string,
    club: string | undefined,
}

const Event = ({title, description, date, location, time, club}: CardProps) => {
      let themeCol;
        if (club === "XBX") {
            themeCol = {backgroundColor: "#6c27e3ff"}
        }
        else if (club === "PKA") {
            themeCol = {backgroundColor: "#e01919ff"}
        }
        else if (club === "OX") {
            themeCol = {backgroundColor: "#31d287ff"}
        }
        else if (club === "EP") {
            themeCol = {backgroundColor: "#f5f064ff"}
        }
        else if (club === "ZXD") {
            themeCol =  {backgroundColor: "#308fe2ff"}
        }
        else {
            themeCol =  {backgroundColor: "#510202ff"}
            club = "FHU"
        }

  return (
    <View style={[styles.card, themeCol]}>
        <View style={styles.listed}>
            <View style={styles.spaced}>
            <Text style={styles.nameStyle}>{title}</Text>
            <Text style={styles.textStyle}><Text style={styles.quest}>When:</Text> {date} at {time}</Text>
            <Text style={styles.textStyle}><Text style={styles.quest}>Where:</Text> {location}</Text>
            </View>
            <View>
                <Text style={styles.clubStyle}>{club}</Text>
            </View>
        </View>
            <View style={styles.singleLine}>
                <Text style={styles.textStyle}>{description}</Text>
            </View>
        
    </View>
  )
}

export default Event

const styles = StyleSheet.create({
    card: {
        height: 200,
        width: "90%",
        gap: 5,
        // backgroundImage: "linear-gradient(to right top, #330365, #491c81, #5f339e, #7549bc, #8b60db)",
        borderRadius: 5,
        fontFamily: 'sans-serif',
        fontWeight: 'semibold',
        padding: 30,
        fontSize: 16,
        flexDirection: 'column',
        marginInline: 'auto',
        marginBottom: 25,
    },
    listed: {
        flexDirection: 'row',
        fontSize: 18,
        justifyContent: 'space-between',
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
    singleLine: {
        flexDirection: "row",
        alignItems: "center",
        gap: 3,
        marginLeft: 2,
    },
    clubStyle: {
        fontSize: 24,
        color: "white",
    },
    quest: {
        fontWeight: "bold",
    },
    spaced: {
        gap: 5,
    }

})
