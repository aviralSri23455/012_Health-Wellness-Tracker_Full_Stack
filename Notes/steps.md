# Health & Wellness Tracker Guide

Welcome to the Health & Wellness Tracker guide! This document provides a comprehensive overview of the system, including its architecture, backend, frontend, API endpoints, and instructions on how to run the application locally.

## Table of Contents
1. [Introduction](#introduction)
2. [Backend Setup](#backend-setup)
   - [Database Connection](#database-connection)
   - [Models and Schema](#models-and-schema)
   - [API Endpoints](#api-endpoints)
3. [Frontend Setup](#frontend-setup)
   - [Components Overview](#components-overview)
   - [Fetching and Displaying Data](#fetching-and-displaying-data)
   - [Adding and Deleting Records](#adding-and-deleting-records)
4. [Running the Application](#running-the-application)
5. [Troubleshooting](#troubleshooting)
6. [Future Enhancements](#future-enhancements)

## Introduction
The Health & Wellness Tracker is an application that allows users to track health-related data such as steps taken, calories burned, distance covered, and weight. It uses a backend based on Express.js and MongoDB, with a frontend built using React.js.

## Backend Setup
### Database Connection
The backend uses MongoDB to store health and wellness data. The connection is established using Mongoose. Here's how to connect to MongoDB:

- **Configuration**: Ensure you have MongoDB installed and running locally, or access to a remote MongoDB instance.
- **Connection Code**:

```javascript
mongoose.connect('mongodb://localhost:27017/Fitnesstracker', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('MongoDB connected successfully!');
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

```

# Models and Schema

- Mongoose defines the schema and model for health tracking data. Below is the schema definition for HealthData:

```mongodb

const healthDataSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  steps: { type: Number, required: true },
  caloriesBurned: { type: Number, required: true },
  distanceCovered: { type: Number, required: true },
  weight: { type: Number, required: true },
});

const HealthData = mongoose.model('HealthData', healthDataSchema);

```


# API Endpoints
- The backend provides RESTful API endpoints for CRUD operations on health tracking data:

- GET /tracks: Retrieves all health tracking records.
- GET /tracks/:date: Retrieves health tracking records for a specific date.
- POST /tracks: Creates a new health tracking record.
- PUT /tracks/:date: Updates health tracking records for a specific date.
- DELETE /tracks/:id: Deletes a health tracking record by its ID.


# Frontend Setup
- The frontend uses React.js and Axios to communicate with the backend API. Here's an overview of the key components:

# Components Overview
- The frontend consists of two main components:

- HealthTracker: Displays existing health records and allows deletion of records.
- HealthForm: A form for adding new health tracking records.
- Fetching and Displaying Data
- he HealthTracker component fetches data from the backend and displays it in a list. It also handles record deletion:


# Fetching and Displaying Data

- The HealthTracker component fetches data from the backend and displays it in a list. It also handles record deletion:

```javascript
const fetchHealthData = async () => {
  try {
    const response = await axios.get('http://localhost:5000/tracks');
    setHealthData(response.data);
  } catch (error) {
    setError('Error fetching health data');
  }
};

useEffect(() => {
  fetchHealthData();
}, []);



```

# Adding and Deleting Records

- The HealthForm component allows users to add new records, while HealthTracker handles record deletion:


```javascript

const handleSubmit = async (event) => {
  event.preventDefault();
  try {
    await axios.post('http://localhost:5000/tracks', {
      steps: parseInt(steps),
      caloriesBurned: parseInt(caloriesBurned),
      distanceCovered: parseFloat(distanceCovered),
      weight: parseFloat(weight),
    });
    onNewRecord(); // Fetch updated records
  } catch (error) {
    console.error('Error adding new health record:', error);
  }
};

const deleteRecord = async (id) => {
  try {
    await axios.delete(`http://localhost:5000/tracks/${id}`);
    fetchHealthData(); // Refresh data
  } catch (error) {
    setError('Error deleting record');
  }
};

```


# Running the Application

- To run the Health & Wellness Tracker, follow these steps:

- Backend: Navigate to the backend directory and run npm install to install dependencies. Start the server with node server.js.

- Frontend: Navigate to the frontend directory and run npm install. Start the React development server with npm start.

- Access: Open your browser and navigate to http://localhost:3000/ to use the application.


# Install Recharts


- npm install recharts


# create line chart 

```javascript
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const HealthLineChart = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={400}> {/* Responsive container for dynamic sizing */}
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" /> {/* Background grid */}
        <XAxis dataKey="date" /> {/* X-axis based on date */}
        <YAxis yAxisId="left" /> {/* Primary Y-axis */}
        <YAxis yAxisId="right" orientation="right" /> {/* Secondary Y-axis */}
        <Tooltip /> {/* Tooltip for interaction */}
        <Legend /> {/* Chart legend */}

        {/* Line for steps */}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="steps"
          stroke="#8884d8"
          name="Steps"
        />

        {/* Line for calories burned */}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="caloriesBurned"
          stroke="#82ca9d"
          name="Calories Burned"
        />

        {/* Line for distance covered */}
        <Line
          yAxisId="left"
          type="monotone"
          dataKey="distanceCovered"
          stroke="#FFBB28"
          name="Distance Covered"
        />

        {/* Line for weight (secondary Y-axis) */}
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="weight"
          stroke="#FF8042"
          name="Weight"
          dot={{ r: 4 }} // Customize dot size for clarity
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HealthLineChart;



```

# create pie chart 

```javascript
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';

// Function to calculate calorie distribution by activity type
const getCaloriesDistribution = (data) => {
  // Group data by activity type and calculate total calories for each type
  const caloriesByActivity = data.reduce((acc, record) => {
    const activity = record.activity || 'Unknown';
    const calories = record.caloriesBurned || 0;
    if (!acc[activity]) {
      acc[activity] = 0;
    }
    acc[activity] += calories; // Sum calories by activity
    return acc;
  }, {});

  // Convert the object into an array suitable for Recharts
  return Object.keys(caloriesByActivity).map((activity) => ({
    name: activity,
    value: caloriesByActivity[activity],
  }));
};

// Colors for pie segments
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#FF6666', '#66FF66'];

const HealthPieChart = ({ data }) => {
  const pieData = getCaloriesDistribution(data); // Get the pie chart data

  return (
    <PieChart width={400} height={400}>
      <Pie
        data={pieData}
        cx={200}
        cy={200}
        innerRadius={70} // For doughnut effect
        outerRadius={100}
        paddingAngle={5}
        dataKey="value"
        nameKey="name"
      >
        {pieData.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
        ))}
      </Pie>
      <Tooltip /> {/* Display tooltips when hovering */}
      <Legend /> {/* Display chart legend */}
    </PieChart>
  );
};

export default HealthPieChart;


```


# connect with HealthTracker

```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import HealthForm from '../Componenet/HealthForm Component';
import HealthLineChart from '../Componenet/LineChart';
import HealthPieChart from '../Componenet/HealthPieChart'; // Import the pie chart component

const HealthTracker = () => {
  const [healthData, setHealthData] = useState([]);
  const [error, setError] = useState(null);

  const fetchHealthData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/tracks');
      setHealthData(response.data);
    } catch (error) {
      setError('Error fetching health data');
    }
  };

  useEffect(() => {
    fetchHealthData();
  }, []);

  const deleteRecord = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tracks/${id}`);
      fetchHealthData(); // Refresh data after deletion
    } catch (error) {
      setError('Error deleting record');
    }
  };

  return (
    <div>
      {error && <p>{error}</p>}
      <HealthForm onNewRecord={fetchHealthData} />

      <h2>Health Data Over Time</h2>
      <HealthLineChart data={healthData} /> {/* Line chart for data over time */}

      <h2>Calories by Activity Type</h2>
      <HealthPieChart data={healthData} /> {/* Pie chart for calories distribution */}

      <h2>Existing Records:</h2>
      <ul>
        {healthData.map((record) => (
          <li key={record._id}>
            {`Date: ${record.date}, Steps: ${record.steps}, Calories Burned: ${record.caloriesBurned}, Distance: ${record.distanceCovered}, Weight: ${record.weight}`}
            <button onClick={() => deleteRecord(record._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HealthTracker;


```




