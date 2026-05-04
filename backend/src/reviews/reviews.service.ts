import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReviewDto } from './dto/create-review.dto';
import { UpdateReviewDto } from './dto/update-review.dto';
import { Review } from './entities/review.entity';
import { MoviesService } from '../movies/movies.service';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewsRepository: Repository<Review>,
    private moviesService: MoviesService,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<Review> {
    const review = this.reviewsRepository.create(createReviewDto);
    const savedReview = await this.reviewsRepository.save(review);

    // Update movie rating
    await this.moviesService.updateRating(createReviewDto.movieId);

    // Return review with user info
    return await this.findOne(savedReview.id);
  }

  async findAll(): Promise<Review[]> {
    return await this.reviewsRepository.find({
      relations: ['user', 'movie'],
      order: { createdAt: 'DESC' },
    });
  }

  async findByMovie(movieId: number): Promise<Review[]> {
    return await this.reviewsRepository.find({
      where: { movieId },
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewsRepository.findOne({
      where: { id },
      relations: ['user', 'movie'],
    });

    if (!review) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    return review;
  }

  async update(id: number, updateReviewDto: UpdateReviewDto): Promise<Review> {
    const review = await this.findOne(id);
    await this.reviewsRepository.update(id, updateReviewDto);

    // Update movie rating if rating changed
    if (updateReviewDto.rating) {
      await this.moviesService.updateRating(review.movieId);
    }

    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const review = await this.findOne(id);
    const movieId = review.movieId;

    const result = await this.reviewsRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Review with ID ${id} not found`);
    }

    // Update movie rating after deletion
    await this.moviesService.updateRating(movieId);
  }
}
