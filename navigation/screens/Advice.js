import React, { useEffect, useState } from "react";
import { TextInput, Text, Image, View, Switch, ScrollView } from "react-native";
import { styles } from '../../src/styles/advice'


export const AdviceScreen = () => {

    return (
        <View>
            <View style={styles.box}>
                <Text style={styles.title}>Conseil de survie</Text>
            </View>
            <View style={styles.coreT}>
                <Text style={styles.core}>Pendant un tremblement de terre :</Text> 
                <Text style={styles.core}>Où que vous soyez au moment d'un tremblement de terre, abritez-vous immédiatement. Au besoin, rendez-vous dans un endroit sécuritaire tout près, et restez-y jusqu'à ce que les secousses cessent.</Text>
                <Text style={styles.core}> - Si vous êtes à l'intérieur :</Text>
                <Text style={styles.coreM}>     - « ABRITEZ-VOUS ET AGRIPPEZ-VOUS »</Text>
                <Text style={styles.coreM}>      - Abritez-vous sous un meuble lourd, comme une table, un bureau, un lit ou tout meuble solide.</Text>
                <Text style={styles.coreM}>      - Couvrez votre tête et votre torse afin de vous protéger de tout objet qui pourrait vous tomber dessus.</Text>
                <Text style={styles.core}> - S'il n'y a aucun meuble solide sous lequel vous pouvez vous réfugier ou si vous êtes dans un couloir, mettez-vous en position accroupie le long d'un mur intérieur et protégez votre tête et votre cou avec vos bras.</Text>
                <Text style={styles.core}> - Si vous êtes dans un centre commercial, entrez dans le magasin le plus proche. Éloignez-vous des fenêtres et des rayons comportant des objets lourds.</Text>
                <Text style={styles.core}> - Si vous êtes à l'école, réfugiez-vous sous un bureau ou une table et agrippez-vous-y. Tournez le dos aux fenêtres.</Text>
                <Text style={styles.core}> - Si êtes en fauteuil roulant, verrouillez les roues et protégez-vous le cou et la tête.</Text>
                <Text style={styles.core}> - Si vous êtes à l'extérieur, veuillez restez à l'extérieur. </Text>
            </View>
        </View>

    );
}

/* Si vous êtes à l'intérieur : « ABRITEZ-VOUS ET AGRIPPEZ-VOUS »
Restez à l'intérieur.
Abritez-vous sous un meuble lourd, comme une table, un bureau, un lit ou tout meuble solide.
Couvrez votre tête et votre torse afin de vous protéger de tout objet qui pourrait vous tomber dessus.
Agrippez-vous à l'objet sous lequel vous êtes réfugié afin de rester couvert. Préparez-vous à suivre cet objet en mouvement jusqu'à ce que le tremblement ait cessé.
S'il n'y a aucun meuble solide sous lequel vous pouvez vous réfugier ou si vous êtes dans un couloir, mettez-vous en position accroupie le long d'un mur intérieur et protégez votre tête et votre cou avec vos bras.
Si vous êtes dans un centre commercial, entrez dans le magasin le plus proche. Éloignez-vous des fenêtres et des rayons comportant des objets lourds.
Si vous êtes à l'école, réfugiez-vous sous un bureau ou une table et agrippez-vous-y. Tournez le dos aux fenêtres.
Si vous êtes en fauteuil roulant, verrouillez les roues et protégez-vous le cou et la tête.
Si vous êtes à l'extérieur
Restez à l'extérieur.
*/