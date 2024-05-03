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
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" /> {/* Background grid */}
        <XAxis dataKey="date" /> {/* X-axis for dates */}
        <YAxis yAxisId="left" /> {/* Primary Y-axis */}
        <YAxis yAxisId="right" orientation="right" /> {/* Secondary Y-axis */}
        <Tooltip /> {/* Tooltips for interactive data */}
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

        {/* Line for weight (uses secondary Y-axis) */}
        <Line
          yAxisId="right"
          type="monotone"
          dataKey="weight"
          stroke="#FF8042"
          name="Weight"
          dot={{ r: 4 }} // Customize dot size
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default HealthLineChart;
