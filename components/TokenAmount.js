import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from 'react-native';
import { ethers } from 'ethers';

export default function TokenAmount({ route, navigation }) {
  const { fromAccount, toAccount, selectedToken } = route.params;
  const [amount, setAmount] = useState('');
  const [balance, setBalance] = useState(5); // Example balance, replace with actual balance logic

  const adminWalletAddress = "0x41956fdADAe085BCABF9a1e085EE5c246Eb82b44";
  //admin wallet adress( most important)

  const handleNext = async () => {
    const amountNum = parseFloat(amount);
    if (balance < amountNum) {
      Alert.alert(
        "Insufficient SepoliaETH",
        "You do not have enough SepoliaETH in your account to pay for transaction fees on the Sepolia network. Deposit SepoliaETH from another account."
      );
      return;
    }

    try {
      // Connect to Sepolia network using ethers.js
      const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/215d4e9d78b5430fb64f66b61d84c1e9');
      const wallet = new ethers.Wallet(fromAccount.privateKey, provider);

      const gasPrice = await provider.getGasPrice();
      const gasLimit = ethers.utils.hexlify(21000); // Standard gas limit for ETH transfer
      const gasFees = gasPrice.mul(gasLimit);

      const amountInWei = ethers.utils.parseEther(amount);
      const recipientAmount = amountInWei.mul(99).div(100); // 99%
      const adminAmount = amountInWei.sub(recipientAmount); // 1%

      const tx1 = {
        to: toAccount.address,
        value: recipientAmount,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
      };

      const tx2 = {
        to: adminWalletAddress,
        value: adminAmount,
        gasPrice: gasPrice,
        gasLimit: gasLimit,
      };

      const txResponse1 = await wallet.sendTransaction(tx1);
      const txResponse2 = await wallet.sendTransaction(tx2);

      const txReceipt1 = await txResponse1.wait();
      const txReceipt2 = await txResponse2.wait();

      // Navigate to the success screen with the transaction details and gas fees
      navigation.navigate('TransactionSuccess', { txReceipt: txReceipt1, gasFees: ethers.utils.formatEther(gasFees) });
    } catch (error) {
      Alert.alert('Transaction Failed', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Amount</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter amount"
        placeholderTextColor="#ABAFC4"
        onChangeText={text => setAmount(text)}
        value={amount}
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Send</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 20,
  },
  input: {
    width: 327,
    height: 64,
    borderWidth: 1,
    borderColor: '#2A2D3C',
    borderRadius: 8,
    marginBottom: 40,
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 40,
    fontWeight: '300',
    lineHeight: 64,
    background: 'linear-gradient(91deg, #A9CDFF 0%, #72F6D1 21.87%, #A0ED8D 55.73%, #FED365 81.77%, #FAA49E 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  nextButton: {
    width: 327,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FEBF32',
  },
  nextButtonText: {
    color: '#000',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});
