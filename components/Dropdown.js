import React from 'react';
import { View, Text, TouchableOpacity, Modal, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

const Dropdown = ({ isVisible, onClose, selectedNetwork, onSelectNetwork }) => {
  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.dropdownContainer}>
          <Text style={styles.headerText}>Network</Text>
          <Text style={styles.selectedNetwork}>{selectedNetwork}</Text>
          {/* Example of selecting a network */}
          <TouchableOpacity style={styles.networkOption} onPress={() => onSelectNetwork('Ropsten Test')}>
            <Text style={styles.networkOptionText}>• Ropsten Test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.networkOption} onPress={() => onSelectNetwork('Kovan Test')}>
            <Text style={styles.networkOptionText}>• Kovan Test</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.networkOption} onPress={() => onSelectNetwork('Goerli Test')}>
            <Text style={styles.networkOptionText}>• Goerli Test</Text>
          </TouchableOpacity>
          {/* Close button */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  dropdownContainer: {
    backgroundColor: '#1E1E24',
    padding: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  headerText: {
    flex: 1,
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  selectedNetwork: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
  networkOption: {
    marginTop: 8,
    alignSelf: 'center',
  },
  networkOptionText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 24,
  },
  closeButtonText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
});

export default Dropdown;
