import React, { useState, useRef, useEffect } from 'react';
import { RotateCcw} from 'lucide-react';
import useThemeHook from './customHooks/useThemeHook';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Technology has revolutionized the way we communicate and share information across the globe.",
  "Mountains rise majestically against the azure sky while gentle waves lap at the sandy shore below.",
  "Programming languages evolve continuously to meet the demands of modern software development.",
  "Nature provides endless inspiration for artists, writers, and creative minds throughout history."
];

const TypingApp: React.FC = () => {
 
  const [currentText, setCurrentText] = useState(sampleTexts[0]);
  const [currentLetterIndex, setCurrentLetterIndex] = useState(0);
  const hiddenInputRef = useRef<HTMLInputElement>(null);
 const {isDarkMode } =  useThemeHook();

  // Focus the hidden input on component mount
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);

  const handleReset = () => {
    // Placeholder for reset functionality
    setCurrentLetterIndex(0);
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(randomText);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.value = '';
      hiddenInputRef.current.focus();
    }
  };


  const renderText = () => {
    return currentText.split('').map((char, index) => {
      let className = 'transition-all duration-150 ';
      
      if (index === currentLetterIndex) {
        // Current letter highlighting (placeholder logic)
        className += isDarkMode 
          ? 'bg-blue-500 text-white rounded-sm' 
          : 'bg-blue-500 text-white rounded-sm';
      } else if (index < currentLetterIndex) {
        // Typed letters (placeholder logic)
        className += isDarkMode 
          ? 'text-green-400' 
          : 'text-green-600';
      } else {
        // Untyped letters
        className += isDarkMode 
          ? 'text-gray-400' 
          : 'text-gray-600';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };

  return (
    <div className={`min-h-screen transition-colors duration-300  ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
      {/* Header */}
     

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-20">
        {/* Text Display */}
        <div className="w-full max-w-4xl mx-auto">
          <div className={`
            text-2xl sm:text-3xl lg:text-4xl leading-relaxed sm:leading-relaxed lg:leading-relaxed
            font-mono text-center p-6 sm:p-8 lg:p-12 rounded-2xl shadow-sm
            ${isDarkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
              : 'bg-white/70 backdrop-blur-sm border border-gray-200/50'
            }
          `}>
            {renderText()}
          </div>
        </div>

        {/* Hidden Input Field */}
        <input
          ref={hiddenInputRef}
          type="text"
          className="absolute -left-9999px opacity-0 pointer-events-none"
          aria-hidden="true"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />

        {/* Controls */}
        <div className="flex items-center justify-center mt-8 space-x-4">
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
        </div>

        {/* Stats Placeholder */}
        <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 w-full max-w-2xl">
          {[
            { label: 'WPM', value: '0' },
            { label: 'Accuracy', value: '100%' },
            { label: 'Time', value: '0s' },
            { label: 'Characters', value: '0' }
          ].map((stat, index) => (
            <div
              key={index}
              className={`
                text-center p-4 rounded-xl shadow-sm
                ${isDarkMode 
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
                  : 'bg-white/70 backdrop-blur-sm border border-gray-200/50'
                }
              `}
            >
              <div className={`text-2xl sm:text-3xl font-bold ${
                isDarkMode ? 'text-blue-400' : 'text-blue-600'
              }`}>
                {stat.value}
              </div>
              <div className={`text-sm font-medium mt-1 ${
                isDarkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className={`text-center py-6 ${
        isDarkMode ? 'text-gray-500' : 'text-gray-400'
      }`}>
        <p className="text-sm">
          Click anywhere to start typing • Press Tab + Enter to reset
        </p>
      </footer>
    </div>
  );
};

export default TypingApp;