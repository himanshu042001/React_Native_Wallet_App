import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';

export default function CreatePassword() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const navigation = useNavigation();

  const handleCreatePassword = () => {
    if (newPassword === confirmPassword && isChecked) {
      navigation.navigate('SecureWallet');
    } else {
      alert('Passwords do not match or checkbox is not checked.');
    }
  };

  const handleGoToMainPage = () => {
    navigation.navigate('MainPage');
  };

  return (
    <View style={styles.container}>
      <View style={styles.progressContainer}>
        <Feather name="arrow-left" size={24} color="#FFF" />
        <View style={styles.progressRect}></View>
        <View style={styles.progressRect}></View>
        <View style={styles.progressRect}></View>
        <Feather name="arrow-right" size={24} color="#FFF" />
      </View>
      <Text style={styles.title}>Create Password</Text>
      <Text style={styles.subtitle}>
        This password will unlock your Metamask wallet only on this service
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>New Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={newPassword}
          onChangeText={setNewPassword}
        />
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          style={styles.input}
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Text style={styles.passwordStrength}>Password strength: Good</Text>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox value={isChecked} onValueChange={setChecked} color={isChecked ? '#FEBF32' : undefined} />
        <Text style={styles.checkboxText}>
          I understand that DeGe cannot recover this password for me.{' '}
          <Text style={styles.learnMore}>Learn more</Text>
        </Text>
      </View>
      <TouchableOpacity
        style={[styles.createPasswordButton, { opacity: isChecked ? 1 : 0.5 }]}
        onPress={handleCreatePassword}
        disabled={!isChecked}
      >
        <Text style={styles.createPasswordButtonText}>Create Password</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.goToMainPageButton}
        onPress={handleGoToMainPage}
      >
        <Text style={styles.goToMainPageButtonText}>Go to Main Page</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 375,
    height: 812,
    backgroundColor: '#17171A',
    alignItems: 'center',
    padding: 50,
  },
  progressContainer: {
    flexDirection: 'row',
    width: 303,
    alignItems: 'center',
    gap: 6,
    flexShrink: 0,
  },
  progressRect: {
    height: 8,
    flex: 1,
    borderRadius: 2,
    backgroundColor: '#222531',
  },
  title: {
    width: 327,
    textAlign: 'center',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    background: 'linear-gradient(91deg, #A9CDFF 0%, #72F6D1 21.87%, #A0ED8D 55.73%, #FED365 81.77%, #FAA49E 100%)',
    backgroundClip: 'text',
    WebkitBackgroundClip: 'text',
    color: "#FEBF32",
    marginVertical: 20,
  },
  subtitle: {
    width: 307,
    color: '#ABAFC4',
    textAlign: 'center',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
  },
  inputContainer: {
    width: 327,
    marginBottom: 20,
  },
  inputLabel: {
    color: '#888DAA',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 16,
  },
  input: {
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    lineHeight: 24,
    borderBottomColor: '#888DAA',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  passwordStrength: {
    color: '#888DAA',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 16,
    marginTop: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 327,
    marginVertical: 20,
  },
  checkboxText: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    padding:10
  },
  learnMore: {
    color: '#5F97FF',
  },
  createPasswordButton: {
    display: 'flex',
    width: 327,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FEBF32',
  },
  createPasswordButtonText: {
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontVariant: ['lining-nums', 'proportional-nums'],
  },
  goToMainPageButton: {
    display: 'flex',
    width: 327,
    padding: 12,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FEBF32',
    marginTop: 20,
  },
  goToMainPageButtonText: {
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    fontVariant: ['lining-nums', 'proportional-nums'],
  },
});
