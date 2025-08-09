// Load environment variables from a .env file into process.env
require("dotenv").config();

// Import necessary modules
const express = require("express");                 // Express framework to create REST API
const mongoose = require("mongoose");               // Mongoose for MongoDB object modeling

const bodyParser = require("body-parser");          // Middleware to parse JSON request bodies
const cors = require("cors");                       // Middleware to allow cross-origin requests

// Importing the data models (Schemas) for Holdings and Positions
const { HoldingsModel } = require("./model/HoldingsModel");
const { PositionsModel } = require("./model/PositionsModel");

const authRoute = require("./Routes/authRoute");

// Setting up server configuration
const PORT = process.env.PORT || 3002;              // Use PORT from .env or fallback to 3002
const DB_URL = process.env.MONGO_URL;               // MongoDB URL from environment variables

const app = express();                              // Initialize the Express app

// Middleware
app.use(cors({
    origin: "http://localhost:3000",  // wherever your React app runs
    credentials: true                 // Allow cookies
  }));                                // Enables Cross-Origin Resource Sharing
app.use(bodyParser.json());                         // Parses incoming JSON requests into req.body

// =======================
//      API ROUTES
// =======================

// [GET] Fetch all holdings from the database
app.get("/allHoldings", async (req, res) => {
    try {
        let allHoldings = await HoldingsModel.find({}); // Retrieve all documents from the Holdings collection
        res.json(allHoldings);                          // Send them as a JSON response
    } catch (err) {
        res.status(500).send("Error fetching holdings");
    }
});

// [GET] Fetch all positions from the database
app.get("/allPositions", async (req, res) => {
    try {
        let allPositions = await PositionsModel.find({}); // Retrieve all documents from the Positions collection
        res.json(allPositions);                           // Send them as a JSON response
    } catch (err) {
        res.status(500).send("Error fetching positions");
    }
});


app.use("/", authRoute); // Use the authRoute for authentication-related endpoints

// =======================
//      START SERVER
// =======================

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    
    // Connect to MongoDB when server starts
    mongoose.connect(DB_URL)
        .then(() => console.log("Connected to MongoDB"))
        .catch((err) => console.error("MongoDB connection error:", err));
});
