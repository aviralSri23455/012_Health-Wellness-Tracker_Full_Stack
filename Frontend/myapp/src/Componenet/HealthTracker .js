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
