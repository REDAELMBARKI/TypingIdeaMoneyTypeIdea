import React, { useState, useRef, useEffect } from 'react';
import useThemeHook from './customHooks/useThemeHook';
import Footer from './partials/Footer';
import States from './partials/States';
import Reseter from './partials/Reseter';
import { useTextRender } from './customHooks/useTextRender';

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog near the riverbank.",
  "Technology has revolutionized the way we communicate and share information across the globe.",
  "Mountains rise majestically against the azure sky while gentle waves lap at the sandy shore below.",
  "Programming languages evolve continuously to meet the demands of modern software development.",
  "Nature provides endless inspiration for artists, writers, and creative minds throughout history."
];

const TypingApp: React.FC = () => {
 
  const [currentText, setCurrentText] = useState(sampleTexts[0]);
  const [currentLetter, setCurrentLetter] = useState<{index:number , letter:string}>({index:0 , letter:''});
  const hiddenInputRef = useRef<HTMLInputElement>(null);
  const [inputValue , setInputValue] = useState<string>('');

  const {isDarkMode } =  useThemeHook();

  // Focus the hidden input on component mount
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);

  const handleReset = () => {
    // Placeholder for reset functionality
    setCurrentLetter({index:-1 , letter:''});
    setInputValue('');
    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(randomText);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };


  const renderText = useTextRender({currentText , currentLetter , inputValue}) 

  useEffect(() => {
     if(inputValue.length > currentLetter.index){
         setCurrentLetter({...currentLetter , index : inputValue.length - 1 , letter: inputValue[inputValue.length -1]}) ;
     }
  }, [inputValue])
 
 
  return (
    <div className={`min-h-screen transition-colors duration-300  ${
      isDarkMode ? 'bg-gray-900' : 'bg-gray-50'
    }`}>
   
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-20">
        {/* Text Display */}
        <div className="w-full max-w-4xl mx-auto mt-5">
          <div className={`
            text-2xl sm:text-3xl lg:text-4xl leading-relaxed sm:leading-relaxed lg:leading-relaxed
            font-mono text-center p-6 sm:p-8 lg:p-12 rounded-2xl shadow-sm
            ${isDarkMode 
              ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700/50' 
              : 'bg-white/70 backdrop-blur-sm border border-gray-200/50'
            }
          `}>
            <div className='mx-w-full break-words'>
              {renderText}
            </div>
          </div>
        </div>

        {/* Hidden Input Field */}
        <input

          ref={hiddenInputRef} 
          onChange={(e) => {
            setInputValue(e.target.value)}}
          value={inputValue}

          type="text"
          // -left-9999px  opacity-1 

          className="absolute 
           z-[10000]
           pointer-events-none"
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