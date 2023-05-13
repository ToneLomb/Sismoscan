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
  
  //coordonnée Paris
  const LATITUDE = 48.8534100;
  const LONGITUDE = 2.3488000;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onLongPress={handleLongPress}
          onMarkerPress={handleMarkerPress}
          initialRegion={{
            latitude: LATITUDE,
            longitude: LONGITUDE,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        >
          {/* markers statique */}
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
