# ChatFlow — Real-Time Chat App

A real-time chat application with rooms, user presence, message history, and typing indicators.

## Features
- Join any named room instantly
- Real-time messaging via WebSockets (Socket.io)
- Typing indicators ("Dhruv is typing...")
- Online user list with live presence
- Message history (last 50 messages on join)
- System messages (join/leave notifications)
- Responsive dark UI — mobile + desktop

## Setup & Run

```bash
npm install
npm run dev        # starts server on port 3001
```

Then open `client/index.html` in your browser.

For production, serve the client folder statically from the same Express server (already configured).

## Deploy
- Push to GitHub
- Deploy server to **Railway** or **Render** (free tier)
- The client is served automatically by the Express server

## Stack
- Backend: Node.js, Express, Socket.io
- Frontend: HTML, Tailwind CSS (CDN), Socket.io client
