import { Agentation } from 'agentation';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ExpenseStoreProvider } from './src/features/expenses/ExpenseStoreContext';
import { HomeScreen } from './src/screens/HomeScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <ExpenseStoreProvider>
        <HomeScreen />
        <StatusBar style="dark" />
        {Platform.OS === 'web' && __DEV__ && (
          <Agentation endpoint="http://localhost:4747" />
        )}
      </ExpenseStoreProvider>
    </SafeAreaProvider>
  );
}
