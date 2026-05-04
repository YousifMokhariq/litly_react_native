import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { useAuthStore } from '../store/useAuthStore';
import { RootStackParamList } from './types';

// Import your screens (we will create these next!)
import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import HomeScreen from '../screens/HomeScreen';
import MovieDetailsScreen from '../screens/MovieDetailsScreen';
import AddReviewScreen from '../screens/AddReviewScreen';
import AdminDashboardScreen from '../screens/AdminDashboardScreen';

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);
  const isAdmin = useAuthStore((state) => state.user?.role === 'admin');

  return (
    <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: '#6200EE' }, headerTintColor: '#fff' }}>
      {!isLoggedIn ? (
        // Public Routes
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Signup" component={SignupScreen} options={{ title: 'Create Account' }} />
        </>
      ) : (
        // Protected Routes (Replaces manual Activity management)
        <>
          <Stack.Screen name="Home" component={HomeScreen} options={{ title: 'Litly Movies' }} />
          <Stack.Screen name="MovieDetails" component={MovieDetailsScreen} />
          <Stack.Screen name="AddReview" component={AddReviewScreen} />
          <Stack.Screen 
            name="AdminDashboard" 
            component={AdminDashboardScreen}
            options={{
              title: 'Admin Dashboard',
            }}
          />
        </>
      )}
    </Stack.Navigator>
  );
};