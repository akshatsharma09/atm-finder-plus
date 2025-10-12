// server/seed.js
require('dotenv').config();
const mongoose = require('mongoose');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/atmfinder';
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const atmSchema = new mongoose.Schema({
  name: String, bank: String,
  location: { type: { type: String, default: 'Point' }, coordinates: [Number] },
  status: String
});
atmSchema.index({ location: '2dsphere' });
const ATM = mongoose.model('ATM', atmSchema);

const data = [
  { name: 'ATM A', bank: 'Bank X', location: { coordinates: [77.2090, 28.6139] }, status: 'available' }, // Delhi
  { name: 'ATM B', bank: 'Bank Y', location: { coordinates: [77.2167, 28.6448] }, status: 'low' },
  { name: 'ATM C', bank: 'Bank X', location: { coordinates: [77.1025, 28.7041] }, status: 'out_of_cash' }
];

async function seed() {
  await ATM.deleteMany({});
  await ATM.insertMany(data);
  console.log('Seeded DB');
  mongoose.disconnect();
}
seed();
