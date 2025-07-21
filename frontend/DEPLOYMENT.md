# Deployment Guide

## Prerequisites
- Node.js 18.0 or later
- API keys for NewsAPI and TMDB

## Environment Variables
Set up the following environment variables in your deployment platform:

```
NEXT_PUBLIC_NEWS_API_KEY=your_actual_newsapi_key
NEXT_PUBLIC_TMDB_API_KEY=your_actual_tmdb_key
NEXT_PUBLIC_NEWS_API_URL=https://newsapi.org/v2
NEXT_PUBLIC_TMDB_API_URL=https://api.themoviedb.org/3
NEXT_PUBLIC_SOCIAL_API_URL=https://jsonplaceholder.typicode.com
```

## Vercel Deployment

1. **Connect Repository**
   - Push your code to GitHub
   - Import project in Vercel
   - Connect your GitHub repository

2. **Configure Environment Variables**
   - Go to Settings > Environment Variables
   - Add all the environment variables listed above

3. **Deploy**
   - Click Deploy
   - Vercel will automatically build and deploy your app

## Other Platforms

### Netlify
1. Build Command: `npm run build`
2. Publish Directory: `.next`
3. Add environment variables in Site Settings

### Railway
1. Connect GitHub repository
2. Add environment variables
3. Deploy automatically

### Docker Deployment
```dockerfile
FROM node:18-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci --only=production

COPY . .
RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

## Performance Optimizations

1. **Image Optimization**: Next.js handles this automatically
2. **Code Splitting**: Automatic with Next.js App Router
3. **Caching**: Configure proper cache headers
4. **CDN**: Use Vercel Edge Network or CloudFlare

## Security Checklist

- [ ] API keys are stored as environment variables
- [ ] No sensitive data in client-side code
- [ ] HTTPS enabled in production
- [ ] CORS properly configured
- [ ] Content Security Policy headers set

## Monitoring

1. **Error Tracking**: Consider integrating Sentry
2. **Analytics**: Add Google Analytics or similar
3. **Performance**: Use Vercel Analytics or Web Vitals

## Backup Strategy

1. **Code**: GitHub repository
2. **Environment Variables**: Document securely
3. **User Data**: Stored in localStorage (consider database for production)
