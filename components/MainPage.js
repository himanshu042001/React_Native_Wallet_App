import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal, TextInput, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { ethers } from 'ethers';
import Dropdown from './Dropdown'; // Import your Dropdown component

const mockTokens = [
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

export default function MainPage({ navigation, route }) {
  const [selectedTab, setSelectedTab] = useState('Tokens');
  const [showDropdown, setShowDropdown] = useState(false); // State for dropdown visibility
  const [selectedNetwork, setSelectedNetwork] = useState('Ethereum Main'); // State for selected network
  const [showAccountModal, setShowAccountModal] = useState(false); // State for account modal visibility
  const [accounts, setAccounts] = useState([{ name: 'Account 1', address: '0x123...abc' }]);
  const [newAccountName, setNewAccountName] = useState('');
  const [showCreateAccount, setShowCreateAccount] = useState(false); // State for create account UI
  const [mnemonic, setMnemonic] = useState(''); // State for mnemonic
  const [tokens, setTokens] = useState(mockTokens); // State to manage tokens
  const [selectedAccount, setSelectedAccount] = useState(null); // State to manage selected account
  const [showToDropdown, setShowToDropdown] = useState(false);
  const [balance, setBalance] = useState('');

  const provider = new ethers.providers.JsonRpcProvider('https://sepolia.infura.io/v3/215d4e9d78b5430fb64f66b61d84c1e9');


  useEffect(() => {
    // Set the default selected account or fetch the account details
    if (accounts && accounts.length > 0) {
      setSelectedAccount(accounts[0]);
    }
  }, [accounts]);



  useEffect(() => {
    if (route.params?.newToken) {
      setTokens((prevTokens) => [...prevTokens, route.params.newToken]);
    }
  }, [route.params?.newToken]);

  // Function to toggle dropdown visibility
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  // Function to handle network selection
  const selectNetwork = (network) => {
    setSelectedNetwork(network);
    setShowDropdown(false); // Close the dropdown after selecting a network
  };

  // Function to handle account selection
  const selectAccount = (account) => {
    // Ensure account is not null or undefined
    if (account && account.name) {
      alert(`Selected account: ${account.name}`);
      // Close the account modal after selecting an account
      setShowAccountModal(false);
      // Optionally, you can set the selected account state here if needed
      setSelectedAccount(account);
    } else {
      alert('Invalid account selected');
      // Handle invalid selection case if needed
    }
  };
  

  // Function to handle account creation using ethers.js
  const handleCreateAccount = () => {
    const seed = ethers.utils.mnemonicToSeed(mnemonic);
    const rootNode = ethers.utils.HDNode.fromSeed(seed);
    const newAccountIndex = accounts.length;
    const childNode = rootNode.derivePath(`m/44'/60'/0'/0/${newAccountIndex}`);
    const newAccount = {
      name: newAccountName || `Account ${newAccountIndex + 1}`,
      address: ethers.utils.computeAddress(childNode.publicKey),
      privateKey: childNode.privateKey,
    };
    setAccounts([...accounts, newAccount]);
    setShowCreateAccount(false); // Close the create account UI
    setNewAccountName(''); // Reset the new account name input
 
  };

   const getBalance = async (address) => {
    const balance = await provider.getBalance(address);
    return ethers.utils.formatEther(balance);
  };

  useEffect(() => {
    const fetchBalance = async () => {
      if (selectedAccount) {
        const balance = await getBalance(selectedAccount.address);
        setBalance(balance);
      }
    };

    fetchBalance();
  }, [selectedAccount]);
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

      {/* Account Selection Button */}
      <TouchableOpacity style={styles.accountButton} onPress={() => setShowAccountModal(true)}>
        <Text style={styles.accountButtonText}>Account 1</Text>
        <FontAwesome name="chevron-down" size={12} color="#FFF" />
      </TouchableOpacity>
      
      {/* Balance Section */}
      <Text style={styles.balanceText}>{balance} Eth</Text>
      <Text style={styles.usdText}>
        $16,858.15 <Text style={styles.pluspercentageText}>+0.7%</Text>
      </Text>

      {/* Action Buttons */}
      <View style={styles.buttonRow}>
      <TouchableOpacity 
  style={styles.actionButton} 
  onPress={() => navigation.navigate('SendToken', { 
    selectedAccount, 
    accounts // Pass accounts here 
  })}
>
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
      <ScrollView style={styles.contentContainer}>
        {selectedTab === 'Tokens' && (
          <View style={styles.tokenContainer}>
            {tokens.map((token, index) => (
              <View key={index} style={styles.tokenRow}>
                <Image source={token.icon} style={styles.tokenIcon} />
                <View style={styles.tokenInfo}>
                  <Text style={styles.tokenName}>{token.name}</Text>
                  <Text style={styles.tokenSubtext}>
                    {token.usdValue} <Text style={{ color: token.changeColor }}>{token.changePercentage}</Text>
                  </Text>
                </View>
                <Text style={styles.tokenAmount}>{token.amount}</Text>
              </View>
            ))}
            {/* Add Token Button */}
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddToken')}>
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
            <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('AddCollectibles')}>
              <FontAwesome name="plus" size={16} color="#FEBF32" />
              <Text style={styles.addButtonText}>Add Collectibles</Text>
            </TouchableOpacity>
          </View>
        )}
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
      {/* Footer Section */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={() => navigation.navigate('Wallet')}>
          <FontAwesome name="wallet" size={24} color="#FEBF32" />
          <Text style={styles.footerText}>Wallet</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="cogs" size={24} color="#FEBF32" />
          <Text style={styles.footerText}>Settings</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.footerButton}>
          <FontAwesome name="exchange" size={24} color="#FEBF32" />
          <Text style={styles.footerText}>Swap</Text>
        </TouchableOpacity>
      </View>

      {/* Network Selection Dropdown */}
      {showDropdown && (
        <Dropdown
          items={['Ethereum Main', 'Binance Smart Chain', 'Polygon']}
          onSelect={selectNetwork}
          onClose={toggleDropdown}
        />
      )}


       {/* Account Selection Modal */}
       <Modal transparent={true} visible={showAccountModal} animationType="slide">
        <View style={styles.modalOverlay} onPress={() => setShowAccountModal(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Select Account</Text>
            {accounts.map((account, index) => (
              <TouchableOpacity key={index} style={styles.accountRow} onPress={() => selectAccount(account)}>
                <Text style={styles.accountName}>{account.name}</Text>
                <Text style={styles.accountAddress}>{account.address}</Text>
              </TouchableOpacity>
            ))}
            {/* Create New Account Button */}
            <TouchableOpacity style={styles.createAccountButton} onPress={() => setShowCreateAccount(true)}>
              <Text style={styles.createAccountButtonText}>Create New Account</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowAccountModal(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Create Account Modal */}
      <Modal transparent={true} visible={showCreateAccount} animationType="slide">
        <View style={styles.modalOverlay} onPress={() => setShowCreateAccount(false)}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Create New Account</Text>
            <TextInput
              style={styles.input}
              placeholder="Account Name"
              placeholderTextColor="#ABAFC4"
              value={newAccountName}
              onChangeText={setNewAccountName}
            />
            <TouchableOpacity style={styles.createAccountButton} onPress={handleCreateAccount}>
              <Text style={styles.createAccountButtonText}>Create</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.closeButton} onPress={() => setShowCreateAccount(false)}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
          
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#181A20',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  networkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  networkText: {
    color: '#FFF',
    marginRight: 8,
  },
  accountButton: {
    backgroundColor: '#242731',
    padding: 10,
    borderRadius: 20,
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  accountButtonText: {
    color: '#FFF',
    marginRight: 8,
  },
  balanceText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  usdText: {
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  pluspercentageText: {
    color: '#76E268',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  actionButton: {
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    marginTop: 8,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#242731',
    borderRadius: 20,
    marginBottom: 20,
  },
  tab: {
    padding: 10,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#1F222A',
    padding: 10,
    borderRadius: 20,
  },
  tabText: {
    color: '#FFF',
  },
  contentContainer: {
    flex: 1,
  },
  tokenContainer: {
    marginBottom: 20,
  },
  tokenRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  tokenIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  tokenInfo: {
    flex: 1,
  },
  tokenName: {
    color: '#FFF',
    fontSize: 16,
  },
  tokenSubtext: {
    color: '#6C6C6C',
  },
  tokenAmount: {
    color: '#FFF',
    fontSize: 16,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#242731',
    padding: 10,
    borderRadius: 20,
  },
  addButtonText: {
    color: '#FEBF32',
    marginLeft: 8,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: '#1F222A',
    padding: 20,
    borderRadius: 20,
  },
  footerButton: {
    alignItems: 'center',
  },
  footerText: {
    color: '#FFF',
    marginTop: 8,
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    backgroundColor: '#242731',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 20,
    marginBottom: 20,
  },
  modalItem: {
    color: '#FFF',
    fontSize: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
    width: '100%',
    textAlign: 'center',
  },
  createAccountButton: {
    backgroundColor: '#FEBF32',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  createAccountButtonText: {
    color: '#181A20',
  },
  closeModalButton: {
    backgroundColor: '#444',
    padding: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  closeModalButtonText: {
    color: '#FFF',
  },
  createAccountContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: '80%',
  },
  mnemonicContainer: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
  },
  mnemonicTitle: {
    fontWeight: 'bold',
    marginBottom: 10,
  },
  mnemonicText: {
    fontStyle: 'italic',
  },

  accountButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#26262A',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  accountButtonText: {
    color: '#FFF',
    fontSize: 16,
    marginRight: 5,
    fontFamily: 'Poppins',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#26262A',
    borderRadius: 8,
    padding: 20,
    alignItems: 'center',
  },
  modalTitle: {
    color: '#FFF',
    fontSize: 20,
    fontFamily: 'Poppins',
    marginBottom: 20,
  },
  accountRow: {
    width: '100%',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#17171A',
    alignItems: 'center',
  },
  accountName: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  accountAddress: {
    color: '#ABAFC4',
    fontSize: 14,
    fontFamily: 'Poppins',
  },
  createAccountButton: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  createAccountButtonText: {
    color: '#FEBF32',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  closeButton: {
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  closeButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#ABAFC4',
    color: '#FFF',
    fontSize: 16,
    fontFamily: 'Poppins',
    width: '100%',
    marginBottom: 20,
  },
});
