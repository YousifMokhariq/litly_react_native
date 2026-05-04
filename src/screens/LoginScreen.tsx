import React from 'react';
import { View, Text, TouchableOpacity, ActivityIndicator, Image, TextInput as RNTextInput } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { LoginRequestSchema, LoginRequest } from '../schemas/auth.schema';
import { useAuthStore } from '../store/useAuthStore';
import apiClient from '../api/apiClient';
import { RootStackParamList } from '../navigation/types';

export default function LoginScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const setLogin = useAuthStore((state) => state.setLogin);

  const { control, handleSubmit, formState: { errors, isSubmitting } } = useForm<LoginRequest>({
    resolver: zodResolver(LoginRequestSchema),
    defaultValues: { email: '', password: '' }
  });

  const onSubmit = async (data: LoginRequest) => {
    try {
      // Replaces performLogin() from LoginActivity.java
      const response = await apiClient.post('/users/login', data);
      const { user, token } = response.data;
      
      // Replaces sessionManager.createLoginSession()
      await setLogin(user, token);
      // Navigation is handled automatically by the AppNavigator's conditional rendering
    } catch (error: any) {
      console.error("Login failed:", error.response?.data?.message || error.message);
    }
  };

  return (
    <View className="flex-1 justify-center p-6 bg-white">
      {/* Replaces ImageView and App Title TextViews */}
      <View className="items-center mb-8">
        <Image 
          source={require('../../assets/icon.png')} 
          className="w-32 h-32 mb-4" 
          resizeMode="contain"
        />
        <Text className="text-4xl font-bold text-gray-900">Litly</Text>
        <Text className="text-lg text-gray-500">Your Movie Review Platform</Text>
      </View>

      {/* Email Input - Replaces TextInputLayout */}
      <View className="mb-4">
        <Controller
          control={control}
          name="email"
          render={({ field: { onChange, onBlur, value } }) => (
            <RNTextInput
              className={`border p-4 rounded-lg ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Email"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          )}
        />
        {errors.email && <Text className="text-red-500 mt-1">{errors.email.message}</Text>}
      </View>

      {/* Password Input */}
      <View className="mb-6">
        <Controller
          control={control}
          name="password"
          render={({ field: { onChange, onBlur, value } }) => (
            <RNTextInput
              className={`border p-4 rounded-lg ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
              placeholder="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              secureTextEntry
            />
          )}
        />
        {errors.password && <Text className="text-red-500 mt-1">{errors.password.message}</Text>}
      </View>

      {/* Login Button - Replaces android:id="@+id/loginButton" */}
      <TouchableOpacity
        className="bg-primary p-4 rounded-lg items-center"
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg text-center uppercase">Login</Text>
        )}
      </TouchableOpacity>

      {/* Signup Link - Replaces signupTextView */}
      <TouchableOpacity 
        onPress={() => navigation.navigate('Signup')}
        className="mt-6 items-center"
      >
        <Text className="text-gray-600">
          Don't have an account? <Text className="text-primary font-bold">Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}