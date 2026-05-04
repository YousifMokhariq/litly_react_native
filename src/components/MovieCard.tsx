import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { Movie } from '../schemas/movie.schema';

interface Props {
  movie: Movie;
  onPress: () => void;
}

export default function MovieCard({ movie, onPress }: Props) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      className="bg-white m-2 rounded-xl shadow-md overflow-hidden flex-row"
    >
      {/* Poster Image - Replaces Glide logic 🖼️ */}
      <Image 
        source={{ uri: movie.posterUrl || 'https://via.placeholder.com/100x150' }} 
        className="w-[100px] h-[150px]"
        resizeMode="cover"
      />

      <View className="flex-1 p-3 justify-center">
        <Text className="text-xl font-bold text-gray-900" numberOfLines={2}>
          {movie.title}
        </Text>
        <Text className="text-base text-gray-500 mt-1">{movie.genre}</Text>
        <Text className="text-base text-gray-400">{movie.releaseYear}</Text>
        
        <View className="flex-row items-center mt-2">
          <Text className="text-yellow-500 text-lg">★ </Text>
          <Text className="text-base font-semibold">{movie.averageRating.toFixed(1)}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}