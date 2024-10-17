// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config(); // Add this line



const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { // Update this line
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log('MongoDB connected');
}).catch((error) => {
    console.error('MongoDB connection error:', error);
});

// Define a schema and model
const dataSchema = new mongoose.Schema({
    name: String,
    email: String,
    message: String,
});

const Data = mongoose.model('Data', dataSchema);

// Define a POST route to store data
app.post('/api/data', async (req, res) => {
    const { name, email, message } = req.body;
    
    const newData = new Data({ name, email, message });
    
    try {
        await newData.save();
        res.status(201).json({ success: true, data: newData });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
