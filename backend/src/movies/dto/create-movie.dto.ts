export class CreateMovieDto {
  title: string;
  description: string;
  genre: string;
  releaseYear: number;
  director: string;
  posterUrl?: string;
}
