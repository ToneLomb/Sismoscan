import { StyleSheet } from "react-native";

const images = {banner: require('../../assets/earthquake.png')}

const styles = StyleSheet.create({
    formContainer:{
        flex: 1,
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
    },
    header:{
        alignItems: "center",
        paddingVertical: 15,
        backgroundColor: "white"

    },
    banner:{
        width: 150,
        height: 150
    },
    body:{

    },
    footer:{
        backgroundColor: "red"
    }
})

export {images, styles}