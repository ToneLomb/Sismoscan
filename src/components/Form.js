import React, { useState } from 'react';
import { Image, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { MyDatePicker } from './DatePicker';
import { CustomAlert } from './Alert';
import { images, styles } from '../styles/form';
import { Search, ville } from './Search';


const RE = 0.008;
export var seismes = []


function checkDates(startDate, endDate) {

  return new Date(startDate) <= new Date(endDate)
}

const parseDates = (date) => {
  return (date.split('T')[0])
}

const dateStringParse = (dateString) => {
  let dateParts = dateString.split('/');

  let year = parseInt(dateParts[0]);
  let month = parseInt(dateParts[1]) - 1; //Mois indéxés +1
  let day = parseInt(dateParts[2]); //Jours indéxés -1

  let date = new Date(year, month, day)

  date.setUTCHours(date.getUTCHours() + 2)

  return date.toISOString()
}

const today = new Date()
const yesterday = new Date()

yesterday.setDate(yesterday.getDate() - 1)

const todayString = parseDates(today.toISOString()).replaceAll('-', '/')
const yesterdayString = parseDates(yesterday.toISOString()).replaceAll('-', '/')


export const MyForm = () => {

  const [rayon, setRayon] = useState('');
  const [date1, setDate1] = useState(dateStringParse(yesterdayString));
  const [date2, setDate2] = useState(dateStringParse(todayString));
  const [selected, setSelected] = useState(false)

  const [dateError, setDateError] = useState(false);
  const [rayonError, setRayonError] = useState(false);
  const [villeError, setVilleError] = useState(false);

  const handleDate1Select = (newDate) => {
    date = dateStringParse(newDate)
    setDate1(date);
  }

  const handleDate2Select = (newDate) => {
    date = dateStringParse(newDate)
    setDate2(date);
  }


  const handleSubmit = () => {
    if (rayon < 50) {
      setRayonError(!rayonError)
      return;
    }
    if (ville.name == "Rechercher") {
      setVilleError(!villeError)
      return;
    } else {
      fetchJson(rayon, ville.lat, ville.lng, date1, date2)
    }
  }


  async function fetchJson(rayon, latitude, longitude, startDate, endDate) {
    let endDateString = parseDates(endDate)
    let startDateString = parseDates(startDate)

    if (!checkDates(startDateString, endDateString)) {
      setDateError(!dateError)
      return;
    }

    const rayonRE = rayon * RE

    const url = "https://api.franceseisme.fr/fdsnws/event/1/query?endtime=" + endDate +
      "&eventtype=earthquake&format=json&latitude=" + latitude + "&longitude=" +
      longitude + "&maxradius=" + rayonRE + "&orderby=time&starttime=" + startDate;

    console.log(url);

    let response = await fetch(url);
    let data = await response.json();
    seismes = []
    data.features.forEach(seisme => {
      seismes.push(seisme)
      console.log(seisme.properties.description.fr)
    });


  }

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={{fontWeight: "500", fontSize: 20, borderBottomColor: "black", borderBottomWidth: 1}}>
            Recherche de séisme
          </Text>
        </View>
        <View style={styles.body}>
          <View style={styles.villeContainer}>
            <View style={styles.fieldContainer}>
              <View style={styles.fieldTitle}>
                <Text style={styles.text}>
                  Rayon
                </Text>
                <Image
                  style={styles.image}
                  source={images.radius}
                />
              </View>
              <View style={styles.field}>
                <TextInput
                  style={{ paddingLeft: 5, backgroundColor: "#e2e4e9", borderRadius: 5 }}
                  type="number"
                  keyboardType='numeric'
                  placeholder="Rayon"
                  onChangeText={(number) => setRayon(number)}
                />
              </View>
            </View>
            <View style={styles.fieldContainer}>
              <View style={styles.fieldTitle}>
                <Text style={styles.text}>
                  Ville
                </Text>
                <Image
                  style={styles.image}
                  source={images.ping}
                />
              </View>
              <View style={styles.field}>
                <TouchableOpacity
                  onPress={() => setSelected(!selected)}
                  style={{ paddingLeft: 5, paddingVertical: 3, backgroundColor: "#e2e4e9", borderRadius: 5 }}
                >
                  <Text
                    style={{ fontFamily: "Roboto", fontSize: 15 }}
                  >
                    {ville.name}
                  </Text>
                </TouchableOpacity>
                <Search
                  selected={selected}
                  setSelected={setSelected}
                />
              </View>
            </View>
          </View>
          <View style={styles.dateContainer}>
            <View style={styles.date}>
              <Text style={styles.text}>
                Date de début
              </Text>
              <MyDatePicker
                startDate={yesterdayString}
                onDateChange={handleDate1Select}
              />
            </View>
            <View style={styles.date}>
              <Text style={styles.text}>
                Date de fin
              </Text>
              <MyDatePicker
                startDate={todayString}
                onDateChange={handleDate2Select} />
            </View>
          </View>
        </View>
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.boutton}
            onPress={handleSubmit}
          >
            <Text style={styles.bouttonText}>
              Rechercher
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <CustomAlert
        errorMessage="La date de fin ne peut pas être antérieure à celle du début"
        modalVisible={dateError}
        setModalVisible={setDateError} />
      <CustomAlert
        errorMessage="Le rayon doit être au minimum de 50 kilomètres"
        modalVisible={rayonError}
        setModalVisible={setRayonError} />
      <CustomAlert
        errorMessage="Veuillez d'abord spécifier une ville"
        modalVisible={villeError}
        setModalVisible={setVilleError} />
    </View>

  );

};
