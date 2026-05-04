## API Endpoints

### Users

- `POST /users` - Create new user (signup)
- `POST /users/login` - User login
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `PATCH /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Movies

- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie by ID
- `GET /movies/:id/reviews` - Get all reviews for a movie
- `POST /movies` - Create new movie (admin)
- `PATCH /movies/:id` - Update movie (admin)
- `DELETE /movies/:id` - Delete movie (admin)

### Reviews

- `GET /reviews` - Get all reviews
- `GET /reviews/:id` - Get review by ID
- `POST /reviews` - Create new review
- `PATCH /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review