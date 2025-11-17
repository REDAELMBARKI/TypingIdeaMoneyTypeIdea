import { RotateCcw,
  ArrowRight,
  RefreshCw,
  Camera,
//   Star,

} from "lucide-react";
import useThemeHook from "../customHooks/useThemeHook";
import { motion } from "framer-motion";
interface ChartButtonsOptionsProps {
  handleNext: () => void;
  handleReset: () => void;
  handleScreenShot: () => void;
  handleReplay: () => void; 
 
}
const ChartButtonsOptions = ({
  handleNext,
  handleReset,
  handleScreenShot,
  handleReplay, 

}: ChartButtonsOptionsProps) => {
  const { currentTheme } = useThemeHook();
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.5 }}
      className="flex gap-6 flex-shrink-0  items-center  absolute bottom-10 left-0 translate-x-1/2 translate-y-1/2  "
    >
      <div className="flex gap-4">
        {[
          { icon: RotateCcw, label: "Replay", action : handleReplay},
          { icon: ArrowRight, label: "Next", action : handleNext},
          { icon: RefreshCw, label: "Repeat",  action : handleReset},
          { icon: Camera, label: "Screenshot", action : handleScreenShot},
        ].map(({ icon: Icon, label , action } , i) => (
          <button
            key={i}
            onClick={action}
             className="flex items-center gap-2 p-3 rounded-xl transition-all duration-200 
               hover:bg-gray-800 hover:scale-105 active:scale-95 cursor-pointer"
            style={{
              backgroundColor: "transparent",
              border: "none",
             
            }}
           
            title={label}
          >
            <Icon className="w-6 h-6" style={{ color : currentTheme.gray }} />
             <span className="text-sm" style={{ color: currentTheme.gray }}>
            {label}
          </span>
          </button>
        ))}
      </div>
    
    </motion.div>
  );
};



export default ChartButtonsOptions ; 