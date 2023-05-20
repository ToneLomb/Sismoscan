import React, { useEffect, useState } from "react";
import { TextInput, Text, Image, TouchableOpacity, View, Switch, ScrollView } from "react-native";
import * as Notification from 'expo-notifications';
import * as Location from 'expo-location';
import { styles, images } from '../../src/styles/settings'
import { CustomAlert } from '../../src/components/Alert';


Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

export const SettingsScreen = () => {

  const [accountVisible, setAccountVisible] = useState(false)
  const [apparenceVisible, setApparenceVisible] = useState(false)
  const [notificationVisible, setNotificationVisible] = useState(false)
  const [supportVisible, setSupportVisible] = useState(false)
  const [aboutVisible, setAboutVisible] = useState(false)

  const [rayon, setRayon] = useState(50)
  const [rayonError, setRayonError] = useState(false);

  const [magnitude, setMagnitude] = useState(4)
  const [magnitudeError, setMagnitudeError] = useState(false);

  const [notificationEnabled, setNotification] = useState(true)
  const toggleNotification = () => (setNotification(previousState => !previousState))

  const [darkThemeEnabled, setDarkTheme] = useState(false)
  const toggleTheme = () => (setDarkTheme(previousState => !previousState))


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      if (isMounted) {
        setLocation(location);
      }

      console.log('Latitude:', location.coords.latitude);
      console.log('Longitude:', location.coords.longitude);
    };

    getLocation();

    const interval = setInterval(() => {
      getLocation();
    }, 60000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);


  useEffect(() => {
    checkNotificationPermission();
  }, []);

  async function checkNotificationPermission() {
    const { status: existingStatus } = await Notification.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Permission de notification non accordée!');
    }
  }

  const handleNotification = () => {
    Notification.scheduleNotificationAsync({
      content: {
        title: "Local Notification",
        body: "This is my local notification",
      },
      trigger: null
    });
  };


  const handleSetRayon = (rayon) => {
    if (rayon < 50) {
      setRayonError(!rayonError)
      return;
    } else {
      setRayon(rayon)
    }
  }

  const handleSetMagnitude = (magnitude) => {
    if (magnitude > 5 || magnitude < 0.5) {
      setMagnitudeError(!magnitudeError)
      return;
    } else {
      setMagnitude(magnitude)
    }
  }

  return (
    <ScrollView>
      <View style={{ alignItems: "center" }}>
        <View style={styles.infoContainer}>
          <Text>Test</Text>
        </View>
        <View style={styles.settingsContainer}>
          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => setAccountVisible(!accountVisible)}
          >
            <View style={styles.settingName}>
              <Image
                source={images.compte}
                style={styles.icon}
              />
              <Text style={styles.settingTitle}>
                Compte
              </Text>
            </View>
            <View>
              {!accountVisible ? (
                <Image
                  source={images.chevron}
                  style={styles.chevron}
                />
              ) : (
                <Image
                  source={images.chevronBas}
                  style={styles.chevron}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            {accountVisible ? (
              <View>
                <View style={styles.field}>
                  <View style={styles.settingName}>
                    <Image
                      source={images.langue}
                      style={styles.icon}
                    />
                    <Text style={styles.settingTitle}>
                      Langue : FR
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.field}
                >
                  <View style={styles.settingName}>
                    <Image
                      source={images.logout}
                      style={styles.icon}
                    />
                    <Text style={styles.settingTitle}>
                      Déconnexion
                    </Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => setApparenceVisible(!apparenceVisible)}
          >
            <View style={styles.settingName}>
              <Image
                source={images.apparence}
                style={styles.icon}
              />
              <Text style={styles.settingTitle}>
                Apparence
              </Text>
            </View>
            <View>
              {!apparenceVisible ? (
                <Image
                  source={images.chevron}
                  style={styles.chevron}
                />
              ) : (
                <Image
                  source={images.chevronBas}
                  style={styles.chevron}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            {apparenceVisible ? (
              <View>
                <View style={styles.field}>
                  <View style={styles.settingName}>
                    <Image
                      source={images.theme}
                      style={styles.icon}
                    />
                    <Text style={[styles.settingTitle, { width: "55%" }]}>
                      Thème : {darkThemeEnabled ? "Sombre" : "Clair"}
                    </Text>
                    <Switch
                      trackColor={{ false: '#767577', true: '#56A8D2' }}
                      thumbColor={darkThemeEnabled ? '#f4f3f4' : '#f4f3f4'}
                      onValueChange={toggleTheme}
                      value={darkThemeEnabled}
                    />
                  </View>

                </View>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => setNotificationVisible(!notificationVisible)}
          >
            <View style={styles.settingName}>
              <Image
                source={images.notifications}
                style={styles.icon}
              />
              <Text style={styles.settingTitle}>
                Notifications
              </Text>
            </View>
            <View>
              {!notificationVisible ? (
                <Image
                  source={images.chevron}
                  style={styles.chevron}
                />
              ) : (
                <Image
                  source={images.chevronBas}
                  style={styles.chevron}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            {notificationVisible ? (
              <View>
                <View style={styles.field}>
                  <View style={styles.settingName}>
                    <Image
                      source={images.rayon}
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.settingTitle}
                      keyboardType='numeric'
                      placeholder={"Rayon minimum : " + rayon}
                      onEndEditing={(number) => handleSetRayon(number.nativeEvent.text)}
                    >
                    </TextInput>
                  </View>
                </View>
                <View style={styles.field}>
                  <View style={styles.settingName}>
                    <Image
                      source={images.magnitude}
                      style={styles.icon}
                    />
                    <TextInput
                      style={styles.settingTitle}
                      keyboardType='numeric'
                      placeholder={"Magnitude minimum : " + magnitude}
                      onEndEditing={(number) => handleSetMagnitude(number.nativeEvent.text)}
                    >
                    </TextInput>
                  </View>
                </View>
                <View style={styles.field}>
                  <View style={styles.settingName}>
                    <Image
                      source={images.notifications}
                      style={styles.icon}
                    />
                    <Text style={[styles.settingTitle, { width: "50%" }]}>
                      {notificationEnabled ? "Activées" : "Désactivées"}
                    </Text>
                    <Switch
                      trackColor={{ false: '#767577', true: '#56A8D2' }}
                      thumbColor={notificationEnabled ? '#f4f3f4' : '#f4f3f4'}
                      onValueChange={toggleNotification}
                      value={notificationEnabled}
                    />
                  </View>

                </View>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => setSupportVisible(!supportVisible)}
          >
            <View style={styles.settingName}>
              <Image
                source={images.support}
                style={styles.icon}
              />
              <Text style={styles.settingTitle}>
                Support
              </Text>
            </View>
            <View>
              {!supportVisible ? (
                <Image
                  source={images.chevron}
                  style={styles.chevron}
                />
              ) : (
                <Image
                  source={images.chevronBas}
                  style={styles.chevron}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            {supportVisible ? (
              <View>
                <View style={[styles.field, { marginLeft: 0 }]}>
                  <View style={styles.settingName}>
                    <Image
                      source={images.email}
                      style={styles.icon}
                    />
                    <View>
                      <Text style={[styles.settingTitle, { paddingVertical: 2 }]}>
                        lucas.brancolini@efrei.net
                      </Text>
                      <Text style={[styles.settingTitle, { paddingVertical: 2 }]}>
                        arnaud.kohler@efrei.net
                      </Text>
                      <Text style={[styles.settingTitle, { paddingVertical: 2 }]}>
                        mathieu.lebrun@efrei.net
                      </Text>
                      <Text style={[styles.settingTitle, { paddingVertical: 2 }]}>
                        ludovic.liu.chi.pioa@efrei.net
                      </Text>
                      <Text style={[styles.settingTitle, { paddingVertical: 2 }]}>
                        anriane.mbuguem-koyoue@efrei.net
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            ) : null}
          </View>
          <TouchableOpacity
            style={styles.settingContainer}
            onPress={() => setAboutVisible(!aboutVisible)}
          >
            <View style={styles.settingName}>
              <Image
                source={images.information}
                style={styles.icon}
              />
              <Text style={styles.settingTitle}>
                A propos
              </Text>
            </View>
            <View>
              {!aboutVisible ? (
                <Image
                  source={images.chevron}
                  style={styles.chevron}
                />
              ) : (
                <Image
                  source={images.chevronBas}
                  style={styles.chevron}
                />
              )}
            </View>
          </TouchableOpacity>
          <View>
            {aboutVisible ? (
              <View>
                <View style={[styles.field, { marginLeft: 0 }]}>
                  <View style={styles.settingName}>


                    <Text style={styles.settingTitle}>
                      Nous sommes un groupe de 5 étudiants de l’EFREI. Dans le cadre de notre projet transverse, nous avons choisi de créer une application de détection de séismes qui s’inscrit dans le contexte où un séisme majeur a touché la Turquie en février 2023.
                      Notre équipe est composée de Ludovic LIU CHI PIOA, Arnaud KOHLER, Lucas BRANCOLINI, Anriane MBUGUEM et Mathieu LEBRUN.
                      L’objectif de notre projet est de mettre à disposition un outil permettant d’avertir au plus tôt les utilisateurs en cas de séismes à proximité de leur localisation afin de permettre de mieux préparer les populations si une catastrophe devrait se produire.
                    </Text>

                  </View>
                </View>
              </View>
            ) : null}
          </View>
        </View>
        <CustomAlert
          errorMessage="Le rayon doit être au minimum de 50 kilomètres"
          modalVisible={rayonError}
          setModalVisible={setRayonError} />
        <CustomAlert
          errorMessage="La magnitude minimum doit être comprise entre 0.5 et 5"
          modalVisible={magnitudeError}
          setModalVisible={setMagnitudeError} />

      </View>
    </ScrollView>
  );
}