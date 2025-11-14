import { useRef, useEffect } from "react";
import {
  RotateCcw,
  ArrowRight,
  RefreshCw,
  Camera,
  Star,
  Download,
} from "lucide-react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
  type ChartOptions,
} from "chart.js";
import { motion } from "framer-motion";
import { Line } from "react-chartjs-2";
import confetti from "canvas-confetti";
import useThemeHook from "../customHooks/useThemeHook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  ChartTooltip,
  Legend,
  Filler
);

const generateDummyData = () => {
  const points = 12;
  return Array.from({ length: points }, (_, i) => ({
    time: i * 5,
    wpm: Math.floor(Math.random() * 30) + 60,
    errors: Math.floor(Math.random() * 8) + 1,
  }));
};

const dummyData = generateDummyData();
const accuracy = (Math.random() * 5 + 95).toFixed(1);
const totalErrors = Math.floor(Math.random() * 10) + 2;
const totalTime = 60;
const bestWpm = Math.max(...dummyData.map((d) => d.wpm));

function TypingChartResult() {
  const chartRef = useRef(null);
  const { currentTheme } = useThemeHook();
  const confettiColors = [
    currentTheme.red,
    currentTheme.accent,
    currentTheme.success,
    currentTheme.warning,
    currentTheme.info,
    currentTheme.white,
  ];

  useEffect(() => {
    const duration = 4000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 80, zIndex: 0 };

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min;
    };

    const interval: NodeJs.Timeout = setInterval(() => {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 80 * (timeLeft / duration);

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
        colors: confettiColors,
        gravity: 1.2,
        scalar: 1.4,
        drift: randomInRange(-0.5, 0.5),
      });
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
        colors: confettiColors,
        gravity: 1.2,
        scalar: 1.4,
        drift: randomInRange(-0.5, 0.5),
      });
    }, 250);

    setTimeout(() => {
      const count = 150;
      const defaultsExplosion = {
        origin: { y: 0.5 },
        spread: 180,
        startVelocity: 50,
        decay: 0.9,
        scalar: 1.5,
        ticks: 100,
      };

      confetti({
        ...defaultsExplosion,
        particleCount: count,
        colors: confettiColors,
      });
    }, 500);

    return () => clearInterval(interval);
  }, [confettiColors]);

  const chartData = {
    labels: dummyData.map((d) => `${d.time}s`),
    datasets: [
      {
        label: "WPM",
        data: dummyData.map((d) => d.wpm),
        borderColor: currentTheme.gray,
        backgroundColor: `${currentTheme.gray}14`,
        fill: true,
        tension: 0.45,
        borderWidth: 3,
        pointRadius: 6,
        pointBackgroundColor: currentTheme.gray,
        pointBorderColor: currentTheme.white,
        pointBorderWidth: 2,
        pointHoverRadius: 9,
        pointHoverBackgroundColor: currentTheme.accent,
      },
      {
        label: "Errors",
        data: dummyData.map((d) => d.errors),
        borderColor: currentTheme.darkRed,
        backgroundColor: `${currentTheme.darkRed}14`,
        fill: true,
        tension: 0.45,
        borderWidth: 2,
        pointRadius: 5,
        pointBackgroundColor: currentTheme.darkRed,
        pointBorderColor: currentTheme.white,
        pointBorderWidth: 2,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: currentTheme.red,
        yAxisID: "y1",
      },
    ],
  };

  const chartOptions : ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: true,
        backgroundColor: currentTheme.buttonPrimary,
        borderColor: currentTheme.accent,
        borderWidth: 2,
        titleColor: currentTheme.accent,
        bodyColor: currentTheme.white,
        padding: 14,
        borderRadius: 12,
        titleFont: { size: 13, weight: "600" as const },
        bodyFont: { size: 12, weight: "500" as const },
        boxPadding: 6,
        displayColors: false,
        callbacks: {
          title: function (context: any) {
            return `Time: ${context[0].label}`;
          },
          label: function (context: any) {
            const dataIndex = context.dataIndex;
            const data = dummyData[dataIndex];
            if (context.datasetIndex === 0) {
              return [
                `WPM: ${context.parsed.y}`,
                `Errors: ${data.errors}`,
                `Accuracy: ${accuracy}%`,
              ];
            }
            return "";
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          color: `${currentTheme.border}40`,
          drawBorder: false,
          drawTicks: true,
        },
        ticks: {
          color: `${currentTheme.white}80`,
          font: { size: 11, weight: "500" as const },
          padding: 8,
        },
      },
      y: {
        type: "linear" as const,
        position: "left" as const,
        grid: {
          color: `${currentTheme.border}40`,
          drawBorder: false,
        },
        ticks: {
          color: `${currentTheme.white}80`,
          font: { size: 11, weight: "500" as const },
        },
        title: {
          display: true,
          text: "WPM",
          color: `${currentTheme.white}99`,
          font: { size: 11, weight: "600" as const },
        },
      },
      y1: {
        type: "linear" as const,
        position: "right" as const,
        grid: {
          display: false,
        },
        ticks: {
          color: `${currentTheme.white}80`,
          font: { size: 11, weight: "500" as const },
        },
        title: {
          display: true,
          text: "Errors",
          color: `${currentTheme.white}99`,
          font: { size: 11, weight: "600" as const },
        },
      },
    },
  };

  const sessionWpm = Math.round(
    dummyData.reduce((sum, d) => sum + d.wpm, 0) / dummyData.length
  );

  return (
    <div
      className="h-screen  overflow-hidden flex flex-col p-6"
      style={{
        backgroundColor: currentTheme.page_bg,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-7xl mx-auto flex flex-col h-full items-between py-[60px] "
      >
        <div className="flex gap-6 items-start flex-1 min-h-0 ">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.35, duration: 0.5 }}
            className="flex flex-col gap-5 min-w-max flex-shrink-0 pt-8"
          >
            <div className="flex flex-col">
              <span
                style={{ color: currentTheme.accent }}
                className="text-sm font-medium mb-1"
              >
                WPM
              </span>
              <span
                style={{ color: currentTheme.white }}
                className="text-4xl font-bold"
              >
                {sessionWpm}
              </span>
            </div>

            <div className="flex flex-col">
              <span
                style={{ color: currentTheme.accent }}
                className="text-sm font-medium mb-1"
              >
                Accuracy
              </span>
              <span
                style={{ color: currentTheme.white }}
                className="text-4xl font-bold"
              >
                {accuracy}%
              </span>
            </div>

            <div className="flex flex-col">
              <span
                style={{ color: currentTheme.warning }}
                className="text-sm font-medium mb-1"
              >
                Total Errors
              </span>
              <span
                style={{ color: currentTheme.white }}
                className="text-4xl font-bold"
              >
                {totalErrors}
              </span>
            </div>

            <div className="flex flex-col">
              <span
                style={{ color: currentTheme.success }}
                className="text-sm font-medium mb-1"
              >
                Time
              </span>
              <span
                style={{ color: currentTheme.white }}
                className="text-4xl font-bold"
              >
                {totalTime}s
              </span>
            </div>
          </motion.div>
            {/* chart */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex-1 p-6  min-h-0 "
              style={{
                backgroundColor: currentTheme.page_bg,
              }}
            >
              <div className="h-full">
                <Line ref={chartRef} data={chartData} options={chartOptions} />
              </div>
            </motion.div>
        </div>
        {/* // button list */}
        <ChartButtonsOptions />
      </motion.div>
    </div>
  );
}

export default TypingChartResult;

const ChartButtonsOptions = () => {
  const { currentTheme } = useThemeHook();
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="flex justify-center gap-6 flex-shrink-0  items-center "
    >
      <div className="flex gap-4">
        {[
          { icon: RotateCcw, label: "Replay", color: currentTheme.accent },
          { icon: ArrowRight, label: "Next", color: currentTheme.info },
          { icon: RefreshCw, label: "Repeat", color: currentTheme.success },
          { icon: Camera, label: "Screenshot", color: currentTheme.warning },
        ].map(({ icon: Icon, label, color }) => (
          <button
            key={label}
            className="relative p-4 transition-all duration-300"
            style={{
              backgroundColor: "transparent",
              border: "none",
              transform: "scale(1)",
            }}
            onMouseEnter={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = `0 0 24px ${color}50`;
              btn.style.transform = "scale(1.1)";
            }}
            onMouseLeave={(e) => {
              const btn = e.currentTarget as HTMLButtonElement;
              btn.style.boxShadow = "none";
              btn.style.transform = "scale(1)";
            }}
            aria-label={label}
          >
            <Icon className="w-6 h-6" style={{ color }} />
          </button>
        ))}
      </div>

      <button
        className="relative rounded-2xl px-6 py-3 transition-all duration-300 font-semibold flex items-center gap-2"
        style={{
          backgroundColor: currentTheme.accent,
          border: "none",
          color: currentTheme.page_bg,
          transform: "scale(1)",
        }}
        onMouseEnter={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = currentTheme.info;
          btn.style.boxShadow = `0 0 28px ${currentTheme.accent}60`;
          btn.style.transform = "scale(1.08)";
        }}
        onMouseLeave={(e) => {
          const btn = e.currentTarget as HTMLButtonElement;
          btn.style.backgroundColor = currentTheme.accent;
          btn.style.boxShadow = "none";
          btn.style.transform = "scale(1)";
        }}
        aria-label="Save Result"
      >
        <Download className="w-5 h-5" />
        Save Result
      </button>
    </motion.div>
  );
};

