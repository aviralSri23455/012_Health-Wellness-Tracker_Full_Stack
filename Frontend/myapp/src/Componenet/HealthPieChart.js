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
