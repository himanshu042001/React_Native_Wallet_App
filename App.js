// App.js
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewSeedPhrase from './components/ViewSeedPhrase';
import NoteDownSeed from './components/NoteDownSeed';
import WalletSetup from './components/WalletSetup';
import CreatePassword from './components/CreatePassword';
import SecureWallet from './components/SecureWallet';
import SecureWallet2 from './components/SecureWallet2';
import MainPage from './components/MainPage';
import AddToken from './components/AddToken';
import AddCollectibles from './components/AddCollectibles';
import CancelledTransaction from './components/CancelledTransaction';
import ConfirmedTransaction from './components/ConfirmedTransaction';
import TokenSentTo from './components/TokenSentTo';


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WalletSetup">
        <Stack.Screen name="WalletSetup" component={WalletSetup} options={{ headerShown: false }} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerShown: false }} />
        <Stack.Screen name="SecureWallet" component={SecureWallet} options={{ headerShown: false }} />
        <Stack.Screen name="SecureWallet2" component={SecureWallet2} options={{ headerShown: false }} />
        <Stack.Screen name="ViewSeedPhrase" component={ViewSeedPhrase} options={{ headerShown: false }} />
        <Stack.Screen name="NoteDownSeed" component={NoteDownSeed}  />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} /> 

        <Stack.Screen name="AddToken" component={AddToken} options={{ headerShown: false }} />
        <Stack.Screen name="AddCollectibles" component={AddCollectibles} options={{ headerShown: false }} />
              <Stack.Screen name="ConfirmedTransaction" component={ConfirmedTransaction} options={{ headerShown: false }} />
              <Stack.Screen name="CancelledTransaction" component={CancelledTransaction} options={{ headerShown: false }}/>
              <Stack.Screen name="TokenSentTo" component={TokenSentTo} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
