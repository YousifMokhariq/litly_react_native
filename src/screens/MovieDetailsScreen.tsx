import React from 'react';
import { View, Text, Image, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';

import apiClient from '../api/apiClient';
import { MovieSchema, ReviewSchema } from '../schemas/movie.schema';
import ReviewItem from '../components/ReviewItem';

export default function MovieDetailsScreen() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { movieId } = route.params;

  // Replaces the double Retrofit calls in MovieDetailsActivity.java 🔄
  const { data: movie, isLoading: movieLoading } = useQuery({
    queryKey: ['movie', movieId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/movies/${movieId}`);
      return MovieSchema.parse(data);
    }
  });

  const { data: reviews, isLoading: reviewsLoading } = useQuery({
    queryKey: ['reviews', movieId],
    queryFn: async () => {
      const { data } = await apiClient.get(`/movies/${movieId}/reviews`);
      return data.map((r: any) => ReviewSchema.parse(r));
    }
  });

  // The Header Component (Movie Details)
  const Header = () => (
    <View className="p-4">
      <Image 
        source={{ uri: movie?.posterUrl || 'https://via.placeholder.com/300x450' }} 
        className="w-full h-80 rounded-2xl mb-6"
        resizeMode="cover"
      />
      <Text className="text-3xl font-black text-gray-900">{movie?.title}</Text>
      <View className="flex-row items-center mt-2 mb-4">
        <Text className="bg-primary/10 text-primary px-3 py-1 rounded-full font-bold">
          {movie?.genre}
        </Text>
        <Text className="text-gray-400 ml-4">{movie?.releaseYear} • Dir. {movie?.director}</Text>
      </View>
      
      <Text className="text-lg text-gray-700 leading-6 mb-8">{movie?.description}</Text>
      
      <View className="flex-row justify-between items-center mb-4 border-t border-gray-100 pt-6">
        <Text className="text-2xl font-bold">Reviews</Text>
        <TouchableOpacity 
          className="bg-primary px-4 py-2 rounded-lg"
          onPress={() => navigation.navigate('AddReview', { movieId, movieTitle: movie?.title })}
        >
          <Text className="text-white font-bold">Add Review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (movieLoading) return <ActivityIndicator className="flex-1" size="large" />;

  return (
    <FlatList
      data={reviews}
      keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
      ListHeaderComponent={Header}
      renderItem={({ item }) => <ReviewItem review={item} />}
      contentContainerStyle={{ paddingBottom: 40 }}
      className="bg-white"
      // Replaces noReviewsTextView logic 🧠
      ListEmptyComponent={() => !reviewsLoading && (
        <Text className="text-center text-gray-400 mt-4 italic">
          No reviews yet. Be the first!
        </Text>
      )}
    />
  );
}