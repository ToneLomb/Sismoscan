import React, { useEffect, useState } from "react";
import { TextInput, Text, Image, TouchableOpacity, View, Switch, ScrollView } from "react-native";
import * as Notification from 'expo-notifications';
import * as Location from 'expo-location';
import { styles, images } from '../../src/styles/settings'
import { CustomAlert } from '../../src/components/Alert';


//Parametre des notifications
Notification.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: true,
      shouldShowAlert: true,
    };
  },
});

//Définition des messages d'alerte
const categorie = {
  MINEUR: "Attention, séisme mineur",
  LEGER: "Attention, séisme léger",
  MODERE: "Potentiel danger, abritez vous",
  FORT: "Danger, abritez vous",
  TRES_FORT: "Urgent, abritez vous de toute urgence"
};

//On évalue le danger du séisme en fonction de sa magnitude et de sa distance, à l'aide des tableaux de l'échelle de Richter
const evaluateDanger = (seisme, lat2, lng2) => {

  const lat1 = seisme.properties.latitude
  const lng1 = seisme.properties.longitude
  const magnitude = seisme.properties.mag

  const distance = calculateDistance(lat1, lng1, lat2, lng2)


  if (magnitude < 4 && distance < 50) return categorie.MINEUR
  else if (magnitude < 5 && distance < 7000) return categorie.LEGER
  else if (magnitude < 6 && distance < 300) return categorie.MODERE
  else if (magnitude < 7 && distance < 500) return categorie.FORT
  else if (magnitude < 8 && distance < 800) return categorie.TRES_FORT
  else return "Pas de danger"


}


function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371; //Rayon de la terre

  //Conversion en radians
  const lat1Rad = (Math.PI / 180) * lat1;
  const lng1Rad = (Math.PI / 180) * lng1;
  const lat2Rad = (Math.PI / 180) * lat2;
  const lng2Rad = (Math.PI / 180) * lng2;

  //Différence en radians
  const dlat = lat2Rad - lat1Rad;
  const dlng = lng2Rad - lng1Rad;

  //Formule de harvesine
  const a =
    Math.sin(dlat / 2) ** 2 +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(dlng / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  //Conversion distance
  const distance = R * c;

  return distance;
}
const RE = 0.008;

export const SettingsScreen = () => {

  //Pour le CSS, permet de voir si on a cliqué ou non sur le setting
  const [accountVisible, setAccountVisible] = useState(false)
  const [apparenceVisible, setApparenceVisible] = useState(false)
  const [notificationVisible, setNotificationVisible] = useState(false)
  const [supportVisible, setSupportVisible] = useState(false)
  const [aboutVisible, setAboutVisible] = useState(false)

  //relatif aux parametres de notifications, erreur si conditions non remplies
  const [rayon, setRayon] = useState(500)
  const [rayonError, setRayonError] = useState(false);

  const [magnitude, setMagnitude] = useState(3)
  const [magnitudeError, setMagnitudeError] = useState(false);


  const [notificationEnabled, setNotification] = useState(true)
  const toggleNotification = () => (setNotification(previousState => !previousState))

  const [darkThemeEnabled, setDarkTheme] = useState(false)
  const toggleTheme = () => (setDarkTheme(previousState => !previousState))


  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {

    //Si les notifications sont désactivés, il ne se passe rien
    if (!notificationEnabled) return;
    let isMounted = true;

    //Sinon on récupére la localisation du telephone
    const getLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      //Si pas de permission
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }
      //Sinon on prend la localisation
      let location = await Location.getCurrentPositionAsync({});
      if (isMounted) {
        setLocation(location);
      }

      //Construction des parametres de l'url pour l'API france seisme
      const rayonRE = rayon * RE
      var endDate = new Date()
      var startDate = new Date(endDate)

      startDate.setDate(endDate.getDate() - 1)

      endDate = endDate.toISOString()
      startDate = startDate.toISOString()

      const latitude = location.coords.latitude.toFixed(2)
      const longitude = location.coords.longitude.toFixed(2)

      const url = "https://api.franceseisme.fr/fdsnws/event/1/query?endtime=" + endDate +
        "&eventtype=earthquake&format=json&latitude=" + latitude + "&longitude=" +
        longitude + "&maxradius=" + rayonRE + "&minmagnitude=" + magnitude + "&orderby=time&starttime=" + startDate;

      console.log("url : ", url)

      //Réponse de l'API
      let response = await fetch(url);
      let data = await response.json();

      //S'il y a au moins un séisme
      if (data.features.length > 0) {
        data.features.forEach(seisme => {
          var dateSeisme = new Date(seisme.properties.time)
          var maintenant = new Date()

          //De quand date il (l'API oblige au moins 24h de délai, on veut un délai plus court pour l'urgence)
          const differenceEnMillisecondes = Math.abs(maintenant - dateSeisme);

          //Evaluation du danger du seisme
          var categorie = evaluateDanger(seisme, latitude, longitude)

          //S'il date de moins de 3 minutes
          if (differenceEnMillisecondes / 1000 < 180000) {
            //Notification qui va dépendre du danger
            if (categorie != "Pas de danger") {
              handleNotification(categorie, seisme.properties.description.fr)
            }
          } else return
        })
      } else return
    };

    getLocation();

    //on lance la fonction toutes les 90s
    const interval = setInterval(() => {
      getLocation();
    }, 90000);

    //Lorsqu'on quitte, on arrête tout
    return () => {
      isMounted = false;
      clearInterval(interval);
    };
    //Chaque fois qu'on change un setting, la fonction est rechargée
  }, [rayon, magnitude, notificationEnabled]);


  useEffect(() => {
    checkNotificationPermission();
  }, []);

  //Permert de vérifier que l'on a la permission de notification
  async function checkNotificationPermission() {
    //demande la permission
    const { status: existingStatus } = await Notification.getPermissionsAsync();
    let finalStatus = existingStatus;


    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    //Si pas de permission, on alerte
    if (finalStatus !== 'granted') {
      Alert.alert('Permission de notification non accordée!');
    }
  }

  //Parametre de la notifiation à envoyer
  const handleNotification = (title, body) => {
    Notification.scheduleNotificationAsync({
      content: {
        title: title,
        body: body,
        imageUrl: images.email
      },
      trigger: null
    });
  };

  //Si on change le rayon
  const handleSetRayon = (rayon) => {
    if (rayon < 50) {
      setRayonError(!rayonError)
      return;
    } else {
      setRayon(rayon)
    }
  }

  //Si on change la magnitude
  const handleSetMagnitude = (magnitude) => {
    if (magnitude > 4 || magnitude < 0) {
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
          <View style={{width: "80%", paddingVertical: 30}}>
          <Image
            style={styles.logo}
            source={images.logoNoir} />
          </View>
          <View style={styles.textContainer}>
            
              <Text style={{fontWeight: "bold", fontSize: 25, textAlign: "center", color: "#19C2BC"}}>
                Restez sereins !
              </Text>
              <Text style={styles.bienvenue}>
              Soyez alertés en cas de séismes proches de vous ! Consultez nos conseils pour survivre en cas de séisme, et amusez vous à rechercher les séismes partout en France avec notre carte interactive !
            </Text>
          </View>

        </View>
        <View style={styles.settingsContainer}>
          <Text style={{fontWeight: "bold", fontSize: 25, textAlign: "center", color: "#19C2BC", textAlign: "center", paddingBottom: 20}}> Paramètres</Text>
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
                      Nous sommes un groupe de 5 étudiants <Text style={{ fontWeight: "bold", color: "#56A8D2" }}>d'EFREI Paris</Text>. Dans le cadre de notre projet transverse, nous avons choisi de créer une application <Text style={{ fontWeight: "bold", color: "#56A8D2" }}>d'alerte de séismes</Text> qui s’inscrit dans le contexte où un séisme majeur a touché la Turquie en février 2023.
                      Notre équipe est composée de <Text style={{ fontWeight: "bold", color: "#56A8D2" }}>Ludovic</Text> LIU CHI PIOA, <Text style={{ fontWeight: "bold", color: "#56A8D2" }}>Arnaud</Text> KOHLER, <Text style={{ fontWeight: "bold", color: "#56A8D2" }}>Lucas</Text> BRANCOLINI, <Text style={{ fontWeight: "bold", color: "#56A8D2" }}>Anriane</Text> MBUGUEM et <Text style={{ fontWeight: "bold", color: "#56A8D2" }}>Mathieu</Text> LEBRUN.
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
          errorMessage="Pour votre sécurité la magnitude minimum doit être comprise entre 0 et 4."
          modalVisible={magnitudeError}
          setModalVisible={setMagnitudeError} />

      </View>
    </ScrollView>
  );
}