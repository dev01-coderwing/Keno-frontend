import React from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Cell,
} from 'recharts';

const BarChartSection = () => {
  const barData = [
    { name: 'Source', value: 200 },
    { name: 'Source', value: 250 },
    { name: 'Source', value: 320 },
    { name: 'Source', value: 280 },
  ];

  const barColors = ['#00FFAB', '#FFFFFF', '#FF6B6B', '#B388EB'];

  return (
    <div className="h-full w-full max-w-full overflow-x-auto px-2 sm:px-0">
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={barData}>
          <XAxis dataKey="name" tick={{ fill: '#ccc' }} />
          <Tooltip />
          <Bar dataKey="value" radius={[10, 10, 0, 0]}>
            {barData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={barColors[index % barColors.length]} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartSection;
