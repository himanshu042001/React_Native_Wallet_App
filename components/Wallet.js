import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

const initialTransactions = [];

export default function Wallet() {
  const navigation = useNavigation();
  const route = useRoute();
  const [transactions, setTransactions] = useState(initialTransactions);
  const [accountBalance, setAccountBalance] = useState(0);

  useEffect(() => {
    if (route.params?.newTransaction) {
      setTransactions([route.params.newTransaction, ...transactions]);
    }
  }, [route.params?.newTransaction]);

  useEffect(() => {
    const fetchAccountBalance = async () => {
      const balance = await getAccountBalance(); 
      setAccountBalance(balance);
    };

    fetchAccountBalance();
  }, []);

  const handlePress = (transaction) => {
    if (transaction.status === 'Confirmed') {
      navigation.navigate('ConfirmedTransaction', { transaction });
    } else if (transaction.status === 'Cancelled') {
      navigation.navigate('CancelledTransaction', { transaction });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Confirmed':
        return '#76E268';
      case 'Cancelled':
        return 'red';
      default:
        return '#ABAFC4';
    }
  };

  const getArrowIcon = (type) => {
    switch (type) {
      case 'Received':
        return 'arrow-down';
      case 'Sent':
        return 'arrow-up';
      default:
        return 'arrow-right';
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../assets/girl.png')} style={styles.profileImage} />
      </View>
      <Text style={styles.balanceText}>{accountBalance} ETH</Text>
      <Text style={styles.usdText}>$16,858.15 <Text style={styles.pluspercentageText}>+0.7%</Text></Text>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="arrow-up" size={24} color="#FEBF32" />
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="arrow-down" size={24} color="#FEBF32" />
          <Text style={styles.buttonText}>Receive</Text>
        </TouchableOpacity>
      </View>
      <ScrollView contentContainerStyle={styles.tokenContainer}>
        {transactions.map((transaction) => (
          <TouchableOpacity key={transaction.id} style={styles.tokenRow} onPress={() => handlePress(transaction)}>
            <Text style={styles.dateText}>{transaction.date}</Text>
            <FontAwesome name={getArrowIcon(transaction.type)} size={24} color={getStatusColor(transaction.status)} style={styles.arrowIcon} />
            <View style={styles.transactionInfo}>
              <View style={styles.transactionHeader}>
                <Text style={[styles.tokenName, { color: getStatusColor(transaction.status) }]}>{transaction.type} {transaction.token}</Text>
                <Text style={[styles.tokenAmount, { color: getStatusColor(transaction.status) }]}>{transaction.amount}</Text>
              </View>
              <View style={styles.confirmationContainer}>
                <Text style={[styles.confirmationText, { color: getStatusColor(transaction.status) }]}>{transaction.status}</Text>
                <Text style={styles.usdValueText}>{transaction.usdValue}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="wallet" size={24} color="#FEBF32" />
          <Text style={styles.footerText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="exchange" size={24} color="#FEBF32" />
          <Text style={styles.footerText}>Swap</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="cog" size={24} color="#FEBF32" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  header: {
    width: '100%',
    height: 48,
    padding: 8,
    paddingLeft: 24,
    paddingRight: 115,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
  },
  profileImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  balanceText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 40,
    fontWeight: '300',
    lineHeight: 56,
    color: '#FEBF32',
    marginTop: 20,
  },
  usdText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
    color: '#ABAFC4',
  },
  pluspercentageText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '600',
    lineHeight: 18,
    color: '#76E268',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  actionButton: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
  buttonText: {
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#ABAFC4',
    marginTop: 6,
  },
  tokenContainer: {
    width: '100%',
    padding: 16,
    paddingTop: 24,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2C2C2E',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  dateText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 18,
    color: '#ABAFC4',
    flex: 1,
  },
  arrowIcon: {
    marginHorizontal: 8,
  },
  transactionInfo: {
    flex: 3,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tokenName: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
  },
  tokenAmount: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 21,
  },
  confirmationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  confirmationText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
  },
  usdValueText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#ABAFC4',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#1C1C1E',
    width: '100%',
    paddingVertical: 8,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '500',
    lineHeight: 18,
    color: '#ABAFC4',
    marginTop: 4,
  },
  shapeImage: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});
