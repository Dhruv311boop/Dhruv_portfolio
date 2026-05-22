# SaaS Platform

A full-stack SaaS web application with authentication, dashboard, and task management.

## Features
- User registration & login (JWT auth)
- Protected dashboard with stats
- Task management (create, complete, delete)
- Subscription tier display
- Responsive dark UI

## Setup

### Backend
```bash
cd server
npm install
# Create .env file:
# PORT=5000
# JWT_SECRET=your_secret_here
# MONGODB_URI=mongodb://localhost:27017/saas (or MongoDB Atlas URI)
npm run dev
```

### Frontend
```bash
cd client
npm install
npm run dev
```

## Deploy
- Backend: Railway, Render, or Heroku (free tiers)
- Frontend: Vercel or Netlify
- Database: MongoDB Atlas (free tier)

## Stack
- Frontend: React, Tailwind CSS, Axios
- Backend: Node.js, Express, JWT, bcrypt
- Database: MongoDB + Mongoose
