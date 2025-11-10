# ATM Finder Plus

A full-stack web application for finding and reviewing ATMs across India. Built with React (frontend) and Node.js/Express (backend).

## Features

### Core Functionality
- **ATM Search & Filtering**: Advanced search with filters for city, bank, status (available, low cash, out of cash), and proximity-based search using user location.
- **Interactive Map**: Integrated Leaflet map to visualize ATM locations with markers, popups showing details, and zoom controls.
- **User Reviews**: View and submit ratings and comments for individual ATMs. Reviews include timestamps and user information.
- **Authentication**: Secure user login and signup with email/password. Supports demo account for testing.

### User Experience
- **Real-time Status Updates**: ATM statuses update automatically every 30 seconds to simulate live data.
- **Responsive Design**: Fully responsive layout that adapts to desktop, tablet, and mobile devices.
- **Dark/Light Theme Toggle**: Easy theme switching for better accessibility and user preference.
- **Geolocation Support**: Optional location sharing for proximity-based ATM recommendations.

### Additional Features
- **Review Management**: Users can add, view, and manage reviews for ATMs.
- **Bank Filtering**: Filter ATMs by specific banks (SBI, HDFC, ICICI, etc.).
- **Distance Calculation**: Calculate and filter ATMs within a specified distance from user location.
- **Mock Data**: Pre-loaded with sample ATMs across major Indian cities for immediate testing.

### Screenshots

#### Main Dashboard
![Main Dashboard](https://via.placeholder.com/800x400?text=ATM+Finder+Plus+Dashboard)
*Overview of the main interface showing ATM list, map, and filters.*

#### ATM Details and Reviews
![ATM Details](https://via.placeholder.com/800x400?text=ATM+Details+and+Reviews)
*Detailed view of an ATM with location, status, and user reviews.*

#### Map View
![Map View](https://via.placeholder.com/800x400?text=Interactive+Map+View)
*Interactive map showing ATM locations with markers and popups.*

#### Mobile Responsive Design
![Mobile View](https://via.placeholder.com/400x600?text=Mobile+Responsive+Design)
*Mobile-optimized interface for on-the-go ATM finding.*

## Tech Stack

### Frontend
- React 18
- React Router for navigation
- Leaflet for map integration
- Context API for state management
- CSS for styling

### Backend
- Node.js with Express.js
- ES6 modules
- CORS enabled
- Mock data for ATMs, reviews, and users

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory.

2. **Install root dependencies** (if any):
   ```bash
   npm install
   ```

3. **Set up the backend**:
   ```bash
   cd server
   npm install
   ```

4. **Set up the frontend**:
   ```bash
   cd ../client
   npm install
   ```

### Running the Application

1. **Start the backend server**:
   ```bash
   cd server
   npm run dev  # or npm start
   ```
   The server will run on http://localhost:5000.

2. **Start the frontend**:
   ```bash
   cd client
   npm start
   ```
   The React app will run on http://localhost:3000.

3. **Open your browser** and navigate to http://localhost:3000 to use the application.

### API Endpoints

The backend provides the following API endpoints:

- `GET /api/atms` - Get all ATMs with optional filtering (query, status, bank, maxDistance, userLat, userLng)
- `GET /api/reviews/:atmId` - Get reviews for a specific ATM
- `POST /api/reviews` - Add a new review (requires atmId, userId, rating, comment)
- `POST /api/auth/login` - User login (requires email, password)
- `POST /api/auth/signup` - User signup (requires email, password, name)
- `GET /api/welcome` - Welcome message endpoint (returns {"message": "Welcome to the ATM Finder Plus API!"})

All requests are logged with method and path information.

## Project Structure

```
atm-finder-plus/
├── client/                 # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── contexts/       # React contexts
│   │   ├── utils/          # Utility functions
│   │   └── ...
│   └── package.json
├── server/                 # Node.js backend
│   ├── server.js           # Main server file
│   ├── seed.js             # Data seeding script
│   └── package.json
├── package.json            # Root package.json (if needed)
└── README.md               # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the ISC License.
