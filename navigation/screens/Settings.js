import React, {useState, useEffect} from "react";
import { Button, TextInput, Text, View } from "react-native";
import { useNavigation } from '@react-navigation/native';

export const SettingsScreen = () => {

    const [fields, setFields] = useState([]);
    const navigation = useNavigation();

    const addField = () => {
    const newField = <TextInput key={fields.length} />;
    setFields( [...fields, newField]);
  };  
  
  useEffect(() => {
    const cleanUpFields = () => {
      setFields([]);
    };

    // Ajoutez un écouteur pour l'événement de nettoyage (par exemple, "blur" pour une perte de focus)
    const listener = navigation.addListener('blur', cleanUpFields);

    // Retourne une fonction de nettoyage pour supprimer l'écouteur lorsqu'il n'est plus nécessaire
    return () => {
      listener.remove();
    };
  }, []);

    return (
        <View >
            <View >
            {fields.map((field) => field)}
            <Button title="Ajouter un champ" onPress={addField} />
            </View>
        </View>
      );
}