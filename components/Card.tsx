import { Heart } from 'lucide-react-native';
import { Image, StyleSheet, Text, View } from 'react-native';

interface CardProps {
    imgsrc: string,
    name: string,
    office: string,
    status: string,
}

const Card = ({imgsrc, name, office, status}: CardProps) => {
  return (
    <View style={[styles.card]}>
        <View style={styles.imgStyle}>
            <Image style={styles.imgWidth} source={{ uri: imgsrc}} />
        </View>
        <View style={styles.listed}>
            <Text style={styles.nameStyle}>{name}</Text>
            {office != undefined &&
                <Text style={[styles.textStyle, styles.officeText]}>{office}</Text>
            }
            <View style={styles.singleLine}>
                <Heart fill="white" stroke="white" size={20} />
                <Text style={styles.textStyle}>{status}</Text>
            </View>
        </View>
    </View>
  )
}

export default Card

const styles = StyleSheet.create({
    card: {
        height: 200,
        width: "90%",
        justifyContent: 'space-between',
        backgroundImage: "linear-gradient(to right top, #330365, #491c81, #5f339e, #7549bc, #8b60db)",
        borderRadius: 5,
        fontFamily: 'sans-serif',
        fontWeight: 'semibold',
        padding: 15,
        fontSize: 16,
        flexDirection: 'row',
        gap: 5,
        marginInline: 'auto',
        marginBottom: 25,
    },
    listed: {
        flexDirection: 'column',
        gap: 8,
        fontSize: 18,
        width: '45%',
        justifyContent: 'center',
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
        height: "100%"
    },
    imgWidth: {
         borderRadius: 5,
        width: "100%",
        height: "100%",
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
        alignSelf: "flex-start",
    }

})
