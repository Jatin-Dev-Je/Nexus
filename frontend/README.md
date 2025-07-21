# 🚀 Nexus - Personalized Content Dashboard

A modern, responsive content dashboard built with Next.js 15, React 19, and TypeScript. Nexus aggregates content from multiple sources including news, movies, and social media into a personalized, interactive dashboard experience.

![Dashboard Preview](https://via.placeholder.com/800x400/4F46E5/ffffff?text=Content+Dashboard)

## 🚀 Features

### Core Features
- **Personalized Content Feed**: Aggregated content from News API, TMDB, and social media
- **Interactive Content Cards**: Rich cards with images, descriptions, and action buttons
- **Real-time Search**: Debounced search across all content types
- **Infinite Scrolling**: Efficient content loading with pagination
- **Drag & Drop**: Reorder content cards in your feed
- **Favorites System**: Save and organize your favorite content

### User Experience
- **Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Framer Motion powered transitions
- **Toast Notifications**: User feedback for actions
- **Settings Panel**: Customize preferences and categories

### Technical Features
- **TypeScript**: Full type safety throughout the application
- **Redux Toolkit**: State management with RTK Query for API calls
- **Testing**: Unit and integration tests with Jest and React Testing Library
- **Performance**: Optimized with Next.js App Router and Turbopack

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, CSS Custom Properties
- **State Management**: Redux Toolkit, Redux Persist
- **API**: RTK Query, Axios
- **Animations**: Framer Motion
- **Drag & Drop**: @hello-pangea/dnd
- **Testing**: Jest, React Testing Library
- **Build Tool**: Turbopack
- **Deployment**: Vercel-ready

## 📋 Prerequisites

- Node.js 18.0 or later
- npm or yarn package manager
- API keys (see Setup section)

## 🚀 Quick Start

### 1. Clone the repository
```bash
git clone <repository-url>
cd frontend
```

### 2. Install dependencies
```bash
npm install
# or
yarn install
```

### 3. Set up environment variables
Copy the example environment file and add your API keys:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API keys:
```env
NEXT_PUBLIC_NEWS_API_KEY=your_newsapi_key_here
NEXT_PUBLIC_TMDB_API_KEY=your_tmdb_api_key_here
```

### 4. Run the development server
```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3002](http://localhost:3002) in your browser.

> **Note**: The development server may use port 3002 if port 3000 is already in use.

## 🔑 API Setup

### News API
1. Visit [NewsAPI.org](https://newsapi.org/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add it to your `.env.local` file

### TMDB API
1. Visit [The Movie Database](https://www.themoviedb.org/settings/api)
2. Create an account and request an API key
3. Add it to your `.env.local` file

### Social Media API
The app uses JSONPlaceholder as a mock social media API (no setup required).

## 📱 Usage Guide

### Navigation
- **Feed**: Your personalized content stream
- **Trending**: Popular content across all categories
- **Favorites**: Content you've marked as favorite
- **Settings**: Customize your preferences

### Content Interaction
- **❤️ Favorite**: Click the heart icon to save content
- **🔗 Share**: Share content via native sharing or clipboard
- **🎬 Actions**: "Read More", "Watch Now", or "View Post" buttons
- **🔍 Search**: Use the search bar for real-time content filtering

### Customization
- **Categories**: Add/remove content categories in Settings
- **Dark Mode**: Toggle in sidebar or Settings
- **Drag & Drop**: Reorder content in your feed
- **Notifications**: Enable/disable in Settings

## 🧪 Testing

### Run tests
```bash
# Run unit/integration tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run E2E tests (headless)
npm run test:e2e

# Open Cypress test runner
npm run test:e2e:open

# Run all tests (unit + E2E)
npm run test:all
```

### Test Structure
- **Unit Tests**: Component logic and utility functions
- **Integration Tests**: Component interactions and data flow
- **E2E Tests**: Full user workflows with Cypress
- **Mocked APIs**: Isolated testing without external dependencies

## 🏗️ Project Structure

```
frontend/
├── src/
│   ├── app/                  # Next.js App Router
│   ├── components/           # React components
│   │   ├── Content/         # Content-related components
│   │   ├── Layout/          # Layout components
│   │   ├── Sections/        # Page sections
│   │   └── UI/              # Reusable UI components
│   ├── hooks/               # Custom React hooks
│   ├── store/               # Redux store and slices
│   │   ├── api/            # RTK Query API slices
│   │   └── slices/         # Redux slices
│   ├── types/               # TypeScript type definitions
│   └── utils/               # Utility functions
├── __tests__/               # Test files
├── public/                  # Static assets
└── ...config files
```

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS with custom configurations for:
- Dark mode support
- Custom color variables
- Responsive breakpoints
- Animation utilities

### Redux Store
- **User Slice**: Preferences and authentication
- **Content Slice**: Feed, favorites, and search
- **UI Slice**: Interface state and notifications
- **API Slice**: RTK Query endpoints

### TypeScript
Strict TypeScript configuration with:
- Path aliases (@/* for src/*)
- Strict type checking
- Interface definitions for all data models

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically

### Other Platforms
```bash
# Build for production
npm run build

# Start production server
npm start
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [NewsAPI](https://newsapi.org/) for news data
- [The Movie Database](https://www.themoviedb.org/) for movie data

## 📞 Support

If you have any questions or run into issues, please open an issue on GitHub or contact the development team.

---

**Happy coding!** 🎉
