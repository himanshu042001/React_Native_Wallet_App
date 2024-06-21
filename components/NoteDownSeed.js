// NoteDownSeed.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NoteDownSeed = () => {
  return (
    <View style={styles.container}>
      {/* Implement the UI and functionality for noting down the seed phrase */}
      <Text style={styles.text}>Note down your seed phrase here...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default NoteDownSeed;
