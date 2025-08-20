# Restaurant App

A simple restaurant discovery app built with React frontend and Express backend for learning purposes.

## Project Structure

```
├── backend/          # Express.js server
│   ├── server.js     # Main server file
│   └── package.json  # Backend dependencies
├── frontend/         # React application
│   ├── src/          # Source files
│   ├── index.html    # Main HTML file
│   ├── index.css     # Styles
│   └── package.json  # Frontend dependencies
└── README.md         # This file
```

## Getting Started

### Backend Setup
```bash
cd backend
npm install
npm start
```
Server runs on http://localhost:5000

### Frontend Setup
```bash
cd frontend
npm install
npm start
```
Frontend runs on http://localhost:1234

## Features

- Restaurant listing with search and filter
- Restaurant menu fetching from Swiggy API
- React Router for navigation
- Responsive design
- Loading states with Shimmer UI

## Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Parcel (bundler)

**Backend:**
- Express.js
- Node Fetch
- CORS

## API Endpoints

- `GET /api/menu?restaurantId=<id>` - Fetch restaurant menu from Swiggy API