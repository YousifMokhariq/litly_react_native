import { useQuery } from '@tanstack/react-query';
import apiClient from './apiClient';
import { MovieSchema, Movie } from '../schemas/movie.schema';

export const useMovies = () => {
  return useQuery({
    queryKey: ['movies'],
    queryFn: async (): Promise<Movie[]> => {
      try {
        console.log('Fetching movies from:', apiClient.defaults.baseURL + 'movies');
        const { data } = await apiClient.get('/movies');
        console.log('Raw movies data:', data);
        
        // Functional Difference: Runtime Validation with Zod 🛡️
        const movies = data.map((item: any) => MovieSchema.parse(item));
        console.log('Parsed movies:', movies);
        return movies;
      } catch (error: any) {
        console.error('Error fetching movies:', error.response?.data || error.message);
        throw error;
      }
    },
  });
};

export const useMovieDetails = (id: number) => {
  return useQuery({
    queryKey: ['movie', id],
    queryFn: async (): Promise<Movie> => {
      const { data } = await apiClient.get(`/movies/${id}`);
      return MovieSchema.parse(data);
    },
    enabled: !!id, // Only run if ID is valid
  });
};