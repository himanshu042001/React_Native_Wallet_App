import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';

export default function TokenSentToFrom({ route, navigation }) {
  const { fromAccount, toAccount } = route.params;
  const [selectedToken, setSelectedToken] = useState('Sepolia'); // Default selected token

  const handleTokenChange = (token) => {
    setSelectedToken(token);
  };

  const handleNext = () => {
    navigation.navigate('TokenAmount', { fromAccount, toAccount, selectedToken });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Sent To</Text>
      
      <Text style={styles.sectionTitle}>From</Text>
      <View style={styles.accountContainer}>
        <Image source={require('../assets/dot.png')} style={styles.icon} />
        <View style={styles.accountDetails}>
          <Text style={styles.accountName}>{fromAccount.name}</Text>
          <Text style={styles.accountAddress}>{fromAccount.address}</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>To</Text>
      <View style={styles.accountContainer}>
        <Image source={require('../assets/dot.png')} style={styles.icon} />
        <View style={styles.accountDetails}>
          <Text style={styles.accountName}>{toAccount.name}</Text>
          <Text style={styles.accountAddress}>{toAccount.address}</Text>
        </View>
      </View>


      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
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
  headerText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#242731',
    borderRadius: 8,
    marginBottom: 20,
    padding: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  accountDetails: {
    marginLeft: 12,
  },
  accountName: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  accountAddress: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
  },
  dropdownContainer: {
    backgroundColor: '#242731',
    borderRadius: 8,
    marginBottom: 20,
  },
  dropdown: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  nextButton: {
    backgroundColor: '#FEBF32',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
});
