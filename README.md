# 🚀 Nexus - Full Stack Personalized Content Dashboard

A modern, full-stack content dashboard built with Next.js 15, React 19, TypeScript, and Node.js. Nexus aggregates content from multiple sources including news, movies, and social media into a personalized, interactive dashboard experience.

![Dashboard Preview](https://via.placeholder.com/800x400/4F46E5/ffffff?text=Nexus+Full+Stack+Dashboard)

## 📁 Project Structure

```
Nexus/
├── frontend/                 # Next.js React Frontend
│   ├── src/                 # Frontend source code
│   ├── __tests__/           # Frontend tests
│   ├── cypress/             # E2E tests
│   ├── package.json         # Frontend dependencies
│   └── README.md            # Frontend documentation
├── backend/                 # Node.js Backend API
│   ├── src/                 # Backend source code
│   ├── tests/               # Backend tests
│   ├── package.json         # Backend dependencies
│   └── README.md            # Backend documentation
├── README.md                # This file - Main project documentation
└── docker-compose.yml       # Full stack deployment
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager
- Git

### 1. Clone the repository
```bash
git clone https://github.com/Jatin-Dev-Je/Nexus.git
cd Nexus
```

### 2. Setup Frontend
```bash
cd frontend
npm install
cp .env.example .env.local
# Add your API keys to .env.local
npm run dev
```
Frontend will be available at: http://localhost:3002

### 3. Setup Backend (Coming Soon)
```bash
cd backend
npm install
cp .env.example .env
# Configure your environment variables
npm run dev
```
Backend will be available at: http://localhost:3001

## 🛠️ Tech Stack

### Frontend
- **Framework**: Next.js 15 with App Router
- **UI Library**: React 19
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Redux Toolkit with RTK Query
- **Animations**: Framer Motion
- **Testing**: Jest + React Testing Library + Cypress

### Backend (Planned)
- **Runtime**: Node.js
- **Framework**: Express.js / Fastify
- **Language**: TypeScript
- **Database**: PostgreSQL / MongoDB
- **Authentication**: JWT + OAuth
- **API**: RESTful + GraphQL
- **Testing**: Jest + Supertest

## 🌟 Features

### Current (Frontend)
- ✅ **Personalized Content Feed**: Aggregated content from News API, TMDB, and social media
- ✅ **Interactive Content Cards**: Rich cards with images, descriptions, and action buttons
- ✅ **Real-time Search**: Debounced search across all content types
- ✅ **Infinite Scrolling**: Efficient content loading with pagination
- ✅ **Drag & Drop**: Reorder content cards in your feed
- ✅ **Favorites System**: Save and organize your favorite content
- ✅ **Dark Mode**: Toggle between light and dark themes
- ✅ **Responsive Design**: Optimized for desktop, tablet, and mobile
- ✅ **Smooth Animations**: Framer Motion powered transitions
- ✅ **Toast Notifications**: User feedback for actions
- ✅ **Settings Panel**: Customize preferences and categories

### Planned (Backend)
- 🔄 **User Authentication**: Secure login and registration
- 🔄 **Personal Profiles**: User accounts and preferences
- 🔄 **Content Caching**: Improved performance with Redis
- 🔄 **Real-time Updates**: WebSocket connections
- 🔄 **Content Recommendations**: AI-powered suggestions
- 🔄 **Analytics Dashboard**: Usage statistics and insights
- 🔄 **Admin Panel**: Content moderation and management
- 🔄 **API Rate Limiting**: Secure and scalable API

## 📚 Documentation

- **[Frontend Documentation](./frontend/README.md)** - Complete frontend setup and development guide
- **[Backend Documentation](./backend/README.md)** - Backend API documentation (Coming Soon)
- **[Deployment Guide](./frontend/DEPLOYMENT.md)** - Production deployment instructions
- **[Testing Guide](./frontend/TESTING.md)** - Comprehensive testing documentation

## 🚀 Deployment

### Frontend Only (Current)
Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/git/external?repository-url=https://github.com/Jatin-Dev-Je/Nexus)

### Full Stack (Coming Soon)
- **Frontend**: Vercel / Netlify
- **Backend**: Railway / Heroku / DigitalOcean
- **Database**: Supabase / PlanetScale
- **Docker**: Complete containerized deployment

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test              # Unit tests
npm run test:e2e      # E2E tests
npm run test:all      # All tests
```

### Backend Testing (Coming Soon)
```bash
cd backend
npm test              # Unit tests
npm run test:integration  # Integration tests
npm run test:all      # All tests
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 Development Roadmap

### Phase 1: Frontend Foundation ✅ (Completed)
- ✅ Next.js 15 setup with TypeScript
- ✅ Redux Toolkit state management
- ✅ Responsive UI with Tailwind CSS
- ✅ Content aggregation with mock data
- ✅ Testing infrastructure

### Phase 2: Backend Development 🔄 (In Progress)
- 🔄 Node.js API server setup
- 🔄 Database design and models
- 🔄 Authentication system
- 🔄 RESTful API endpoints
- 🔄 Integration with frontend

### Phase 3: Advanced Features 📋 (Planned)
- 📋 Real-time notifications
- 📋 Content recommendation engine
- 📋 Advanced analytics
- 📋 Mobile app (React Native)
- 📋 Desktop app (Electron)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) for the amazing React framework
- [Tailwind CSS](https://tailwindcss.com/) for utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) for smooth animations
- [Redux Toolkit](https://redux-toolkit.js.org/) for state management
- [NewsAPI](https://newsapi.org/) for news data
- [The Movie Database](https://www.themoviedb.org/) for movie data

## 📞 Support

If you have any questions or run into issues:
- 📧 Email: support@nexus-dashboard.com
- 🐛 [GitHub Issues](https://github.com/Jatin-Dev-Je/Nexus/issues)
- 💬 [Discussions](https://github.com/Jatin-Dev-Je/Nexus/discussions)

---

**Built with ❤️ by the Nexus Team** | **Happy coding!** 🎉
