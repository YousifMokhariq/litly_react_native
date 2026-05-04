import React from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ReviewSchema, Review } from '../schemas/movie.schema';
import apiClient from '../api/apiClient';
import { useAuthStore } from '../store/useAuthStore';

export default function AddReviewScreen({ route, navigation }: any) {
  const { movieId } = route.params;
  const queryClient = useQueryClient();
  const userId = useAuthStore((state) => state.user?.id);

  const { control, handleSubmit, setValue, watch, formState: { errors, isSubmitting } } = useForm<Review>({
    resolver: zodResolver(ReviewSchema),
    defaultValues: { rating: 1, comment: '', movieId, userId }
  });

  const rating = watch('rating');

  // Mutation for sending data to the server
  const mutation = useMutation({
    mutationFn: (newReview: Review) => {
      console.log('Submitting review:', newReview);
      return apiClient.post('/reviews', newReview);
    },
    onSuccess: (response) => {
      console.log('Review submitted successfully:', response.data);
      alert('Review submitted successfully!');
      queryClient.invalidateQueries({ queryKey: ['reviews', movieId] });
      navigation.goBack();
    },
    onError: (error: any) => {
      console.error('Error submitting review:', error.response?.data || error.message);
      alert(error.response?.data?.message || 'Failed to submit review');
    },
  });

  return (
    <View className="flex-1 p-6 bg-white">
      <Text className="text-2xl font-bold mb-6">Write a Review</Text>

      {/* Star Rating Selection */}
      <Text className="text-lg mb-2">Rating:</Text>
      <View className="flex-row mb-6">
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity key={star} onPress={() => setValue('rating', star)}>
            <Text className={`text-4xl ${rating >= star ? 'text-yellow-500' : 'text-gray-300'}`}>
              ★
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {errors.rating && <Text className="text-red-500 mb-4">{errors.rating.message}</Text>}

      {/* Comment Input */}
      <Controller
        control={control}
        name="comment"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className="border border-gray-300 p-4 rounded-lg h-32 text-lg"
            placeholder="Write your review here..."
            multiline
            textAlignVertical="top"
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
          />
        )}
      />
      {errors.comment && <Text className="text-red-500 mt-1 mb-4">{errors.comment.message}</Text>}

      {mutation.isError && (
        <View className="bg-red-100 border border-red-400 p-3 rounded-lg mb-4">
          <Text className="text-red-800">
            {mutation.error instanceof Error ? mutation.error.message : 'Failed to submit review'}
          </Text>
        </View>
      )}

      <TouchableOpacity
        className={`p-4 rounded-xl mt-6 items-center ${mutation.isPending || isSubmitting ? 'bg-gray-400' : 'bg-blue-600'}`}
        onPress={handleSubmit((data) => {
          console.log('Form data:', data);
          mutation.mutate(data);
        })}
        disabled={mutation.isPending || isSubmitting || !userId}
      >
        {mutation.isPending || isSubmitting ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white font-bold text-lg">Submit Review</Text>
        )}
      </TouchableOpacity>

      {!userId && (
        <Text className="text-red-500 mt-4 text-center">Error: User not logged in</Text>
      )}
    </View>
  );
}