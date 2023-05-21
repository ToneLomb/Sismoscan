import { StyleSheet } from "react-native";

const images = {compte: require('../../assets/user.png'),
                apparence: require('../../assets/eye.png'),
                notifications: require('../../assets/notification.png'),
                support: require('../../assets/support.png'),
                information: require('../../assets/information.png'),
                logout: require('../../assets/logout.png'),
                langue: require('../../assets/translation.png'),
                theme: require('../../assets/day-and-night.png'),
                rayon: require('../../assets/radius.png'),
                magnitude: require('../../assets/magnitude.png'),
                email: require('../../assets/email.png'),
                logoNoir: require('../../assets/logo-noir.png'),
                chevron: require('../../assets/next.png'),
                chevronBas: require('../../assets/down-arrow.png')                
                
}

const styles = StyleSheet.create({
    icon:{
        height: 25,
        width: 25
    },
    settingName:{
        alignItems: "center",
        display: "flex",
        flexDirection: "row"
    },
    settingContainer:{
        alignItems: "center",
        paddingVertical: 15,
        justifyContent: "space-between",
        display: "flex",
        flexDirection: "row",
        borderBottomWidth: 2,
        borderBottomColor: "#19C2BC"
    },
    settingTitle:{
        textAlign: "justify",
        paddingHorizontal: 20,
        fontWeight: "400",
        fontSize: 15
    },
    field:{
        paddingTop: 20,
        marginLeft: 30,
        //borderBottomWidth: 1
    },
    settingsContainer:{
        width: "100%",
        backgroundColor: "#e2e4e9",
        padding: 35,

    },
    logo:{
        width: 700,
        height: 0.30*700,
        marginLeft: "78%",
    },
    infoContainer:{
        alignItems: "center"
    },
    textContainer:{
        marginTop: "-10%",
        paddingBottom: 40,
        width: "95%",
    },
    bienvenue:{
        textAlign: "center",
        paddingVertical: 10
    }
})

export {images, styles}