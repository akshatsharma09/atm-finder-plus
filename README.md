# 🚀 ATM Finder Plus

<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-blue" alt="React Version">
  <img src="https://img.shields.io/badge/Node.js-18.x-green" alt="Node.js Version">
  <img src="https://img.shields.io/badge/Express-5.1.0-lightgrey" alt="Express Version">
  <img src="https://img.shields.io/badge/License-ISC-yellow" alt="License">
</div>

<p align="center">
  <strong>A modern, full-stack web application for finding and reviewing ATMs across India</strong>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#api-endpoints">API</a> •
  <a href="#contributing">Contributing</a>
</p>

---

## ✨ Features

### 🎯 Core Functionality
- **🔍 Advanced ATM Search & Filtering**: Filter by city, bank, status (available/low/out-of-cash), and proximity
- **🗺️ Interactive Map Integration**: Leaflet-powered map with markers, popups, and zoom controls
- **⭐ User Reviews & Ratings**: Submit and view reviews with timestamps and user info
- **🔐 Secure Authentication**: Login/signup with email/password, demo account available

### 🎨 User Experience
- **⚡ Real-time Updates**: ATM statuses refresh every 30 seconds for live-like experience
- **📱 Fully Responsive**: Seamless experience across desktop, tablet, and mobile devices
- **🌙 Dark/Light Theme Toggle**: Accessibility-focused theme switching
- **📍 Geolocation Support**: Optional location sharing for nearby ATM recommendations

### 🚀 Additional Features
- **💬 Review Management**: Add, view, and manage ATM reviews
- **🏦 Bank Filtering**: Filter by major banks (SBI, HDFC, ICICI, PNB, etc.)
- **📏 Distance Calculation**: Find ATMs within specified distance from your location
- **🗃️ Mock Data**: Pre-loaded sample data across major Indian cities for immediate testing

---

## 📸 Screenshots

<div align="center">
  <table>
    <tr>
      <td align="center">
        <img src="https://via.placeholder.com/400x300?text=Main+Dashboard" width="400" alt="Main Dashboard"/><br/>
        <em>Main Dashboard - ATM List & Filters</em>
      </td>
      <td align="center">
        <img src="https://via.placeholder.com/400x300?text=Interactive+Map" width="400" alt="Interactive Map"/><br/>
        <em>Interactive Map View</em>
      </td>
    </tr>
    <tr>
      <td align="center">
        <img src="https://via.placeholder.com/400x300?text=ATM+Details" width="400" alt="ATM Details"/><br/>
        <em>ATM Details & Reviews</em>
      </td>
      <td align="center">
        <img src="https://via.placeholder.com/400x300?text=Mobile+View" width="400" alt="Mobile View"/><br/>
        <em>Mobile Responsive Design</em>
      </td>
    </tr>
  </table>
</div>

---

## 🛠️ Tech Stack

### Frontend
<div align="center">
  <img src="https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react" alt="React">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router" alt="React Router">
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet" alt="Leaflet">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3" alt="CSS3">
</div>

### Backend
<div align="center">
  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express" alt="Express.js">
  <img src="https://img.shields.io/badge/ES6_Modules-FF6B35?style=for-the-badge" alt="ES6 Modules">
  <img src="https://img.shields.io/badge/CORS-000000?style=for-the-badge" alt="CORS">
</div>

---

## 🚀 Getting Started

### 📋 Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager

### ⚡ Quick Start

1. **Clone & Navigate**
   ```bash
   git clone <repository-url>
   cd atm-finder-plus
   ```

2. **Install Dependencies**
   ```bash
   # Root dependencies (if any)
   npm install

   # Backend setup
   cd server && npm install && cd ..

   # Frontend setup
   cd client && npm install && cd ..
   ```

3. **Launch Application**
   ```bash
   # Start both frontend and backend
   npm run dev
   ```

4. **Access the App**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:5000](http://localhost:5000)

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/atms` | Get ATMs with filtering options |
| `GET` | `/api/reviews/:atmId` | Get reviews for specific ATM |
| `POST` | `/api/reviews` | Submit new review |
| `POST` | `/api/auth/login` | User authentication |
| `POST` | `/api/auth/signup` | User registration |
| `GET` | `/api/welcome` | Welcome message |

> **Note**: All API requests are logged with method and path for monitoring.

---

## 📁 Project Structure

```
atm-finder-plus/
├── 📁 client/                 # React Frontend
│   ├── 📁 public/            # Static assets
│   ├── 📁 src/
│   │   ├── 📁 components/    # Reusable UI components
│   │   ├── 📁 contexts/      # React Context providers
│   │   ├── 📁 utils/         # Utility functions
│   │   └── 📄 App.js         # Main app component
│   └── 📄 package.json
├── 📁 server/                 # Node.js Backend
│   ├── 📄 server.js          # Express server setup
│   ├── 📄 seed.js            # Data seeding script
│   └── 📄 package.json
├── 📄 package.json           # Root configuration
└── 📄 README.md              # Project documentation
```

---

## 🤝 Contributing

We welcome contributions! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/amazing-feature`
3. **Commit** your changes: `git commit -m 'Add amazing feature'`
4. **Push** to the branch: `git push origin feature/amazing-feature`
5. **Open** a Pull Request

### Development Guidelines
- Follow existing code style and conventions
- Write clear, concise commit messages
- Test your changes thoroughly
- Update documentation as needed

---

## 📄 License

This project is licensed under the **ISC License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ for hassle-free ATM finding in India</p>
  <p>
    <a href="#atm-finder-plus">Back to Top</a>
  </p>
</div>
