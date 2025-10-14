import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import confetti from 'canvas-confetti';
import { Zap, Target, Clock, TrendingUp, Award } from 'lucide-react';

interface SessionStats {
  wpm: number;
  rawWpm: number;
  accuracy: number;
  totalTime: number;
  correctChars: number;
  wrongChars: number;
  missedChars: number;
  totalChars: number;
  peakWpm: number;
  consistency: number;
}

interface ChartDataPoint {
  time: number;
  wpm: number;
}

interface TypingResultsProps {
  sessionStats: SessionStats;
  chartData: ChartDataPoint[];
}

const TypingResults = ({ sessionStats, chartData }: TypingResultsProps) => {
  const [animatedChartData, setAnimatedChartData] = useState<ChartDataPoint[]>([]);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    const duration = 3000;
    const animationEnd = Date.now() + duration;

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        clearInterval(interval);
        return;
      }

      const particleCount = 3;

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.1, 0.3),
          y: Math.random() - 0.2
        },
        colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#7B68EE'],
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2
      });

      confetti({
        particleCount,
        startVelocity: 30,
        spread: 360,
        origin: {
          x: randomInRange(0.7, 0.9),
          y: Math.random() - 0.2
        },
        colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#7B68EE'],
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2
      });
    }, 150);

    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#FFD700', '#FF69B4', '#00CED1', '#FF6347', '#7B68EE']
    });

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const animationDuration = 2000;
    const startTime = Date.now();

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / animationDuration, 1);

      setAnimationProgress(progress);

      const pointsToShow = Math.ceil(chartData.length * progress);
      setAnimatedChartData(chartData.slice(0, pointsToShow));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [chartData]);

  const pieData = [
    { name: 'Correct', value: sessionStats.correctChars, color: '#10b981' },
    { name: 'Wrong', value: sessionStats.wrongChars, color: '#ef4444' },
    { name: 'Missed', value: sessionStats.missedChars, color: '#f59e0b' }
  ];

  return (
    <div className="w-screen h-screen max-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-3 flex items-center justify-center">
      <div className="max-w-7xl w-full h-full max-h-full flex flex-col gap-3">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-slide-up">
          <StatCard
            icon={<Zap className="w-6 h-6" />}
            label="WPM"
            value={sessionStats.wpm}
            color="from-blue-500 to-cyan-500"
            delay="100ms"
          />
          <StatCard
            icon={<TrendingUp className="w-6 h-6" />}
            label="Raw WPM"
            value={sessionStats.rawWpm}
            color="from-purple-500 to-pink-500"
            delay="200ms"
          />
          <StatCard
            icon={<Target className="w-6 h-6" />}
            label="Accuracy"
            value={`${sessionStats.accuracy}%`}
            color="from-green-500 to-emerald-500"
            delay="300ms"
          />
          <StatCard
            icon={<Clock className="w-6 h-6" />}
            label="Time"
            value={`${sessionStats.totalTime}s`}
            color="from-orange-500 to-red-500"
            delay="400ms"
          />
        </div>

        <div className="glass-card p-4 animate-slide-up flex-1 min-h-0" style={{ animationDelay: '500ms' }}>
          <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
            <Award className="w-5 h-5 text-purple-400" />
            WPM Over Time
          </h2>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={animatedChartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff20" />
              <XAxis
                dataKey="time"
                stroke="#a78bfa"
                tick={{ fontSize: 12 }}
              />
              <YAxis
                stroke="#a78bfa"
                tick={{ fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#1e1b4b',
                  border: '1px solid #8b5cf6',
                  borderRadius: '8px',
                  color: '#fff',
                  fontSize: '12px'
                }}
              />
              <Line
                type="monotone"
                dataKey="wpm"
                stroke="#8b5cf6"
                strokeWidth={2}
                dot={{ fill: '#8b5cf6', r: 3 }}
                activeDot={{ r: 5 }}
                isAnimationActive={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3" style={{ height: '240px' }}>
          <div className="glass-card p-4 animate-slide-up flex flex-col" style={{ animationDelay: '600ms' }}>
            <h2 className="text-lg font-bold text-white mb-2">Character Breakdown</h2>
            <div className="flex-1 min-h-0">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="40%"
                    labelLine={false}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    outerRadius={55}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={600}
                    animationDuration={1500}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#1e1b4b',
                      border: '1px solid #8b5cf6',
                      borderRadius: '8px',
                      color: '#fff',
                      fontSize: '12px'
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-white/20">
              <div className="text-center">
                <div className="text-green-400 font-bold text-lg">{sessionStats.correctChars}</div>
                <div className="text-green-300 text-xs">Correct</div>
              </div>
              <div className="text-center">
                <div className="text-red-400 font-bold text-lg">{sessionStats.wrongChars}</div>
                <div className="text-red-300 text-xs">Wrong</div>
              </div>
              <div className="text-center">
                <div className="text-orange-400 font-bold text-lg">{sessionStats.missedChars}</div>
                <div className="text-orange-300 text-xs">Missed</div>
              </div>
            </div>
          </div>

          <div className="grid grid-rows-3 gap-2 animate-slide-up" style={{ animationDelay: '700ms' }}>
            <DetailCard label="Peak WPM" value={sessionStats.peakWpm} icon="🚀" />
            <DetailCard label="Consistency" value={`${sessionStats.consistency}%`} icon="📊" />
            <DetailCard label="Total Characters" value={sessionStats.totalChars} icon="📝" />
          </div>
        </div>
      </div>
    </div>
  );
};

interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  color: string;
  delay: string;
}

const StatCard = ({ icon, label, value, color, delay }: StatCardProps) => (
  <div
    className="glass-card p-3 animate-slide-up"
    style={{ animationDelay: delay }}
  >
    <div className={`bg-gradient-to-r ${color} w-10 h-10 rounded-lg flex items-center justify-center mb-2 text-white`}>
      {icon}
    </div>
    <div className="text-purple-300 text-xs mb-1">{label}</div>
    <div className="text-3xl font-bold text-white">{value}</div>
  </div>
);

interface DetailCardProps {
  label: string;
  value: string | number;
  icon: string;
}

const DetailCard = ({ label, value, icon }: DetailCardProps) => (
  <div className="glass-card p-3">
    <div className="flex items-center justify-between">
      <div>
        <div className="text-purple-300 text-xs mb-1">{label}</div>
        <div className="text-xl font-bold text-white">{value}</div>
      </div>
      <div className="text-2xl">{icon}</div>
    </div>
  </div>
);

export default TypingResults;
