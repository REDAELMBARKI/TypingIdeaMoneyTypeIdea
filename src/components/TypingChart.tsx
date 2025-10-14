import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

function TypingChart() {
  // Your typing data
  const data = [
    { time: 0, wpm: 0 },
    { time: 10, wpm: 35 },
    { time: 20, wpm: 52 },
    { time: 30, wpm: 68 },
    { time: 40, wpm: 72 },
    // ... more data points
  ];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <XAxis dataKey="time" label={{ value: 'Time (s)' }} />
        <YAxis label={{ value: 'WPM', angle: -90 }} />
        <Tooltip />
        <Line 
          type="monotone" 
          dataKey="wpm" 
          stroke="#8884d8" 
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}


export default TypingChart;