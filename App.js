import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, Text, StyleSheet, Dimensions, ScrollView } from 'react-native';

const { width: windowWidth } = Dimensions.get('window');
const API_KEY = 'eacfd9da7b74faf4a5002c30586b28a8';



export default function App() {
  const [city, setCity] = useState("Loading...");
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState([]);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    //console.log(permission)
    if (!granted) {
      setOk(false);
    }

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const response = await fetch(`http://api.openweathermap.org/data/2.5/air_pollution?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`);
    const json = await response.json();
    console.log(json);
  };//component가 마운트 될때 useEffect를 사용해서 permission 받아오기
  useEffect(() => {
    getWeather();
  }, []);

  return (

    <View style={styles.container}>
      <StatusBar style="light" />
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView pagingEnabled horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.desc}>Sun</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>
        <View style={styles.day}>
          <Text style={styles.temperature}>27</Text>
          <Text style={styles.desc}>Sunny</Text>
        </View>


      </ScrollView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'orange'
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  cityName: {
    fontSize: 68,
    fontWeight: "500"

  },
  weather: {
  },
  day: {
    width: windowWidth,
    flex: 1,
    alignItems: "center",
  },
  temperature: {
    marginTop: 50,
    fontSize: 180

  },
  desc: {
    fontSize: 60

  },
});