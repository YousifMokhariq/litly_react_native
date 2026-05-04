import React from 'react';
import { View, Text } from 'react-native';
import { Review } from '../schemas/movie.schema';

export default function ReviewItem({ review }: { review: Review }) {
  return (
    <View className="bg-white p-4 mb-3 rounded-xl border border-gray-100 shadow-sm">
      <View className="flex-row justify-between items-center mb-2">
        <Text className="text-lg font-bold text-gray-800">
          {review.username || 'Anonymous'}
        </Text>
        <View className="flex-row">
          {[...Array(5)].map((_, i) => (
            <Text key={i} className={i < review.rating ? "text-yellow-500" : "text-gray-300"}>
              ★
            </Text>
          ))}
        </View>
      </View>
      <Text className="text-gray-600 leading-5">{review.comment}</Text>
      {review.createdAt && (
        <Text className="text-gray-400 text-xs mt-2">{review.createdAt}</Text>
      )}
    </View>
  );
}