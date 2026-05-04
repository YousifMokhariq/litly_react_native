export type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
  Home: undefined;
  // Replaces Intent extras: intent.putExtra("MOVIE_ID", id)
  MovieDetails: { movieId: number; title: string };
  AddReview: { movieId: number; movieTitle: string };
  AdminDashboard: undefined;
};