# Restaurant App

A simple restaurant discovery and ordering app built with React frontend and Express backend for learning purposes.

# Deploy URL

URL: https://food-delivery-frontend-kappa-bay.vercel.app/

## Project Structure

```
├── backend/              # Express.js server
│   ├── api/              # API route handlers
│   │   ├── menu.js       # Menu fetching handler
│   │   └── restaurants.js # Restaurants list handler
│   ├── server.js         # Main server file
│   ├── package.json      # Backend dependencies
│   └── vercel.json       # Vercel deployment config
├── frontend/             # React application
│   ├── src/
│   │   ├── components/   # React components
│   │   │   ├── About.js
│   │   │   ├── Body.js
│   │   │   ├── Cart.js
│   │   │   ├── Contact.js
│   │   │   ├── Error.js
│   │   │   ├── Header.js
│   │   │   ├── RestaurantCard.js
│   │   │   ├── RestaurantCategory.js
│   │   │   ├── RestaurantMenu.js
│   │   │   └── Shimmer.js
│   │   ├── utils/        # Utility files
│   │   │   ├── appStore.js
│   │   │   ├── cartSlice.js
│   │   │   ├── constants.js
│   │   │   ├── mockData.js
│   │   │   └── useOnlineStatus.js
│   │   ├── app.js        # Main app component
│   │   └── index.css     # Styles
│   ├── index.html        # Main HTML file
│   ├── index.css         # Additional styles
│   ├── package.json      # Frontend dependencies
│   ├── postcss.config.js # PostCSS config
│   ├── tailwind.config.js # Tailwind CSS config
│   └── vercel.json       # Vercel deployment config
└── README.md             # This file
```

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following variables:
   ```
   LAT=22.7576694  # Your latitude
   LNG=75.9062043  # Your longitude
   PORT=5000       # Optional, defaults to 5000
   ```

4. Start the server:
   ```bash
   npm start
   ```
   Server runs on http://localhost:5000

### Frontend Setup
1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```
   Frontend runs on http://localhost:1234

## Features

- Restaurant listing with search and filter functionality
- Restaurant menu fetching from Swiggy API
- Cart functionality with add/remove items
- Redux Toolkit for state management
- React Router for navigation
- Responsive design with Tailwind CSS
- Loading states with Shimmer UI
- Online status detection
- Error handling and boundary components

## Tech Stack

**Frontend:**
- React 19
- React Router DOM
- Redux Toolkit
- Tailwind CSS
- Parcel (bundler)
- PostCSS

**Backend:**
- Express.js
- Node Fetch
- CORS
- dotenv

## API Endpoints

- `GET /api/restaurants` - Fetch list of restaurants from Swiggy API
- `GET /api/menu?restaurantId=<id>` - Fetch restaurant menu from Swiggy API

## Deployment

This project is configured for deployment on Vercel. The `vercel.json` files in both backend and frontend directories contain the deployment configurations.

To deploy:
1. Install Vercel CLI: `npm i -g vercel`
2. Deploy backend: `cd backend && vercel`
3. Deploy frontend: `cd frontend && vercel`

## Contributing

Feel free to fork this repository and submit pull requests for any improvements or bug fixes.
