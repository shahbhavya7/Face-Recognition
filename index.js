const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const ejs = require('ejs');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/attendence_db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Create a schema for attendance
const attendenceSchema = new mongoose.Schema({
    name: String,
    date: String,
    time: String
});

const Attendence = mongoose.model('Attendence', attendenceSchema);

const app = express();
app.use(bodyParser.json());
app.set('view engine', 'ejs'); // Set EJS as the view engine

// Route to render attendance page
app.get('/attendence', async (req, res) => {
    try {
        const data = await Attendence.find();
        res.render('attendence', { data: data });
    } catch (error) {
        console.error('Error fetching attendance data:', error);
        res.status(500).send('Internal server error');
    }
});

const PORT = process.env.PORT || 3030;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});