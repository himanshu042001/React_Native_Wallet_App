import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ethers } from 'ethers';

const provider = new ethers.providers.JsonRpcProvider('https://mainnet.infura.io/v3/215d4e9d78b5430fb64f66b61d84c1e9'); // Replace <API-KEY> with your actual Infura API key
const abi = [
  "function name() view returns (string)",
  "function symbol() view returns (string)",
  "function decimals() view returns (uint8)",
  "function balanceOf(address) view returns (uint256)",
];

export default function AddToken({ navigation, route }) {
  const [address, setAddress] = useState('');
  const [isValid, setIsValid] = useState(true);
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [showTokenInfo, setShowTokenInfo] = useState(false);

  const handleAddressChange = (input) => {
    setAddress(input);
    if (ethers.utils.isAddress(input)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  };

  const handleNext = async () => {
    if (ethers.utils.isAddress(address)) {
      try {
        const tokenContract = new ethers.Contract(address, abi, provider);
        const symbol = await tokenContract.symbol();
        const name = await tokenContract.name();
        setTokenSymbol(symbol);
        setTokenName(name);
        setShowTokenInfo(true);
      } catch (error) {
        setIsValid(false);
      }
    }
  };

  const handleImport = () => {
    const newToken = { address, symbol: tokenSymbol, name: tokenName };
    navigation.navigate('MainPage', { newToken });
    
    

  };
  

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Add Token</Text>

      <View style={styles.warningContainer}>
        <FontAwesome name="exclamation-triangle" size={24} color="#FEBF32" />
        <Text style={styles.warningText}>
          Anyone can create a token, including creating fake versions of existing tokens.
        </Text>
      </View>

      <Text style={styles.sectionHeader}>Token Contract Address</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter token contract address"
        placeholderTextColor="#ABAFC4"
        value={address}
        onChangeText={handleAddressChange}
      />
      {!isValid && <Text style={styles.invalidText}>Invalid address</Text>}

      {!showTokenInfo && (
        <TouchableOpacity
          style={[styles.nextButton, isValid ? styles.activeButton : styles.inactiveButton]}
          onPress={handleNext}
          disabled={!isValid}
        >
          <Text style={styles.buttonText}>Next</Text>
        </TouchableOpacity>
      )}

      {showTokenInfo && (
        <View>
          <Text style={styles.sectionHeader}>Would you like to import this token?</Text>
          <Text style={styles.tokenSymbol}>{tokenSymbol}</Text>
          <View style={styles.buttonRow}>
            <TouchableOpacity style={styles.backButton} onPress={() => setShowTokenInfo(false)}>
              <Text style={styles.buttonText}>Back</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.importButton} onPress={handleImport}>
              <Text style={styles.buttonText}>Import</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  header: {
    color: '#FEBF32',
    fontSize: 24,
    fontFamily: 'Poppins',
    marginBottom: 20,
    textAlign: 'center',
  },
  warningContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#26262A',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  warningText: {
    color: '#FFF',
    fontSize: 14,
    fontFamily: 'Poppins',
    marginLeft: 10,
  },
  sectionHeader: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  input: {
    backgroundColor: '#26262A',
    color: '#FFF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  invalidText: {
    color: 'red',
    fontSize: 14,
    fontFamily: 'Poppins',
    marginBottom: 10,
  },
  nextButton: {
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  activeButton: {
    backgroundColor: '#FEBF32',
  },
  inactiveButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#17171A',
    fontSize: 16,
    fontFamily: 'Poppins',
    textAlign: 'center',
  },
  tokenSymbol: {
    color: '#FFF',
    fontSize: 24,
    fontFamily: 'Poppins',
    textAlign: 'center',
    marginBottom: 20,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  backButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },
  importButton: {
    backgroundColor: '#FEBF32',
    padding: 15,
    borderRadius: 5,
    flex: 1,
    marginLeft: 10,
  },
});
