import React from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

import apiClient from '../api/apiClient';
import { ReviewSchema, Review } from '../schemas/movie.schema';
import ReviewItem from '../components/ReviewItem'; // We can reuse this!

export default function AdminDashboardScreen() {
  const queryClient = useQueryClient();

  // 1. Fetch all reviews for moderation
  const { data: allReviews, isLoading } = useQuery({
    queryKey: ['admin_reviews'],
    queryFn: async () => {
      const { data } = await apiClient.get('/reviews');
      return data.map((r: any) => ReviewSchema.parse(r));
    }
  });

  // 2. Mutation for Deleting (Replaces deleteReview() in AdminDashboardActivity.java)
  const deleteMutation = useMutation({
    mutationFn: (id: number) => apiClient.delete(`/reviews/${id}`),
    onSuccess: () => {
      // Functional Difference: "Invalidating" tells TanStack to refetch automatically 🔄
      queryClient.invalidateQueries({ queryKey: ['admin_reviews'] });
      Alert.alert("Success", "Review deleted successfully");
    }
  });

  const confirmDelete = (review: Review) => {
    // Replaces the AlertDialog.Builder logic in Java
    Alert.alert(
      "Delete Review",
      `Are you sure you want to delete the review by ${review.username}?`,
      [
        { text: "Cancel", style: "cancel" },
        { text: "Delete", style: "destructive", onPress: () => deleteMutation.mutate(review.id!) }
      ]
    );
  };

  if (isLoading) return <ActivityIndicator className="flex-1" size="large" />;

  return (
    <View className="flex-1 bg-gray-50">
      <View className="p-6 bg-white border-b border-gray-200">
        <Text className="text-2xl font-bold text-gray-900">Review Moderation</Text>
        <Text className="text-gray-500">Manage community feedback</Text>
      </View>

      <FlatList
        data={allReviews}
        keyExtractor={(item) => item.id!.toString()}
        renderItem={({ item }) => (
          <View className="px-4 pt-4">
            <ReviewItem review={item} />
            <TouchableOpacity 
              onPress={() => confirmDelete(item)}
              className="bg-red-50 p-3 rounded-b-xl border-x border-b border-red-100 items-center -mt-3 mb-4"
            >
              <Text className="text-red-600 font-bold">Delete This Review</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={() => (
          <Text className="text-center text-gray-400 mt-20">No reviews to moderate.</Text>
        )}
      />
    </View>
  );
}