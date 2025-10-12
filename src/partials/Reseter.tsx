import React from 'react'
import { RotateCcw} from 'lucide-react';
import type { ThemeColors } from '../types/experementTyping';

function Reseter({handleReset , isBlured , currentTheme}: { currentTheme : ThemeColors, isBlured:boolean, handleReset: () => void}) {
  if(isBlured){
    return null ;
  }
  
  return (
    <button
            onClick={handleReset}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-xl font-medium
              transition-all duration-200 transform hover:scale-105 active:scale-95
              shadow-sm hover:shadow-md
              hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-200 
              
            `} 

            style={{background : currentTheme.gray  , color : currentTheme.white}}

            disabled={isBlured}
          >
            <RotateCcw size={18} />
            <span>Reset</span>
          </button>
  )
}

export default Reseter