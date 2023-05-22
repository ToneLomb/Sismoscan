import React from "react";
import { Text, ScrollView, View } from "react-native";
import { styles } from '../../src/styles/advice'


export const AdviceScreen = () => {

    return (
        <ScrollView>
            <View style={styles.box}>
                <Text style={styles.title}>Conseils de survie</Text>
            </View>
            <View style={styles.coreT}>
                <Text style={styles.core}>Pendant un tremblement de terre :</Text> 
                <Text style={styles.core}>Où que vous soyez au moment d'un tremblement de terre, abritez-vous immédiatement. Au besoin, rendez-vous dans un endroit sécuritaire tout près, et restez-y jusqu'à ce que les secousses cessent.</Text>
                <Text style={styles.core}> - Si vous êtes à l'intérieur :</Text>
                <Text style={[styles.coreM,{color: "#D72A1D", fontWeight: "bold"}]}>      - ABRITEZ-VOUS ET AGRIPPEZ-VOUS</Text>
                <Text style={styles.coreM}>      - Abritez-vous sous un meuble lourd, comme une table, un bureau, un lit ou tout <Text style={[styles.coreM,{color: "#D72A1D", fontWeight: "bold"}]}>meuble solide.</Text></Text>
                <Text style={styles.coreM}>      - Couvrez votre tête et votre torse afin de vous protéger de tout objet qui pourrait vous tomber dessus.</Text>
                <Text style={styles.core}> - S'il n'y a aucun meuble solide sous lequel vous pouvez vous réfugier ou si vous êtes dans un couloir, mettez-vous en position accroupie le long d'un mur intérieur et <Text style={[styles.coreM,{color: "#D72A1D", fontWeight: "bold"}]}>protégez votre tête et votre cou</Text> avec vos bras.</Text>
                <Text style={styles.core}> - Si vous êtes dans un centre commercial, entrez dans le magasin le plus proche. Éloignez-vous des fenêtres et des rayons comportant des objets lourds.</Text>
                <Text style={styles.core}> - Si vous êtes à l'école, réfugiez-vous sous un bureau ou une table et agrippez-vous-y. <Text style={[styles.coreM,{color: "#D72A1D", fontWeight: "bold"}]}>Tournez le dos aux fenêtres.</Text></Text>
                <Text style={styles.core}> - Si êtes en fauteuil roulant, verrouillez les roues et protégez-vous le cou et la tête.</Text>
                <Text style={styles.core}> - Si vous êtes à l'extérieur, veuillez <Text style={[styles.coreM,{color: "#D72A1D", fontWeight: "bold"}]}>restez à l'extérieur.</Text> </Text>
            </View>
        </ScrollView>

    );
}
