// index.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');




const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());



const mongoURI = "mongodb+srv://pratapruhela1922:qwerty1922roundsround@mydatabase.o2zoz.mongodb.net/mydatabase?retryWrites=true&w=majority";

mongoose.connect(mongoURI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("Failed to connect to MongoDB:", error);
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
