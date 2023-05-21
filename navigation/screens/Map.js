import React, { useState, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

export const EarthMap = ({route}) => {
  const [markers, setMarkers] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    if (route.params != undefined) {

      const coordinate = route.params.paramKey.coordinate;
      const title = route.params.paramKey.title
      const description = route.params.paramKey.description

      setMarkers(prevMarkers => [...prevMarkers, {
        coordinate,
        title: title,
        description: description
      }]);
    }
  }, [route.params]);

  //Fonction qui enleve les markers quand on quitte la map
  /* useEffect(() => {
    const cleanUpMarkers = () => {
      setMarkers([]);
    };

    // Ajoutez un écouteur pour l'événement de nettoyage (par exemple, "blur" pour une perte de focus)
    const listener = navigation.addListener('blur', cleanUpMarkers);

    // Retourne une fonction de nettoyage pour supprimer l'écouteur lorsqu'il n'est plus nécessaire
    return () => {
      listener.remove();
    };
  }, []); */
  
  //coordonnée centre France
  const LATITUDE = 46.3159;
  const LONGITUDE = 2.6561;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 16,
            longitudeDelta: 7,
          }}
        >

          {/* affichage dynamique de la liste des markers */}
          {
          markers.map((marker, i) => 
            <Marker 
              key={i} 
              coordinate={marker.coordinate}
              title={marker.title}
              description={marker.description} 
            />
          )}
        </MapView>
      </View>
    )
  }

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
});
