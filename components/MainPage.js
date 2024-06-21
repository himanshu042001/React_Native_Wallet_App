import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import Dropdown from './Dropdown'; // Import your Dropdown component

const mockTokens = [
  {
    name: 'Binance Coin',
    amount: '19.2371 BNB',
    usdValue: '$226.69',
    changePercentage: '+0.2%',
    changeColor: '#76E268',
    icon: require('../assets/dot.png'),
  },
  {
    name: 'Ethereum',
    amount: '10.1234 ETH',
    usdValue: '$1845.60',
    changePercentage: '-0.3%',
    changeColor: 'red',
    icon: require('../assets/dot.png'),
  },
  {
    name: 'Cardano',
    amount: '500 ADA',
    usdValue: '$1.20',
    changePercentage: '+0.4%',
    changeColor: '#76E268',
    icon: require('../assets/dot.png'),
  },
];

const mockCollectibles = [
  {
    name: 'Collectible 1',
    usdValue: '$1000',
    amount: '1 Item',
    icon: require('../assets/dot.png'),
  },
  {
    name: 'Collectible 2',
    usdValue: '$500',
    amount: '2 Items',
    icon: require('../assets/dot.png'),
  },
  {
    name: 'Collectible 3',
    usdValue: '$300',
    amount: '3 Items',
    icon: require('../assets/dot.png'),
  },
];

export default function MainPage() {
  const [selectedTab, setSelectedTab] = useState('Tokens');
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum Main'); // State for selected network

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle network selection
  const selectNetwork = (network) => {
    setSelectedNetwork(network);
    setShowDropdown(false); // Close the dropdown after selecting a network
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Image source={require('../assets/girl.png')} style={styles.profileImage} />
        <TouchableOpacity style={styles.networkContainer} onPress={toggleDropdown}>
          <Text style={styles.networkText}>{selectedNetwork}</Text>
          <FontAwesome name="chevron-down" size={12} color="#FFF" />
        </TouchableOpacity>
      </View>

      {/* Balance Section */}
      <Text style={styles.balanceText}>9.2362 ETH</Text>
      <Text style={styles.usdText}>$16,858.15 <Text style={styles.pluspercentageText}>+0.7%</Text></Text>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="arrow-up" size={24} color="#FEBF32" />
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="arrow-down" size={24} color="#FEBF32" />
          <Text style={styles.buttonText}>Receive</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionButton}>
          <FontAwesome name="shopping-cart" size={24} color="#FEBF32" />
          <Text style={styles.buttonText}>Buy</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => setSelectedTab('Tokens')} style={selectedTab === 'Tokens' ? styles.activeTab : styles.tab}>
          <Text style={styles.tabText}>Tokens</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedTab('Collectibles')} style={selectedTab === 'Collectibles' ? styles.activeTab : styles.tab}>
          <Text style={styles.tabText}>Collectibles</Text>
        </TouchableOpacity>
      </View>

      {/* Content based on selected tab */}
      <View style={styles.contentContainer}>
        {selectedTab === 'Tokens' && (
          <View style={styles.tokenContainer}>
            {mockTokens.map((token, index) => (
              <View key={index} style={styles.tokenRow}>
                <Image source={token.icon} style={styles.tokenIcon} />
                <View style={styles.tokenInfo}>
                  <Text style={styles.tokenName}>{token.name}</Text>
                  <Text style={styles.tokenSubtext}>{token.usdValue} <Text style={{ color: token.changeColor }}>{token.changePercentage}</Text></Text>
                </View>
                <Text style={styles.tokenAmount}>{token.amount}</Text>
              </View>
            ))}
            {/* Example of adding a token */}
            <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add Tokens pressed')}>
              <FontAwesome name="plus" size={16} color="#FEBF32" />
              <Text style={styles.addButtonText}>Add Tokens</Text>
            </TouchableOpacity>
          </View>
        )}

        {selectedTab === 'Collectibles' && (
          <View style={styles.tokenContainer}>
            {mockCollectibles.map((collectible, index) => (
              <View key={index} style={styles.tokenRow}>
                <Image source={collectible.icon} style={styles.tokenIcon} />
                <View style={styles.tokenInfo}>
                  <Text style={styles.tokenName}>{collectible.name}</Text>
                  <Text style={styles.tokenSubtext}>{collectible.usdValue}</Text>
                </View>
                <Text style={styles.tokenAmount}>{collectible.amount}</Text>
              </View>
            ))}
            {/* Example of adding a collectible */}
            <TouchableOpacity style={styles.addButton} onPress={() => console.log('Add Collectibles pressed')}>
              <FontAwesome name="plus" size={16} color="#FEBF32" />
              <Text style={styles.addButtonText}>Add Collectibles</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Footer Section */}
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

      {/* Shape Image */}
      <Image source={require('../assets/Shape1.png')} style={styles.shapeImage} />

      {/* Dropdown Component */}
      <Dropdown
        isVisible={showDropdown}
        onClose={() => setShowDropdown(false)}
        selectedNetwork={selectedNetwork}
        onSelectNetwork={selectNetwork}
      />
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
  networkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkText: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 20,
    fontWeight: '800',
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
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 24,
    color: '#ABAFC4',
  },
  pluspercentageText: {
    color: '#76E268',
  },
  minuspercentageText: {
    color: 'red',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 327,
    marginTop: 20,
  },
  actionButton: {
    display: 'flex',
    padding: 8,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 327,
    marginTop: 20,
    marginBottom: 20,
  },
  tab: {
    paddingBottom: 8,
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
    paddingBottom: 8,
  },
  tabText: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  contentContainer: {
    alignItems: 'center',
    flex: 1,
  },
  tokenContainer: {
    width: 343,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 8,
  },
  tokenIcon: {
    width: 40,
    height: 40,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    color: '#FFF',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  tokenSubtext: {
    color: '#ABAFC4',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '800',
    lineHeight: 18,
  },
  tokenAmount: {
    color: '#FFF',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  addButton: {
    display: 'inline-flex',
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
  },
  addButtonText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    height: 72,
    alignItems: 'center',
    backgroundColor: '#17171A',
    position: 'absolute',
    bottom: 0,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#FEBF32',
    textAlign: 'center',
    fontFamily: 'Poppins',
    fontSize: 12,
    fontWeight: '700',
    lineHeight: 18,
  },
  shapeImage: {
    position: 'absolute',
    right: 0,
    top: 40,
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
