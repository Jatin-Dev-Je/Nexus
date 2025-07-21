import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { NewsArticle, Movie, SocialPost } from '@/types';

// Simple mock data for testing
const mockNewsData = {
  articles: [
    {
      title: "Sample News Article 1",
      description: "This is a sample news article for testing the frontend.",
      content: "Sample content...",
      url: "https://example.com/news/1",
      urlToImage: "/placeholder-news.svg",
      publishedAt: new Date().toISOString(),
      source: { id: "demo", name: "Demo News" },
      author: "Demo Author",
      category: "technology"
    },
    {
      title: "Sample News Article 2", 
      description: "Another sample news article for testing.",
      content: "More sample content...",
      url: "https://example.com/news/2",
      urlToImage: "/placeholder-news.svg",
      publishedAt: new Date(Date.now() - 3600000).toISOString(),
      source: { id: "demo", name: "Demo News" },
      author: "Demo Author",
      category: "general"
    }
  ]
};

const mockMoviesData = {
  results: [
    {
      id: 1,
      title: "Sample Movie 1",
      overview: "This is a sample movie for testing the frontend.",
      poster_path: null,
      release_date: "2024-01-01",
      vote_average: 8.5,
      vote_count: 1000,
      genre_ids: [28, 12],
      adult: false,
      backdrop_path: null,
      original_language: "en",
      original_title: "Sample Movie 1",
      popularity: 100,
      video: false
    },
    {
      id: 2,
      title: "Sample Movie 2",
      overview: "Another sample movie for testing.",
      poster_path: null,
      release_date: "2024-02-01",
      vote_average: 7.8,
      vote_count: 800,
      genre_ids: [18, 10749],
      adult: false,
      backdrop_path: null,
      original_language: "en",
      original_title: "Sample Movie 2",
      popularity: 80,
      video: false
    }
  ]
};

const mockSocialData = [
  {
    id: 1,
    title: "Sample Social Post 1",
    body: "This is a sample social media post for testing the frontend.",
    userId: 1,
    imageUrl: "/placeholder-social.svg",
    timestamp: new Date().toISOString()
  },
  {
    id: 2,
    title: "Sample Social Post 2", 
    body: "Another sample social media post for testing.",
    userId: 2,
    imageUrl: "/placeholder-social.svg",
    timestamp: new Date(Date.now() - 1800000).toISOString()
  }
];

// Create the content API with mock data
export const contentApi = createApi({
  reducerPath: 'contentApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/',
  }),
  tagTypes: ['News', 'Movies', 'Social'],
  endpoints: (builder) => ({
    getNews: builder.query<{ articles: NewsArticle[] }, { category?: string; page?: number; q?: string }>({
      queryFn: async () => {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockNewsData };
      },
      providesTags: ['News'],
    }),

    searchNews: builder.query<{ articles: NewsArticle[] }, { q: string; page?: number }>({
      queryFn: async ({ q }) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const filteredArticles = mockNewsData.articles.filter(article => 
          article.title.toLowerCase().includes(q.toLowerCase()) ||
          article.description.toLowerCase().includes(q.toLowerCase())
        );
        return { data: { articles: filteredArticles } };
      },
      providesTags: ['News'],
    }),

    getMovies: builder.query<{ results: Movie[] }, { category?: string; page?: number }>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 500));
        return { data: mockMoviesData };
      },
      providesTags: ['Movies'],
    }),

    searchMovies: builder.query<{ results: Movie[] }, { q: string; page?: number }>({
      queryFn: async ({ q }) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const filteredMovies = mockMoviesData.results.filter(movie =>
          movie.title.toLowerCase().includes(q.toLowerCase()) ||
          movie.overview.toLowerCase().includes(q.toLowerCase())
        );
        return { data: { results: filteredMovies } };
      },
      providesTags: ['Movies'],
    }),

    getSocialPosts: builder.query<SocialPost[], { page?: number }>({
      queryFn: async () => {
        await new Promise(resolve => setTimeout(resolve, 400));
        return { data: mockSocialData };
      },
      providesTags: ['Social'],
    }),

    searchSocialPosts: builder.query<SocialPost[], { q: string }>({
      queryFn: async ({ q }) => {
        await new Promise(resolve => setTimeout(resolve, 300));
        const filteredPosts = mockSocialData.filter(post =>
          post.title.toLowerCase().includes(q.toLowerCase()) ||
          post.body.toLowerCase().includes(q.toLowerCase())
        );
        return { data: filteredPosts };
      },
      providesTags: ['Social'],
    }),
  }),
});

// Export hooks for usage in functional components
export const {
  useGetNewsQuery,
  useSearchNewsQuery,
  useGetMoviesQuery,
  useSearchMoviesQuery,
  useGetSocialPostsQuery,
  useSearchSocialPostsQuery,
} = contentApi;
