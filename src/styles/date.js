import { StyleSheet } from "react-native";

const images = {calendar: require('../../assets/calendar.png')}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        width: '90%',
        padding: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 25,
        shadowRadius: 4,
        elevation: 5,
    },
    datePicker:{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: '#e2e4e9',
        borderRadius: 5,
        padding: 5,
    }, 
    calendar:{
        width: 20,
        height: 20,
        marginTop: "1%",
        marginLeft: 10
    }
})

export {styles, images}