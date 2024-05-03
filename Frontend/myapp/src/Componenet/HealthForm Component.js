import React, { useState } from 'react';
import axios from 'axios';

const HealthForm = ({ onNewRecord }) => {
  const [steps, setSteps] = useState('');
  const [caloriesBurned, setCaloriesBurned] = useState('');
  const [distanceCovered, setDistanceCovered] = useState('');
  const [weight, setWeight] = useState('');

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

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Steps:</label>
        <input
          type="number"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
      </div>
      <div>
        <label>Calories Burned:</label>
        <input
          type="number"
          value={caloriesBurned}
          onChange={(e) => setCaloriesBurned(e.target.value)}
        />
      </div>
      <div>
        <label>Distance (km):</label>
        <input
          type="number"
          step="0.01"
          value={distanceCovered}
          onChange={(e) => setDistanceCovered(e.target.value)}
        />
      </div>
      <div>
        <label>Weight (kg):</label>
        <input
          type="number"
          step="0.1"
          value={weight}
          onChange={(e) => setWeight(e.target.value)}
        />
      </div>
      <button type="submit">Add Record</button>
    </form>
  );
};

export default HealthForm;
