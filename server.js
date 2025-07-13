// Import Express library
const express = require('express');
const path=require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const Campaign = require('./models/Campaign');
const app = express();
// Sets your backend server to run on http://localhost:3000
const PORT = 3000;
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch(err => console.error("DB Connection Error:", err));

// Middleware for JSON:
// 1) It enables your server to automatically parse incoming JSON data from POST or PUT requests.
// 2)Without this, req.body would be undefined.
app.use(express.json());
//Server frontend files
app.use(express.static(path.join(__dirname,'pub')))
// Sample API route
app.get('/api/test',(req,res)=>{
    res.json({message:'API working fine!'});
});
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(()=>console.log("Connected to MongoDB"))
    .catch(err=>console.error("DB connection error:",err))
const campaigns = [
  {
    name: "Summer Sale Boost",
    platform: "Google Ads",
    status: "Active",
    impressions: 12000,
    clicks: 600,
    spend: 4500
  },
  {
    name: "Winter Deals",
    platform: "Facebook Ads",
    status: "Paused",
    impressions: 8000,
    clicks: 400,
    spend: 3000
  },
  {
    name: "Monsoon Promo",
    platform: "Google Ads",
    status: "Active",
    impressions: 10000,
    clicks: 250,
    spend: 2000
  },
  {
    name: "Festive Flash Sale",
    platform: "Facebook Ads",
    status: "Active",
    impressions: 15000,
    clicks: 900,
    spend: 6000
  }
];
const Campaign = require('./models/Campaign');
const { default: mongoose } = require('mongoose');

// Route to return all campaigns
app.get('/api/campaigns', (req, res) => {
  res.json(campaigns);
});
// middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'pub')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'pub', 'index.html'));
});
app.get('/api/campaigns', async (req, res) => {
  const data = await Campaign.find();
  res.json(data);
});

//  Add new campaigns (your question)
app.post('/api/campaigns', async (req, res) => {
  try {
    const newCampaign = new Campaign(req.body);
    const saved = await newCampaign.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: "Failed to save campaign" });
  }
});

 // return JSON response
// { "message": "API working fine!" }
// Start the server
app.listen(PORT,()=>{
    console.log(`Server running at http://localhost:${PORT}`)
});

