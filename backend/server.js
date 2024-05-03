

const express = require('express'); // Express.js for the server
const mongoose = require('mongoose'); // Mongoose for MongoDB interaction
const bodyParser = require('body-parser'); // Middleware for parsing request bodies
const cors = require('cors'); // Middleware to allow cross-origin requests
const app = express(); // Create an Express application
const PORT = process.env.PORT || 5000; // Default port for the server

// Middleware configurations
app.use(bodyParser.json()); // Parse JSON request bodies
app.use(cors()); // Enable cross-origin requests from frontend applications

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/Fitnesstracker', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected successfully!');
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });

// Define Mongoose schema and model for health tracking data
const healthDataSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now }, // Date of the record
  steps: { type: Number, required: true }, // Number of steps taken
  caloriesBurned: { type: Number, required: true }, // Calories burned
  distanceCovered: { type: Number, required: true }, // Distance covered in kilometers
  weight: { type: Number, required: true }, // User's weight in kilograms
});

const HealthData = mongoose.model('HealthData', healthDataSchema); // Create Mongoose model

// REST API endpoints for CRUD operations

// Get all health tracker records
app.get('/tracks', async (req, res) => {
  try {
    const allRecords = await HealthData.find(); // Retrieve all records
    res.json(allRecords); // Return all records in response
  } catch (error) {
    console.error('Error fetching health tracker records:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get health tracker records for a specific date
app.get('/tracks/:date', async (req, res) => {
  const requestedDate = new Date(req.params.date); // Get requested date from URL parameter
  try {
    const recordsForDay = await HealthData.find({
      date: {
        $gte: requestedDate,
        $lt: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000), // Full day range
      },
    });
    res.json(recordsForDay); // Return records for the specific date
  } catch (error) {
    console.error('Error fetching health tracker records for the date:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Create a new health tracker record
app.post('/tracks', async (req, res) => {
  try {
    const newRecord = new HealthData(req.body); // Create new record from request body
    await newRecord.save(); // Save the new record to MongoDB
    res.status(201).json(newRecord); // Return the created record with HTTP status 201 (Created)
  } catch (error) {
    console.error('Error creating new health tracker record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Update health tracker records for a specific date
app.put('/tracks/:date', async (req, res) => {
  const requestedDate = new Date(req.params.date); // Get requested date from URL parameter
  try {
    const updatedRecord = await HealthData.findOneAndUpdate(
      {
        date: {
          $gte: requestedDate,
          $lt: new Date(requestedDate.getTime() + 24 * 60 * 60 * 1000), // Full day range
        },
      },
      req.body, // Update with new data from request body
      { new: true } // Return the updated record
    );
    res.json(updatedRecord); // Return the updated record
  } catch (error) {
    console.error('Error updating health tracker record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Delete a health tracker record by ID
app.delete('/tracks/:id', async (req, res) => {
  const { id } = req.params; // Get record ID from URL parameter
  
  try {
    const deletedRecord = await HealthData.findByIdAndDelete(id); // Delete record by ID
    if (deletedRecord) {
      res.status(200).json({ message: 'Record deleted successfully' }); // Record deleted successfully
    } else {
      res.status(404).json({ error: 'Record not found' }); // Record not found
    }
  } catch (error) {
    console.error('Error deleting health tracker record:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the Express server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`); // Log server start
});
