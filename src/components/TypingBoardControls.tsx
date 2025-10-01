import React, { useState } from "react";
import {
  Timer,
  Hash,
  SquareAsterisk,
  RefreshCw,
  SkipForward,
  Shuffle,
  AlignLeft,
  Clock,
} from "lucide-react";


interface TypingBoardControlsProps {
 selectedTime:number ;
 setSelectedTime:React.Dispatch<React.SetStateAction<number>>;
}

export default function TypingBoardControls({selectedTime , setSelectedTime}:TypingBoardControlsProps) {
  const [showTimes, setShowTimes] = useState(false);

  const times = [1, 2,3,4,5];

  return (
    <div className="w-full relative flex items-center gap-6 px-4 py-2 ">
      {/* Elapsed Time */}
      <div className="px-4 py-2 rounded-lg bg-indigo-600 text-white font-bold shadow-md cursor-default select-none">
        {"00:00"}
      </div>

      {/* Time Selector + Expanding Times */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => setShowTimes(!showTimes)}
          className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700"
        >
          <Timer size={22} className="text-slate-700" />
          <span className="text-xs text-gray-700  leading-none">{selectedTime}</span>
        </button>

        {/* Expanding list */}
        <div
          className={`flex items-center gap-3 overflow-hidden transition-all duration-500 ${
            showTimes ? "w-72 opacity-100" : "w-0 opacity-0"
          }`}
        >
          {times.map((t) => (
            <button
              key={t}
              onClick={() => {
                setSelectedTime(t);
                setShowTimes(false);
              }}
              className="flex items-center gap-2 text-xs text-gray-700 hover:text-slate-700 transition"
            >
              <Clock size={18} className="text-slate-700" />
              <span>{t}m</span>
            </button>
          ))}
        </div>
      </div>

      {/* Other Functional Buttons */}
      <div className="flex items-center gap-5 ml-2">
        <button className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700">
          <Hash size={22} className="text-slate-700" />
          <span className="text-xs text-gray-700">Numbers</span>
        </button>

        <button className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700">
          <SquareAsterisk size={22} className="text-slate-700" />
          <span className="text-xs text-gray-700">Symbols</span>
        </button>

        {/* Words Mode (new button) */}
        <button className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700">
          <AlignLeft size={22} className="text-slate-700" />
          <span className="text-xs text-gray-700">Words</span>
        </button>

        <button className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700">
          <Shuffle size={22} className="text-slate-700" />
          <span className="text-xs text-gray-700">Shuffle</span>
        </button>

        <button className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700">
          <RefreshCw size={22} className="text-slate-700" />
          <span className="text-xs text-gray-700">Reset</span>
        </button>

        <button className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700">
          <SkipForward size={22} className="text-slate-700" />
          <span className="text-xs text-gray-700">Next</span>
        </button>
      </div>
    </div>
  );
}
