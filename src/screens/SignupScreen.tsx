import React from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, 
  TextInput, ActivityIndicator, KeyboardAvoidingView, Platform 
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';

import { UserSchema, User } from '../schemas/auth.schema';
import apiClient from '../api/apiClient';

export default function SignupScreen() {
  const navigation = useNavigation();

  const { control, handleSubmit, watch, setValue, formState: { errors, isSubmitting } } = useForm<User>({
    resolver: zodResolver(UserSchema),
    defaultValues: { username: '', email: '', password: '', role: 'user' }
  });

  const selectedRole = watch('role');

  const onSubmit = async (data: User) => {
    try {
      console.log('Signup attempt with data:', data);
      // Replaces performSignup() in SignupActivity.java 🧠
      const response = await apiClient.post('/users', data);
      console.log('Signup successful:', response.data);
      alert("Signup successful! Please login.");
      navigation.navigate('Login' as any);
    } catch (error: any) {
      console.error('Signup error:', error);
      const errorMsg = error.response?.data?.message || error.message || "Signup failed";
      console.error('Error message:', errorMsg);
      alert(errorMsg);
    }
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      className="flex-1 bg-white"
    >
      <ScrollView contentContainerStyle={{ padding: 24 }}>
        <Text className="text-4xl font-bold text-gray-900 mb-8 mt-10">Create Account</Text>

        {/* Username */}
        <View className="mb-4">
          <Controller control={control} name="username" render={({ field: { onChange, value } }) => (
            <TextInput className="border border-gray-300 p-4 rounded-lg text-lg" placeholder="Username" onChangeText={onChange} value={value} />
          )} />
          {errors.username && <Text className="text-red-500 mt-1">{errors.username.message}</Text>}
        </View>

        {/* Email */}
        <View className="mb-4">
          <Controller control={control} name="email" render={({ field: { onChange, value } }) => (
            <TextInput className="border border-gray-300 p-4 rounded-lg text-lg" placeholder="Email" keyboardType="email-address" autoCapitalize="none" onChangeText={onChange} value={value} />
          )} />
          {errors.email && <Text className="text-red-500 mt-1">{errors.email.message}</Text>}
        </View>

        {/* Password */}
        <View className="mb-6">
          <Controller control={control} name="password" render={({ field: { onChange, value } }) => (
            <TextInput className="border border-gray-300 p-4 rounded-lg text-lg" placeholder="Password" secureTextEntry onChangeText={onChange} value={value} />
          )} />
          {errors.password && <Text className="text-red-500 mt-1">{errors.password.message}</Text>}
        </View>

        {/* Role Selection - Replaces RadioGroup 🔘 */}
        <Text className="text-lg font-semibold mb-3">Select Role:</Text>
        <View className="flex-row mb-8">
          {['user', 'admin'].map((role) => (
            <TouchableOpacity
              key={role}
              onPress={() => setValue('role', role as 'user' | 'admin')}
              className={`mr-4 px-6 py-2 rounded-full border ${selectedRole === role ? 'bg-primary border-primary' : 'bg-white border-gray-300'}`}
            >
              <Text className={`capitalize font-bold ${selectedRole === role ? 'text-white' : 'text-gray-600'}`}>{role}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          className="bg-primary p-4 rounded-xl items-center shadow-lg"
          onPress={handleSubmit(onSubmit)}
          disabled={isSubmitting}
        >
          {isSubmitting ? <ActivityIndicator color="white" /> : <Text className="text-white font-bold text-xl uppercase">Sign Up</Text>}
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}