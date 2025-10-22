// server/server.js
import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// --- Mock ATM Data ---
const atmData = [
  { id: 1, name: "SBI ATM", city: "Lucknow", bank: "SBI", latitude: 26.8467, longitude: 80.9462 },
  { id: 2, name: "HDFC ATM", city: "Lucknow", bank: "HDFC", latitude: 26.8500, longitude: 80.9500 },
  { id: 3, name: "ICICI ATM", city: "Delhi", bank: "ICICI", latitude: 28.6139, longitude: 77.2090 },
  { id: 4, name: "PNB ATM", city: "Delhi", bank: "PNB", latitude: 28.6150, longitude: 77.2100 },
  { id: 5, name: "Axis ATM", city: "Mumbai", bank: "Axis", latitude: 19.0760, longitude: 72.8777 },
];

// --- API Endpoint ---
app.get("/api/atms", (req, res) => {
  const { query } = req.query;
  if (!query) return res.json([]);

  const filteredATMs = atmData.filter(
    (atm) =>
      atm.city.toLowerCase().includes(query.toLowerCase()) ||
      atm.bank.toLowerCase().includes(query.toLowerCase())
  );

  res.json(filteredATMs);
});

// --- Server Start ---
const PORT = 5000;
app.listen(PORT, () => console.log(`✅ Backend running on port ${PORT}`));
