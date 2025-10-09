
import { ArrowBigRight} from 'lucide-react';

function NextText({ nextText}: {nextText: () => void}) {
  return (
    <button
            onClick={nextText}
            className={`
              flex items-center space-x-2 px-6 py-3 rounded-xl font-medium
              transition-all duration-200 transform hover:scale-105 active:scale-95
              shadow-sm hover:shadow-md
             
              'bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 border border-gray-200
              
            `}
          >
            <ArrowBigRight size={18} />
            <span>new Text</span>
          </button>
  )
}

export default NextText