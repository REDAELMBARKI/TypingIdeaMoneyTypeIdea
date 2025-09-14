import React, { useState, useRef, useEffect } from 'react';
import useThemeHook from './customHooks/useThemeHook';
import Footer from './partials/Footer';
import States from './partials/States';
import Reseter from './partials/Reseter';

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
            <div className='mx-w-full break-words'>
              {renderText()}
            </div>
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
          <Reseter isDarkMode={isDarkMode}  handleReset={handleReset} />
        </div>

        {/* Stats Placeholder */}
         <States isDarkMode={isDarkMode} />
      </main>

      {/* Footer */}
      <Footer isDarkMode={isDarkMode} />
    </div>
  );
};

export default TypingApp;