import { StyleSheet, Text, View, useWindowDimensions, ScrollView } from 'react-native';
import { useFonts } from 'expo-font';
import LicensePlate from './LicensePlate';
import l from "./licenses.json";
import { useState } from 'react';
import InformationBox from './InformationBox';

export default function App() {
  const [codes, setCodes] = useState([]);
  const [fontsLoaded] = useFonts({
    'EuroPlate': require('./assets/fonts/EuroPlate.ttf'),
  });

  const statistics = l.statistics;
  const licenses = new Map();
  for (let license of l.data) {
    if (licenses.has(license.code)) {
      licenses.set(license.code, [...licenses.get(license.code), license]);
    } else {
      licenses.set(license.code, [license]);
    }
  }

  const handleCodeChange = (code) => {
    setCodes(licenses.has(code) ? licenses.get(code) : []);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {fontsLoaded ? <LicensePlate onChange={handleCodeChange} /> : ""}
        {codes.length > 0 ? codes.map(code => {
          return (
            <InformationBox data={code} statistics={statistics} />
          );
        }) : ""}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    backgroundColor: '#fff',
    alignItems: 'center',
    flexDirection: 'column',
  }
});
