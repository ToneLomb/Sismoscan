import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export const EarthMap = () => {
  const [markers, setMarkers] = useState([]);

  //event appui long
  const handleLongPress = (event) => {
    const { coordinate } = event.nativeEvent;
    setMarkers([...markers, { coordinate }]);

    console.log(coordinate);
    console.log(markers);
  };

  //event appui marker
  const handleMarkerPress = () => {
    console.log("marker pressed");
  };
  
  //coordonnée centre France
  const LATITUDE = 46.3159;
  const LONGITUDE = 2.6561;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onLongPress={handleLongPress}
          onMarkerPress={handleMarkerPress}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 13,
            longitudeDelta: 7,
          }}
        >
          {/* markers statique A ENLEVER */}
          <Marker 
            coordinate={{
              latitude: 48.8534100, 
              longitude: 2.3488000,
            }}
            title={"Paris"}
            description={"Welcome to the rice motherfucker"}
          />
          <Marker
            coordinate={{
              latitude: 43.3,
              longitude: -0.3,
            }}
            title={"Marker title"}
            description={"Marker description"}
          />
          {/* affichage dynamique de la liste des markers */}
          {markers.map((marker, i) => 
            <Marker 
              key={i} 
              coordinate={marker.coordinate} 
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
