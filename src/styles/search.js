import { StyleSheet, Dimensions } from "react-native";

const { height } = Dimensions.get('window')
const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    popupContainer: {
        backgroundColor: "white",
        height: 0.5 * height,
        width: 0.8 * width,
        borderRadius: 5
    },
    scroller: {
        height: 300,
        alignSelf: 'center',
        width: '90%',
        backgroundColor: '#fff',
        
    },
    searchBar: {
        width: '90%',
        height: 50,
        alignSelf: 'center',
        borderWidth: 0.2,
        borderColor: '#8e8e8e',
        borderRadius: 7,
        marginTop: 20,
        paddingLeft: 20,
    },
    ville: {
        width: '85%',
        alignSelf: 'center',
        height: 50,
        justifyContent: 'center',
        borderBottomWidth: 0.5,
        borderColor: '#8e8e8e',
        
    }
})

export { styles }