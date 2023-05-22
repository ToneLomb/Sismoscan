import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Image, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import { styles, images } from '../../src/styles/map'

export const EarthMap = ({ route }) => {
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

  const cleanUpMarkers = () => {
    setMarkers([]);
  };

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
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.clearButton}
          onPress={cleanUpMarkers}
        >
          <Image
            source ={images.poubelle}
            style={styles.trash}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}


