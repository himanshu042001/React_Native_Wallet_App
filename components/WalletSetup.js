import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useFonts, Poppins_300Light, Poppins_600SemiBold } from '@expo-google-fonts/poppins';
import AppLoading from 'expo-app-loading';

export default function WalletSetup() {
  const navigation = useNavigation();
  
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_600SemiBold,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/illust.png')} style={styles.image} />
      <Text style={styles.title}>Wallet setup</Text>
      <TouchableOpacity style={styles.buttonGray}>
        <Text style={styles.buttonGrayText}>Import Using Seed Phrase</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.buttonYellow} onPress={() => navigation.navigate('CreatePassword')}>
        <Text style={styles.buttonYellowText}>Create a New Wallet</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 812,
    backgroundColor: '#17171A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  image: {
    width: 304,
    height: 296,
    marginBottom: 20,
  },
  title: {
    width: 295,
    fontFamily: 'Poppins_300Light',
    fontSize: 40,
    fontStyle: 'normal',
    fontWeight: '300',
    lineHeight: 56,
    textAlign: 'center',
    color: 'white',
    marginBottom: 20,
  },
  buttonGray: {
    borderRadius: 8,
    backgroundColor: '#2A2D3C',
    padding: 16,
    marginBottom: 20,
    width: 327,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonGrayText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  buttonYellow: {
    borderRadius: 8,
    backgroundColor: '#FEBF32',
    padding: 16,
    width: 327,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonYellowText: {
    color: '#000',
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
});
