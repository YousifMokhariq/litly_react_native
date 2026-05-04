import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { Movie } from './entities/movie.entity';

@Injectable()
export class MoviesService {
  constructor(
    @InjectRepository(Movie)
    private moviesRepository: Repository<Movie>,
  ) {}

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const movie = this.moviesRepository.create(createMovieDto);
    return await this.moviesRepository.save(movie);
  }

  async findAll(): Promise<Movie[]> {
    return await this.moviesRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Movie> {
    const movie = await this.moviesRepository.findOne({ where: { id } });

    if (!movie) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }

    return movie;
  }

  async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    await this.findOne(id); // Check if exists
    await this.moviesRepository.update(id, updateMovieDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const result = await this.moviesRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Movie with ID ${id} not found`);
    }
  }

  async updateRating(movieId: number): Promise<void> {
    const result = await this.moviesRepository
      .createQueryBuilder('movie')
      .leftJoin('movie.reviews', 'review')
      .select('AVG(review.rating)', 'averageRating')
      .addSelect('COUNT(review.id)', 'reviewCount')
      .where('movie.id = :movieId', { movieId })
      .getRawOne();

    await this.moviesRepository.update(movieId, {
      averageRating: result.averageRating || 0,
      reviewCount: result.reviewCount || 0,
    });
  }
}
