// server/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// --- Mock ATM Data ---
const atmData = [
  { id: 1, name: "SBI ATM", city: "Lucknow", bank: "SBI", latitude: 26.8467, longitude: 80.9462, status: "available", address: "123 Main St" },
  { id: 2, name: "HDFC ATM", city: "Lucknow", bank: "HDFC", latitude: 26.8500, longitude: 80.9500, status: "low", address: "456 Park Ave" },
  { id: 3, name: "ICICI ATM", city: "Delhi", bank: "ICICI", latitude: 28.6139, longitude: 77.2090, status: "available", address: "789 Connaught Place" },
  { id: 4, name: "PNB ATM", city: "Delhi", bank: "PNB", latitude: 28.6150, longitude: 77.2100, status: "out_of_cash", address: "321 Rajpath" },
  { id: 5, name: "Axis ATM", city: "Mumbai", bank: "Axis", latitude: 19.0760, longitude: 72.8777, status: "available", address: "654 Marine Drive" },
  { id: 6, name: "Kotak ATM", city: "Mumbai", bank: "Kotak", latitude: 19.0800, longitude: 72.8800, status: "available", address: "987 Bandra West" },
  { id: 7, name: "BOB ATM", city: "Bangalore", bank: "BOB", latitude: 12.9716, longitude: 77.5946, status: "low", address: "147 MG Road" },
  { id: 8, name: "Canara ATM", city: "Bangalore", bank: "Canara", latitude: 12.9750, longitude: 77.6000, status: "available", address: "258 Brigade Road" },
];

// --- Mock Reviews Data ---
const reviews = [
  { id: 1, atmId: 1, userId: "user1", rating: 5, comment: "Great service!", timestamp: new Date().toISOString() },
  { id: 2, atmId: 1, userId: "user2", rating: 4, comment: "Clean and fast", timestamp: new Date().toISOString() },
];

// --- Mock Users Data ---
const users = [
  { id: "user1", email: "demo@example.com", password: "password", name: "Demo User" },
];

// --- API Endpoints ---

// Get ATMs with enhanced filtering
app.get("/api/atms", (req, res) => {
  const { query, status, bank, maxDistance, userLat, userLng } = req.query;
  let filteredATMs = [...atmData];

  // Text search
  if (query) {
    filteredATMs = filteredATMs.filter(
      (atm) =>
        atm.city.toLowerCase().includes(query.toLowerCase()) ||
        atm.bank.toLowerCase().includes(query.toLowerCase()) ||
        atm.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  // Status filter
  if (status && status !== 'all') {
    filteredATMs = filteredATMs.filter(atm => atm.status === status);
  }

  // Bank filter
  if (bank && bank !== 'all') {
    filteredATMs = filteredATMs.filter(atm => atm.bank.toLowerCase() === bank.toLowerCase());
  }

  // Distance filter
  if (maxDistance && userLat && userLng) {
    const maxDist = parseFloat(maxDistance);
    filteredATMs = filteredATMs.filter(atm => {
      const distance = Math.sqrt(
        Math.pow(atm.latitude - parseFloat(userLat), 2) +
        Math.pow(atm.longitude - parseFloat(userLng), 2)
      ) * 111; // Rough km conversion
      return distance <= maxDist;
    });
  }

  res.json(filteredATMs);
});

// Get reviews for an ATM
app.get("/api/reviews/:atmId", (req, res) => {
  const atmId = parseInt(req.params.atmId);
  const atmReviews = reviews.filter(review => review.atmId === atmId);
  res.json(atmReviews);
});

// Add a review
app.post("/api/reviews", (req, res) => {
  const { atmId, userId, rating, comment } = req.body;
  const newReview = {
    id: reviews.length + 1,
    atmId: parseInt(atmId),
    userId,
    rating: parseInt(rating),
    comment,
    timestamp: new Date().toISOString()
  };
  reviews.push(newReview);
  res.json(newReview);
});

// User authentication
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const user = users.find(u => u.email === email && u.password === password);
  if (user) {
    res.json({ success: true, user: { id: user.id, email: user.email, name: user.name } });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

app.post("/api/auth/signup", (req, res) => {
  const { email, password, name } = req.body;
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    res.status(400).json({ success: false, message: "User already exists" });
  } else {
    const newUser = { id: `user${users.length + 1}`, email, password, name };
    users.push(newUser);
    res.json({ success: true, user: { id: newUser.id, email: newUser.email, name: newUser.name } });
  }
});

// Simulate status updates
setInterval(() => {
  atmData.forEach(atm => {
    const statuses = ['available', 'low', 'out_of_cash'];
    atm.status = statuses[Math.floor(Math.random() * statuses.length)];
  });
}, 30000); // Update every 30 seconds

// --- Server Start ---
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
