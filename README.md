# Litly - Movie Review Application

A full-stack mobile application built with React Native (Expo) frontend and NestJS backend for discovering and reviewing movies.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation & Setup](#installation--setup)
- [Running the Project](#running-the-project)
- [Available Scripts](#available-scripts)
- [Features](#features)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)

## 🎯 Project Overview

Litly is a cross-platform movie review application that allows users to:

- Browse and discover movies
- Create and manage user accounts with authentication
- Write and read reviews for movies
- Access an admin dashboard for content management

The application consists of two main parts:

- **Frontend**: React Native mobile app using Expo
- **Backend**: NestJS REST API with PostgreSQL database

## 🛠️ Tech Stack

### Frontend

- **React Native** 0.81.5 - Mobile app framework
- **Expo** 54.0.0 - React Native development platform
- **React Navigation** 7.x - Navigation management
- **TailwindCSS** 3.4.19 - Utility-first CSS framework
- **NativeWind** 4.2.3 - Tailwind CSS for React Native
- **Zod** 4.3.6 - Schema validation
- **React Hook Form** 7.72.0 - Form state management
- **React Query** 5.95.2 - Data fetching and caching
- **Axios** 1.13.6 - HTTP client
- **Zustand** 5.0.12 - State management
- **i18next** 25.10.9 - Internationalization
- **TypeScript** ~5.9.2 - Type safety

### Backend

- **NestJS** 11.0.1 - Progressive Node.js framework
- **TypeORM** 0.3.27 - Object-relational mapping
- **PostgreSQL** - Database
- **Bcrypt** 6.0.0 - Password hashing
- **Swagger** 11.2.0 - API documentation
- **Jest** 30.0.0 - Testing framework
- **ESLint** & **Prettier** - Code quality and formatting

## 📁 Project Structure

```
LitlyReactNat/
├── src/                          # Frontend source code
│   ├── api/                      # API integration
│   │   ├── apiClient.ts         # Axios configuration
│   │   └── movie.hooks.ts       # React Query hooks
│   ├── components/              # Reusable UI components
│   │   ├── MovieCard.tsx
│   │   └── ReviewItem.tsx
│   ├── navigation/              # Navigation setup
│   │   ├── AppNavigator.tsx
│   │   └── types.ts
│   ├── schemas/                 # Validation schemas
│   │   ├── auth.schema.ts
│   │   └── movie.schema.ts
│   ├── screens/                 # Screen components
│   │   ├── AddReviewScreen.tsx
│   │   ├── AdminDashboardScreen.tsx
│   │   ├── HomeScreen.tsx
│   │   ├── LoginScreen.tsx
│   │   ├── MovieDetailsScreen.tsx
│   │   └── SignupScreen.tsx
│   └── store/                   # State management
│       └── useAuthStore.ts
├── backend/                      # Backend source code
│   ├── src/
│   │   ├── app.module.ts       # Root module
│   │   ├── main.ts             # Application entry point
│   │   ├── database/           # Database configuration
│   │   ├── movies/             # Movies module
│   │   ├── reviews/            # Reviews module
│   │   └── users/              # Users module (auth)
│   ├── test/                    # E2E tests
│   └── package.json
├── assets/                       # Images and icons
├── App.tsx                       # Root component
├── app.json                      # Expo configuration
├── package.json                  # Frontend dependencies
├── tsconfig.json
├── tailwind.config.js
├── nativewind-env.d.ts
├── babel.config.js
└── metro.config.js
```

### Backend Module Structure

- **app.module.ts** - Root module that imports all feature modules
- **database/** - Database setup and seeding
  - `database.module.ts` - Database configuration
  - `seed.service.ts` - Initial data seeding
- **users/** - User authentication and management
  - `users.service.ts` - User business logic
  - `users.controller.ts` - API endpoints
  - `dto/` - Data transfer objects
  - `entities/` - Database entities
- **movies/** - Movie management
  - `movies.service.ts` - Movie business logic
  - `movies.controller.ts` - API endpoints
  - `entities/` - Movie entity
- **reviews/** - Review management
  - `reviews.service.ts` - Review business logic
  - `reviews.controller.ts` - API endpoints
  - `entities/` - Review entity

## 📦 Prerequisites

- **Node.js** >= 18.0.0
- **npm** or **pnpm** (pnpm recommended)
- **Expo CLI** (for mobile development)
- **PostgreSQL** (for backend database)
- **Android Studio** or **Xcode** (for mobile emulation)

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd LitlyReactNat
```

### 2. Install Frontend Dependencies

```bash
npm install
# or
pnpm install
```

### 3. Install Backend Dependencies

```bash
cd backend
npm install
# or
pnpm install
cd ..
```

### 4. Environment Configuration

Create a `.env` file in the backend directory with the following variables:

```env
# Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=litly

# JWT Configuration (optional)
JWT_SECRET=your_secret_key

# API Configuration
API_PORT=3000
API_URL=http://localhost:3000
```

### 5. Database Setup

```bash
cd backend

# Create PostgreSQL database
createdb litly

# Run migrations (if available)
npm run typeorm:migration:run

# Seed initial data (optional)
npm run seed
```

## 🎮 Running the Project

### Option 1: Development Mode (Recommended)

**Terminal 1 - Backend:**

```bash
cd backend
npm run start:dev
```

The backend will start on `http://localhost:3000`

**Terminal 2 - Frontend:**

```bash
npm start
```

Then choose your platform:

- Press `i` for iOS
- Press `a` for Android
- Press `w` for Web

### Option 2: Production Build

**Backend:**

```bash
cd backend
npm run build
npm run start:prod
```

**Frontend:**

```bash
npm run android
# or
npm run ios
# or
npm run web
```

## 📜 Available Scripts

### Frontend Scripts

```bash
# Start development server
npm run start

# Run on Android emulator
npm run android

# Run on iOS simulator
npm run ios

# Run on web browser
npm run web
```

### Backend Scripts

```bash
# Start in development mode with watch
npm run start:dev

# Start in debug mode
npm run start:debug

# Build for production
npm run build

# Start production build
npm run start:prod

# Run linting
npm run lint

# Format code
npm run format

# Run unit tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:cov

# Run E2E tests
npm run test:e2e
```

## ✨ Features

### User Authentication

- User registration and login
- Secure password hashing with bcrypt
- Token-based authentication
- Persistent authentication state with Zustand

### Movie Management

- Browse available movies
- View movie details and ratings
- Search and filter movies
- Admin dashboard for movie management

### Reviews System

- Write and submit reviews for movies
- Read reviews from other users
- Rate movies
- View review history

### Admin Features

- Content management dashboard
- User management
- Movie catalog management
- Review moderation

### Internationalization

- Multi-language support using i18next
- Language persistence in local storage

### UI/UX

- Cross-platform compatibility (iOS, Android, Web)
- Responsive design with TailwindCSS
- Form validation with Zod and React Hook Form
- Smooth animations with React Native Reanimated

## 📚 API Documentation

The backend API documentation is available via Swagger UI when the server is running:

```
http://localhost:3000/api/docs
```

### Main API Endpoints

**Users:**

- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `GET /users/:id` - Get user details
- `PUT /users/:id` - Update user profile

**Movies:**

- `GET /movies` - Get all movies
- `GET /movies/:id` - Get movie details
- `POST /movies` - Create movie (admin)
- `PUT /movies/:id` - Update movie (admin)
- `DELETE /movies/:id` - Delete movie (admin)

**Reviews:**

- `GET /reviews` - Get all reviews
- `GET /reviews/movie/:movieId` - Get reviews for a movie
- `POST /reviews` - Create review
- `PUT /reviews/:id` - Update review
- `DELETE /reviews/:id` - Delete review

## 🧪 Testing

### Run Backend Tests

```bash
# Unit tests
cd backend
npm run test

# Watch mode
npm run test:watch

# Coverage report
npm run test:cov

# E2E tests
npm run test:e2e
```

## 🔧 Troubleshooting

### Frontend Issues

**Expo CLI not found:**

```bash
npm install -g expo-cli
```

**Port already in use:**

```bash
# Change port in your system or kill the process
# On Windows:
netstat -ano | findstr :8081
taskkill /PID <PID> /F
```

**Dependencies issue:**

```bash
rm -rf node_modules package-lock.json
npm install
```

### Backend Issues

**PostgreSQL connection error:**

- Ensure PostgreSQL is running
- Verify database credentials in `.env`
- Check database exists: `psql -l`

**Port 3000 already in use:**

```bash
# Kill process on port 3000
# On Windows:
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Module not found errors:**

```bash
cd backend
npm install
npm run build
```

## 📝 Code Quality

### Formatting

```bash
cd backend
npm run format
```

### Linting

```bash
cd backend
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the UNLICENSED license.

## 👥 Authors

- Your Name - Initial work

## 📞 Support

For support, email support@litly.com or create an issue in the repository.

## 🗺️ Roadmap

- [ ] Dark mode support
- [ ] Push notifications
- [ ] Social sharing features
- [ ] Advanced search filters
- [ ] User profile customization
- [ ] Movie recommendations engine
- [ ] Offline mode support
- [ ] Performance optimizations
