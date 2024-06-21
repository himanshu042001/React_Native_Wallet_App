// ViewSeedPhrase.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';

const ViewSeedPhrase = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
      </View>
      <Text style={styles.title}>Write Down Your Seed Phrase</Text>
      <Text style={styles.description}>
        This is your seed phrase. Write it down on a paper and keep it in a safe place. You'll be asked to re-enter this phrase (in order) on the next step.
      </Text>
      <View style={styles.seedPhraseContainer}>
        <Text style={styles.revealText}>Tap to reveal your seed phrase</Text>
        <Text style={styles.warningText}>Make sure no one is watching your screen.</Text>
        <TouchableOpacity style={styles.viewButton} onPress={() => navigation.navigate('NoteDownSeed')}>
          <Feather name="eye" size={18} color="#FEBF32" />
          <Text style={styles.viewButtonText}>View</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.nextButton} disabled>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 812,
    backgroundColor: '#17171A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  rectanglesContainer: {
    flexDirection: 'row',
    width: 303,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  rectangle: {
    height: 8,
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#222531',
    marginHorizontal: 2,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '700',
    lineHeight: 28,
    background: 'linear-gradient(91deg, #A9CDFF 0%, #72F6D1 21.87%, #A0ED8D 55.73%, #FED365 81.77%, #FAA49E 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: 10,
    textAlign: 'center',
    color:'#FEBF32'
  },
  description: {
    width: 327,
    color: '#ABAFC4',

    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  seedPhraseContainer: {
    width: 327,
    height: 320,
    borderRadius: 8,
    border: '1px solid rgba(255, 255, 255, 0.06)',
    backgroundColor: 'rgba(34, 37, 49, 0.60)',
    backdropFilter: 'blur(12px)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  revealText: {
    color: '#FFF',

    fontSize: 14,
    fontWeight: '700',
    lineHeight: 24,
    marginBottom: 10,
  },
  warningText: {
    width: 279,
    color: '#ABAFC4',
    textAlign: 'center',
  
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 20,
    fontWeight: '600',
  },
 viewButton: {
  flexDirection: 'row',
  alignItems: 'center',
  padding: 13,
  borderWidth: 3,
  borderColor: "#FEBF32",
  borderRadius: 3,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.25,
  shadowRadius: 3.84,
  elevation: 5, // For Android
},

  viewButtonText: {
    color: '#FEBF32',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginLeft: 8,
  },
  nextButton: {
    width: 327,
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#222531',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nextButtonText: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default ViewSeedPhrase;
