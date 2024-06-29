import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet, Image, Modal, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function SendToken({ route, navigation }) {
  const { selectedAccount, accounts } = route.params; // Destructure accounts here
  
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [selectedToAccount, setSelectedToAccount] = useState(null);
  const [recipient, setRecipient] = useState('');
  const [amount, setAmount] = useState('');

  const toggleToDropdown = () => {
    setShowToDropdown(!showToDropdown);
  };

  const handleAccountSelect = (account) => {
    setSelectedToAccount(account);
    setShowToDropdown(false);
    navigation.navigate('TokenSentToFrom', {
      fromAccount: selectedAccount,
      toAccount: account,
    });
  };

  const handleSend = () => {
    if (!recipient || !amount) {
      Alert.alert('Error', 'Recipient and amount are required.');
      return;
    }
    Alert.alert('Success', `${amount} tokens sent to ${recipient}`);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Send To</Text>
      <Text style={styles.label}>From</Text>
      <View style={styles.accountContainer}>
        <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
        <View style={styles.accountInfo}>
          <Text style={styles.accountName}>{selectedAccount ? selectedAccount.name : 'Select an account'}</Text>
        </View>
      </View>
      
      <Text style={styles.label}>To</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={recipient}
          onChangeText={setRecipient}
          placeholder="Search, public address (0x), or ENS"
          placeholderTextColor="#ABAFC4"
        />
        <TouchableOpacity onPress={() => navigation.navigate('Scanner')}>
          <FontAwesome name="qrcode" size={24} color="#FFF" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.transferButton} onPress={toggleToDropdown}>
        <Text style={styles.transferButtonText}>Transfer Between My Accounts</Text>
      </TouchableOpacity>

      <Text style={styles.recentText}>Recent</Text>
      <ScrollView>
        {accounts.map((account, index) => (
          <TouchableOpacity key={index} style={styles.accountContainer} onPress={() => handleAccountSelect(account)}>
            <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
            <View style={styles.accountInfo}>
              <Text style={styles.accountName}>{account.name}</Text>
              <Text style={styles.accountAddress}>{account.address}</Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <Modal visible={showToDropdown} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalHeaderText}>Select Account</Text>
          {accounts.map((account, index) => (
            <TouchableOpacity key={index} style={styles.accountContainer} onPress={() => handleAccountSelect(account)}>
              <Image source={require('../assets/dot.png')} style={styles.dotIcon} />
              <View style={styles.accountInfo}>
                <Text style={styles.accountName}>{account.name}</Text>
                <Text style={styles.accountAddress}>{account.address}</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>

      <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    padding: 20,
  },
  headerText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '800',
    lineHeight: 26,
    marginBottom: 20,
    marginTop: 30,
  },
  label: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 8,
  },
  accountContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2D3C',
    borderRadius: 8,
    marginBottom: 16,
    padding: 16,
  },
  dotIcon: {
    width: 24,
    height: 24,
    marginRight: 16,
  },
  accountInfo: {
    flex: 1,
  },
  accountName: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  accountBalance: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  accountAddress: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#2A2D3C',
    borderRadius: 8,
    marginBottom: 16,
    padding: 20,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
  },
  transferButton: {
    padding: 16,
    alignItems: 'center',
    borderRadius: 4,
    backgroundColor: '#2A2D3C',
    marginBottom: 16,
  },
  transferButtonText: {
    color: '#5F97FF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 24,
    textDecorationLine: 'underline',
  },
  recentText: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 20,
  },
  modalHeaderText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 20,
  },
  sendButton: {
    backgroundColor: '#FEBF32',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
