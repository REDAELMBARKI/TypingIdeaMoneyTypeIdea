import useThemeHook from "../../customHooks/useThemeHook";
import { motion } from "framer-motion";
const LeftDataAboutTheSession = ({ sessionWpm }: { sessionWpm: number }) => {
  const { currentTheme } = useThemeHook();
  return (
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
          {0}%
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
          {0}
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
          {0}s
        </span>
      </div>
    </motion.div>
  );
};


export default LeftDataAboutTheSession ;