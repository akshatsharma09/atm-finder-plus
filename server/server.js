const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 5000;

// Enable CORS so React can access the API
app.use(cors());

// Sample ATM data
const atms = [
  {
    id: 1,
    name: "ATM 1",
    bank: "Bank A",
    city: "Delhi",
    address: "Connaught Place",
    latitude: 28.6300,
    longitude: 77.2167
  },
  {
    id: 2,
    name: "ATM 2",
    bank: "Bank B",
    city: "Delhi",
    address: "Karol Bagh",
    latitude: 28.6360,
    longitude: 77.2000
  }
];

// GET /atms endpoint
app.get('/atms', (req, res) => {
  res.json(atms);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
