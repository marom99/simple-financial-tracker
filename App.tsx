import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExpenseStoreProvider } from './src/features/expenses/ExpenseStoreContext';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ExpenseStoreProvider>
        <HomeScreen />
        <StatusBar style="dark" />
      </ExpenseStoreProvider>
    </SafeAreaProvider>
  );
}
