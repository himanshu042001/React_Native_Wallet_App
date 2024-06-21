import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function AddCollectibles() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Add Collectibles Screen</Text>
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
  text: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
  },
});
