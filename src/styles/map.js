import { StyleSheet } from "react-native";

const images = {poubelle: require('../../assets/bin.png')}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 12,
    },
    buttonContainer:{
        flex: 1
    },
    clearButton:{
        flex: 1,
        backgroundColor: "#ffffff",
        justifyContent: "center",
        alignItems: "center"
    },
    textButton:{ 
        textAlign: "center",
        fontSize: 25,
        fontWeight: "bold"
    },
    trash:{
        width: 35,
        height: 35
    }
  });

  export {styles, images}