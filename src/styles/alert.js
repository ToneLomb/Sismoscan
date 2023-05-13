import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

const images = {error: require('../../assets/error.png')}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    popupContainer:{
        backgroundColor: "white",
        height: 0.35* height,
        width: 0.7* width,
        borderRadius: 5
    },
    image:{
        width: 60,
        height: 60
    },
    head:{
        alignItems: "center",
        paddingVertical: 12
    },
    body:{
        alignItems: "center",
    },
    bodyText:{
        fontStyle: "italic",
        opacity: 0.5,
        textAlign: "center",
        width: "80%"
    },
    headText:{
        paddingVertical: 10,
        color: "#CF2612",
        fontSize: 20,
        fontWeight: 800,
    },
    footer:{
        paddingVertical: 20,
        alignItems: "center"
    },
    boutton:{
        width: "50%",
        backgroundColor: "#CF2612",
        paddingVertical: 7,
        borderRadius: 12
    },
    bouttonText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 20,
        textAlign: "center"
    }
})

export {styles, images}