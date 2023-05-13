import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')


const images = {radius: require('../../assets/radius.png'),
                ping: require('../../assets/location.png')                
};

const styles = StyleSheet.create({ 
    formContainer: {
        display: "flex",
        flexDirection: "column",
        height: 0.45*height,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
        borderTopWidth: 2,
        borderBottomWidth: 2,
        borderTopColor: "#F7DF57",
        borderBottomColor: "#F7DF57",
    },
    image:{
        width: 20,
        height: 20,
        marginTop: "2%",

    },
    fieldTitle: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingLeft: 5,
        padding: 3

    },
    fieldContainer:{
        paddingVertical: 3
    },
    dateContainer: {
        marginTop: 12,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",

    },
    date:{
        width: "45%"
    }, 
    text: {
        fontSize: 16,
        color: 'black',
    },
    header:{
        marginVertical: 10
    },
    body:{
        width: "90%"
    },
    footer:{
        width: "90%",
        paddingVertical: 20,
        alignItems: "center"
    },
    boutton:{
        backgroundColor: "#f5d524",
        paddingVertical: 7,
        borderRadius: 12,
        width: "100%",
    },
    bouttonText: {
        paddingHorizontal: 15,
        color: "white",
        fontWeight: "600",
        fontSize: 17,
        textAlign: "center"
    },
  });

  export {images, styles}