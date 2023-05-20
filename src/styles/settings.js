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
        borderBottomColor: "#56A8D2"
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
        width: "85%",
    },
})

export {images, styles}