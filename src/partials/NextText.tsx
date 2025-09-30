
import { ArrowBigRight} from 'lucide-react';

function NextText({isDarkMode, nextText}: {isDarkMode: boolean, nextText: () => void}) {
  return (
    <button
            onClick={nextText}
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
            <ArrowBigRight size={18} />
            <span>new Text</span>
          </button>
  )
}

export default NextText