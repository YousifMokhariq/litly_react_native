import React, { useCallback } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

import { useMovies } from '../api/movie.hooks';
import { useAuthStore } from '../store/useAuthStore';
import { RootStackParamList } from '../navigation/types';
import MovieCard from '../components/MovieCard';

export default function HomeScreen() {
  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const { data: movies, isLoading, refetch, error } = useMovies();
  const isAdmin = useAuthStore((state) => state.user?.role === 'admin');
  const logout = useAuthStore((state) => state.logout);

  // Replaces onCreateOptionsMenu logic for Admin Dashboard 🛠️
  useFocusEffect(
    useCallback(() => {
      navigation.setOptions({
        headerRight: () => (
          <View className="flex-row mr-2">
            {isAdmin && (
              <TouchableOpacity onPress={() => navigation.navigate('AdminDashboard')} className="p-2">
                <Text className="text-white font-bold">Admin</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity onPress={() => logout()} className="p-2">
              <Text className="text-white font-bold">Logout</Text>
            </TouchableOpacity>
          </View>
        ),
      });
    }, [navigation, isAdmin, logout])
  );

  return (
    <View className="flex-1 bg-gray-100">
      <FlatList
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ paddingBottom: 20 }}
        
        // The MovieCard replaces the Adapter/ViewHolder pattern 🔄
        renderItem={({ item }) => (
          <MovieCard 
            movie={item} 
            onPress={() => navigation.navigate('MovieDetails', { movieId: item.id, title: item.title })} 
          />
        )}

        // 🌟 Functional Difference: Replacing manual visibility toggling
        ListEmptyComponent={() => (
          <View className="flex-1 items-center justify-center mt-20 p-10">
            {error && (
              <>
                <Text className="text-2xl font-bold text-red-500 text-center mb-4">
                  Error Loading Movies
                </Text>
                <Text className="text-red-600 text-center mb-4">
                  {error instanceof Error ? error.message : 'Failed to fetch movies'}
                </Text>
                <TouchableOpacity onPress={() => refetch()} className="mt-4 bg-primary px-6 py-3 rounded-lg">
                  <Text className="text-white font-bold text-lg">Retry</Text>
                </TouchableOpacity>
              </>
            )}
            {!isLoading && !error && (
              <>
                <Text className="text-2xl font-bold text-gray-400 text-center">
                  No movies available 🎬
                </Text>
                <TouchableOpacity onPress={() => refetch()} className="mt-4">
                  <Text className="text-primary font-bold text-lg">Tap to refresh</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        )}

        // Pull-to-refresh (Replaces action_refresh menu item)
        onRefresh={refetch}
        refreshing={isLoading}
      />
      
      {/* Global Loading Overlay */}
      {isLoading && movies?.length === 0 && (
        <View className="absolute inset-0 bg-white/50 justify-center items-center">
          <ActivityIndicator size="large" color="#6200EE" />
        </View>
      )}
    </View>
  );
}