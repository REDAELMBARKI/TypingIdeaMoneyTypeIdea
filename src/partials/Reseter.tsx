import React from 'react'
import { RotateCcw} from 'lucide-react';

function Reseter({isDarkMode, handleReset}: {isDarkMode: boolean, handleReset: () => void}) {
  return (
    <button
            onClick={handleReset}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-xl font-medium
              transition-all duration-200 transform hover:scale-105 active:scale-95
              shadow-sm hover:shadow-md
              ${isDarkMode 
                ? 'bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white border border-gray-700'
                : 'bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-200'
              }
            `}
          >
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
  )
}

export default Reseter