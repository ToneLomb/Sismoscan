import { StyleSheet } from "react-native";

const images = {banner: require('../../assets/earthquake.png')}

const styles = StyleSheet.create({
    header:{
        alignItems: "center",
        paddingVertical: 15
    },
    banner:{
        width: 150,
        height: 150
    },
    body:{
        marginVertical: 50
    }
})

export {images, styles}