import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import 'react-native-get-random-values';
import { ethers } from 'ethers';

const NoteDownSeed = ({ navigation }) => {
  const [seedPhrase, setSeedPhrase] = useState([]);

  useEffect(() => {
    generateSeedPhrase();
  }, []);

  const generateSeedPhrase = async () => {
    try {
      const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
      const newSeedPhrase = mnemonic.split(' ');
      setSeedPhrase(newSeedPhrase);
    } catch (error) {
      console.error('Error generating seed phrase:', error);
    }
  };

  const handleNext = () => {
    navigation.navigate('ConfirmSeedPhrase', { seedPhrase });
  };

  return (
    <View style={styles.container}>
      <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
      </View>
      <Text style={styles.title}>Write Down Your Seed Phrase</Text>
      <Text style={styles.description}>
        This is your seed phrase. Write it down on a paper and keep it in a safe place.
        You'll be asked to re-enter this phrase (in order) on the next step.
      </Text>
      <View style={styles.seedPhraseContainer}>
        {seedPhrase.map((word, index) => (
          <View key={index} style={styles.seedPhraseBox}>
            <Text style={styles.seedPhraseText}>{`${index + 1}. ${word}`}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    paddingTop: 44,
    paddingHorizontal: 20,
  },
  rectanglesContainer: {
    flexDirection: 'row',
    height: 8,
    width: '100%',
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  rectangle: {
    flex: 1,
    height: 8,
    borderRadius: 2,
    backgroundColor: '#222531',
    marginHorizontal: 2,
  },
  title: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 16,
  },
  description: {
    width: '100%',
    fontSize: 14,
    lineHeight: 24,
    textAlign: 'center',
    color: '#ABAFC4',
    marginBottom: 16,
  },
  seedPhraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 16,
  },
  seedPhraseBox: {
    width: '48%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#222531',
    borderRadius: 8,
    marginVertical: 8,
  },
  seedPhraseText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    textAlign: 'center',
  },
  button: {
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEBF32',
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#000',
    textAlign: 'center',
  },
});

export default NoteDownSeed;
