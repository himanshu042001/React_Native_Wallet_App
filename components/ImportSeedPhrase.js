import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { ethers } from 'ethers';

const ImportSeedPhrase = ({ navigation }) => {
  const [seedPhrase, setSeedPhrase] = useState(new Array(12).fill(''));
  const [isVerified, setIsVerified] = useState(false);

  // Function to handle text input changes
  const handleSeedPhraseChange = (text, index) => {
    const newSeedPhrase = [...seedPhrase];
    newSeedPhrase[index] = text;
    setSeedPhrase(newSeedPhrase);
  };

  // Function to verify seed phrase using ethers.js
  const verifySeedPhrase = async () => {
    try {
      const mnemonic = seedPhrase.join(' ');
      const isValid = ethers.utils.isValidMnemonic(mnemonic); // Check if mnemonic is valid
      if (isValid) {
        setIsVerified(true);
        navigation.navigate('VerifiedSeedPhrase');
        Alert.alert('Verification passed', 'Seed phrase is verified by ethers.js');
      } else {
        setIsVerified(false);
        Alert.alert('Verification Failed', 'Seed phrase not verified by ethers.js');
      }
    } catch (error) {
      console.error('Error verifying seed phrase:', error);
      setIsVerified(false);
      Alert.alert('Verification Failed', 'An error occurred while verifying seed phrase');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.rectanglesContainer}>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
        <View style={styles.rectangle}></View>
      </View>
      <Text style={styles.header}>Write down the Seed Phrase for your CC Wallet</Text>
      <View style={styles.seedPhraseContainer}>
        {seedPhrase.map((word, index) => (
          <TextInput
            key={index}
            style={styles.seedPhraseBox}
            placeholder={`Word ${index + 1}`}
            onChangeText={(text) => handleSeedPhraseChange(text, index)}
            value={word}
            maxLength={20}
            autoFocus={index === 0} // Autofocus on the first input
          />
        ))}
      </View>
      <TouchableOpacity style={styles.verifyButton} onPress={verifySeedPhrase}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    paddingVertical: 48,
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
  header: {
    fontFamily: 'Poppins',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 28,
    textAlign: 'center',
    color: '#FFF',
    marginBottom: 16,
  },
  seedPhraseContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  seedPhraseBox: {
    width: '48%', // Adjust as needed for spacing between inputs
    marginVertical: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: '#222531',
    borderRadius: 8,
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
  verifyButton: {
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

export default ImportSeedPhrase;
