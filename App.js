// App.js
import {React,useState} from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ViewSeedPhrase from './components/ViewSeedPhrase';
import NoteDownSeed from './components/NoteDownSeed';
import WalletSetup from './components/WalletSetup';
import CreatePassword from './components/CreatePassword';
import SecureWallet from './components/SecureWallet';
import SecureWallet2 from './components/SecureWallet2';
import MainPage from './components/MainPage';
import AddCollectibles from './components/AddCollectibles';
import CancelledTransaction from './components/CancelledTransaction';
import ConfirmedTransaction from './components/ConfirmedTransaction';
import TokenSentTo from './components/TokenSentTo';
import Wallet from './components/Wallet';
import Scanner from './components/Scanner';
import TokenAmount from './components/TokenAmount';
import TokenSentToFrom from './components/TokenSentToFrom';
import ConfirmSeedPhrase from './components/ConfirmSeedPhrase';
import SuccessSeedPhrase from './components/SuccessSeedPhrase';
import CreatePasswordImport from './components/CreatePasswordImport';
import ImportSeedPhrase from './components/ImportSeedPhrase';
import VerifiedSeedPhrase from './components/VerifiedSeedPhrase';
import SendToken from './components/SendToken';
import AddToken from './components/AddToken';
import TransactionSuccess from './components/TransactionSuccess';


const Stack = createStackNavigator();


export default function App() {
  const [tokens, setTokens] = useState([]);
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="WalletSetup">
        <Stack.Screen name="WalletSetup" component={WalletSetup} options={{ headerShown: false }} />
        <Stack.Screen name="CreatePassword" component={CreatePassword} options={{ headerShown: false }} />
        <Stack.Screen name="CreatePasswordImport" component={CreatePasswordImport} options={{ headerShown: false }} />
        <Stack.Screen name="SecureWallet" component={SecureWallet} options={{ headerShown: false }} />
        <Stack.Screen name="SecureWallet2" component={SecureWallet2} options={{ headerShown: false }} />
        <Stack.Screen name="ViewSeedPhrase" component={ViewSeedPhrase} options={{ headerShown: false }} />
        <Stack.Screen name="NoteDownSeed" component={NoteDownSeed} options={{ headerShown: false }}  />
        <Stack.Screen name="MainPage" component={MainPage} options={{ headerShown: false }} /> 

        <Stack.Screen name="SendToken" component={SendToken} options={{ headerShown: false }} />
        <Stack.Screen name="Wallet" component={Wallet} options={{ headerShown: false }} />
        <Stack.Screen name="AddToken" component={AddToken} options={{ headerShown: false }} />
        <Stack.Screen name="AddCollectibles" component={AddCollectibles} options={{ headerShown: false }} />
              <Stack.Screen name="ConfirmedTransaction" component={ConfirmedTransaction} options={{ headerShown: false }} />
              <Stack.Screen name="CancelledTransaction" component={CancelledTransaction} options={{ headerShown: false }}/>
              <Stack.Screen name="TokenSentTo" component={TokenSentTo} options={{ headerShown: false }} />
              <Stack.Screen name="Scanner" component={Scanner} options={{ headerShown: false }} />
              <Stack.Screen name="TokenAmount" component={TokenAmount} 
              options={{ headerShown: false }} />
               <Stack.Screen name="TokenSentToFrom" component={TokenSentToFrom} options={{ headerShown: false }} />
               
        <Stack.Screen name="ConfirmSeedPhrase" component={ConfirmSeedPhrase} options={{ headerShown: false }}/>
        <Stack.Screen name="SuccessSeedPhrase" component={SuccessSeedPhrase} options={{ headerShown: false }}/>
        <Stack.Screen name="ImportSeedPhrase" component={ImportSeedPhrase} options={{ headerShown: false }}/>
        <Stack.Screen name="VerifiedSeedPhrase" component={VerifiedSeedPhrase} options={{ headerShown: false }}/>
        <Stack.Screen name="TransactionSuccess" component={TransactionSuccess} />
      </Stack.Navigator>
      
    </NavigationContainer>
  );
}
