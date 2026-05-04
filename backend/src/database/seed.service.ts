import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from '../movies/entities/movie.entity';

@Injectable()
export class SeedService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async seedMovies() {
    const count = await this.moviesRepository.count();
    if (count > 0) {
      console.log('Database already seeded!');
      return;
    }

    const sampleMovies = [
      {
        title: 'The Shawshank Redemption',
        description:
          'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
        genre: 'Drama',
        releaseYear: 1994,
        director: 'Frank Darabont',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg',
      },
      {
        title: 'The Godfather',
        description:
          'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
        genre: 'Crime',
        releaseYear: 1972,
        director: 'Francis Ford Coppola',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
      },
      {
        title: 'The Dark Knight',
        description:
          'When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.',
        genre: 'Action',
        releaseYear: 2008,
        director: 'Christopher Nolan',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
      },
      {
        title: 'Pulp Fiction',
        description:
          'The lives of two mob hitmen, a boxer, a gangster and his wife intertwine in four tales of violence and redemption.',
        genre: 'Crime',
        releaseYear: 1994,
        director: 'Quentin Tarantino',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/dM2w364MScsjFf8pfMbaWUcWrR.jpg',
      },
      {
        title: 'Forrest Gump',
        description:
          'The presidencies of Kennedy and Johnson, the Vietnam War, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
        genre: 'Drama',
        releaseYear: 1994,
        director: 'Robert Zemeckis',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg',
      },
      {
        title: 'Inception',
        description:
          'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.',
        genre: 'Sci-Fi',
        releaseYear: 2010,
        director: 'Christopher Nolan',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/9gk7adHYeDvHkCSEqAvQNLV5Uge.jpg',
      },
      {
        title: 'The Matrix',
        description:
          'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
        genre: 'Sci-Fi',
        releaseYear: 1999,
        director: 'The Wachowskis',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/f89U3ADr1oiB1s9GkdPOEpXUk5H.jpg',
      },
      {
        title: 'Interstellar',
        description:
          "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
        genre: 'Sci-Fi',
        releaseYear: 2014,
        director: 'Christopher Nolan',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg',
      },
      {
        title: 'Parasite',
        description:
          'Greed and class discrimination threaten the newly formed symbiotic relationship between the wealthy Park family and the destitute Kim clan.',
        genre: 'Thriller',
        releaseYear: 2019,
        director: 'Bong Joon Ho',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
      },
      {
        title: 'The Avengers',
        description:
          "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
        genre: 'Action',
        releaseYear: 2012,
        director: 'Joss Whedon',
        posterUrl:
          'https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg',
      },
    ];

    await this.moviesRepository.save(sampleMovies);
    console.log(`Seeded ${sampleMovies.length} movies!`);
  }
}
