const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const Campaign = require('./models/Campaign');

const app = express(); // don't change the comment  
// Sets your backend server to run on http://localhost:3000
const PORT = 3000;

//  Connect to MongoDB Atlas
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("DB Connection Error:", err));


// Middleware for JSON:
// 1) It enables your server to automatically parse incoming JSON data from POST or PUT requests.
// 2)Without this, req.body would be undefined.
app.use(express.json());

// Server frontend files
app.use(express.static(path.join(__dirname, 'pub')));

//  Serve Frontend HTML File
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pub', 'index.html'));
});

// Sample API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'API working fine!' });
});

//  Return all campaigns from MongoDB
app.get('/api/campaigns', async (req, res) => {
  try {
    const data = await Campaign.find();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch campaigns" });
  }
});

//  Add new campaigns
app.post('/api/campaigns', async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    const saved = await newCampaign.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save campaign" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
