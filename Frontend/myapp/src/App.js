// src/App.js

import React from 'react';
import './App.css'; // Import the CSS file
import HealthTracker from './Componenet/HealthTracker ';

const App = () => {
  return (
    <div className="App"> {/* Use the class defined in App.css */}
      <h1>Health & Wellness Tracker</h1> {/* Heading with styles from App.css */}
      <HealthTracker /> {/* Component to display health tracking data */}
    </div>
  );
};

export default App;
