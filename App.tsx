import './global.css';
import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AppNavigator } from './src/navigation/AppNavigator';
import { useAuthStore } from './src/store/useAuthStore';

const queryClient = new QueryClient();

export default function App() {
  useEffect(() => {
    // Initialize auth on app startup
    useAuthStore.getState().initializeAuth();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}