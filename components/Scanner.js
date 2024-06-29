import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; // Assuming FontAwesome is used for the scanner icon

export default function Scanner() {
//   const handleScan = () => {
//     // Simulating scanning action
//     setTimeout(() => {
//       navigation.navigate('TokenSentToFrom'); // Navigate to TokenSentToFrom after scanning (simulated)
//     }, 2000); // Simulating a delay for scanning
//   };

//   useEffect(() => {
//     // Simulate scanning another account after mounting
//     handleScan();
//   }, []); // Empty dependency array means it runs once on mount

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.scanButton} /*onPress={handleScan}*/>
        <FontAwesome name="qrcode" size={120} color="#FEBF32" />
      </TouchableOpacity>
      <Text style={styles.text}>Scanning...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17171A',
  },
  scanButton: {
    width: 300,
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    flexShrink: 0,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    textAlign: 'center',
    marginTop: 20,
  },
});
