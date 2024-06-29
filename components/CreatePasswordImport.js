import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Checkbox from 'expo-checkbox';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreatePasswordImport() {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChecked, setChecked] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const navigation = useNavigation();
  const [passwordStrength, setPasswordStrength] = useState(null); // State to determine password strength

  const handleCreatePassword = async () => {
    if (newPassword.length < 8) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }

    if (newPassword !== confirmPassword && !isChecked) {
      Alert.alert('Error', 'Passwords do not match and checkbox is not checked.');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    if (!isChecked) {
      Alert.alert('Error', 'Checkbox is not checked.');
      return;
    }

    try {
      await AsyncStorage.setItem('userPassword', newPassword);
      Alert.alert('Success', 'Password has been created and stored.');
      navigation.navigate('ImportSeedPhrase');
    } catch (error) {
      Alert.alert('Error', 'Failed to store the password.');
    }
  
  };

  const handleGoToMainPage = () => {
    navigation.navigate('MainPage');
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const getPasswordStrength = (password) => {
    if (password.length >= 8) {
      // For simplicity, checking if password length is 8 or more
      return 'Good';
    } else {
      return 'Weak';
    }
  };

  const updatePasswordStrength = (password) => {
    const strength = getPasswordStrength(password);
    setPasswordStrength(strength);
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
        This password will unlock your CC wallet only on this service
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>New Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword}
            value={newPassword}
            onChangeText={(text) => {
              setNewPassword(text);
              updatePasswordStrength(text); // Update password strength when typing
            }}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888DAA" />
          </TouchableOpacity>
        </View>
        <Text style={styles.passwordStrength}>
          {newPassword.length < 8 ? 'Password must be at least 8 characters' : `Password strength: ${passwordStrength}`}
        </Text>
        <Text style={styles.inputLabel}>Confirm Password</Text>
        <View style={styles.passwordInput}>
          <TextInput
            style={styles.input}
            secureTextEntry={!showPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={togglePasswordVisibility}>
            <Feather name={showPassword ? 'eye-off' : 'eye'} size={24} color="#888DAA" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.checkboxContainer}>
        <Checkbox value={isChecked} onValueChange={setChecked} color={isChecked ? '#FEBF32' : undefined} />
        <Text style={styles.checkboxText}>
          I understand that CC cannot recover this password for me.{' '}
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
    flex: 1,
    backgroundColor: '#17171A',
    alignItems: 'center',
    paddingVertical: 50,
    paddingHorizontal: 20,
  },
  progressContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  progressRect: {
    height: 8,
    width: '20%',
    borderRadius: 2,
    backgroundColor: '#222531',
  },
  title: {
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: "#FEBF32",
    marginVertical: 20,
  },
  subtitle: {
    color: '#ABAFC4',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  inputLabel: {
    color: '#888DAA',
    fontFamily: 'Poppins_400Regular',
    fontSize: 12,
    lineHeight: 16,
    marginBottom: 5,
  },
  passwordInput: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#888DAA',
    marginBottom: 10,
  },
  input: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 14,
    lineHeight: 24,
  },
  eyeIcon: {
    position: 'absolute',
    right: 0,
    padding: 10,
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
    width: '100%',
    marginVertical: 20,
  },
  checkboxText: {
    flex: 1,
    color: '#FFF',
    fontFamily: 'Poppins_400Regular',
    fontSize: 14,
    lineHeight: 24,
    padding: 10,
  },
  learnMore: {
    color: '#5F97FF',
  },
  createPasswordButton: {
    width: '100%',
    padding: 12,
    alignItems: 'center',
    borderRadius: 8,
    backgroundColor: '#FEBF32',
    marginTop: 20,
  },
  createPasswordButtonText: {
    color: '#000',
    fontFamily: 'Poppins_600SemiBold',
    fontSize: 16,
    lineHeight: 24,
  },
  goToMainPageButton: {
    width: '100%',
    padding: 12,
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
  },
});
