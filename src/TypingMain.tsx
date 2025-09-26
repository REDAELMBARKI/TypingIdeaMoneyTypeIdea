import React, { useState, useRef, useEffect } from "react";
import useThemeHook from "./customHooks/useThemeHook";
import Footer from "./partials/Footer";
import States from "./partials/States";
import Reseter from "./partials/Reseter";
import { useTextRender } from "./customHooks/useTextRender";
import useCharacterDeleteHook from "./customHooks/useCharacterDeleteHook";
import useAudio from "./customHooks/useAudio";
import { allowedKeys } from "./data/allowdKeys";
import useControlleBoundery from "./customHooks/useControlleBoundery";
import type { currentLetterType } from "./types/maintyping";
import { useWrongWordsFinder } from "./customHooks/useWrongWordsFinder";
import TypingOverModal from "./partials/typingEndModel";
import useTypingEnd from "./customHooks/useTypingEnd";
import useIndexIncrementer from "./customHooks/useIndexIncrementer";
import CapsOnModel from "./components/CapsOnModel";

const sampleTexts = [
  "The quick brown fox jumps over the lazy dog near the riverbank. ",
  "Technology has revolutionized the way we communicate and share information across the globe. ",
  "Mountains rise majestically against the azure sky while gentle waves lap at the sandy shore below. ",
  "Programming languages evolve continuously to meet the demands of modern software development. ",
  "Nature provides endless inspiration for artists, writers, and creative minds throughout history. ",
];

const TypingApp: React.FC = () => {
  const [currentText, setCurrentText] = useState<string>(sampleTexts[0]);
  const [currentLetter, setCurrentLetter] = useState<currentLetterType>({
    index: 0,
    letter: ""
  });
  // sound param (mute / activate)
  const [isEnableSound] = useState<boolean>(true);
  // game end controller state
  const [isTypingEnds , setIsTypingEnds] = useState<boolean>(false) ;
  const [inputValue, setInputValue] = useState<string>("");
  const [wrongChars, setWrongChars] = useState<number[]>([]);
  const [trachChars, setTrachChars] = useState<string[]>([]);
  const [isWrongWord, setIsWrongWord] = useState<boolean>(false);
  const [trachWord, setTrachWord] = useState<string[]>([]);
  const [isTypingActive , setIsTypingActive] = useState<boolean>(false);
  const [wrongWords, setWrongWords] = useState<
    { start: number; end: number }[]
  >([]);

  const [isCapsOn, setIsCapsOn] = useState<boolean>(false);


  // refs
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  //hooks
  const { isDarkMode } = useThemeHook();


  // caps listener
  useEffect(()=>{
     const capsListner = (e:KeyboardEvent) => {
         setIsCapsOn(e.getModifierState("CapsLock")) ;
     }

     window.addEventListener('keydown' , capsListner)
     return () => window.removeEventListener('keydown' , capsListner)
  },[])

  // Focus the hidden input on component mount

  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);

  const handleReset = () => {
    // Placeholder for reset functionality
    setCurrentLetter({ index: 0, letter: "" });
    setInputValue("");
    setWrongWords([])
    setWrongChars([]);
    const randomText =
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(randomText);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  };

 
  useEffect(()=>{
      const handleKeyDown = () =>  setIsTypingActive(true) ;
      
      const handleKeyUp = () => setIsTypingActive(false) ;
      
      window.addEventListener('keydown' ,handleKeyDown)
      window.addEventListener('keyup' ,handleKeyUp)


      return () => {
         window.removeEventListener('keydown' , handleKeyDown)
         window.removeEventListener('keyup' , handleKeyUp)
      }
  } ,[])
  // hooks call

  // index incriment controller 
  useIndexIncrementer({currentText , currentLetter , inputValue , setInputValue , wrongChars ,isWrongWord, setIsWrongWord , setWrongChars ,setCurrentLetter})
  
  // findes the wrong words 
  useWrongWordsFinder({
    currentLetter,
    currentText,
    setWrongWords,
    wrongChars,
    inputValue,
  });

  const renderText = useTextRender({
    currentText,
    currentLetter,
    inputValue,
    wrongChars,
    isWrongWord,
    trachWord,
    wrongWords,
    isTypingActive
  });
  const handleDeleteChar = useCharacterDeleteHook({
    currentText,
    currentLetter,
    setCurrentLetter,
    wrongChars,
    setWrongChars,
    trachWord,
    setTrachWord,
    setWrongWords
  });

  // audio player
  useAudio({ allowedKeys, isEnableSound  });

  // typing  watcher 
   
   useTypingEnd({currentLetter , currentText , setIsTypingEnds})


  useControlleBoundery({
    wrongChars,
    hiddenInputRef,
    currentLetter,
    currentText,
    setTrachChars,
    trachChars,
    setIsWrongWord,
    setInputValue,
    trachWord,
    setTrachWord
  });
  return (
    <div
      className={`min-h-screen transition-colors duration-300  ${
        isDarkMode ? "bg-gray-900" : "bg-gray-50"
      }`}
    >
      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-20">
         {/* inform for caps on case  */}
         {
           isCapsOn && <CapsOnModel />
         }
        {/* Text Display */}
        <div className="w-full max-w-screen mx-auto mt-5">
          <div
            className={`
            text-lg sm:text-lg lg:text-2xl leading-relaxed sm:leading-relaxed lg:leading-relaxed
            font-mono text-center p-6 sm:p-8 lg:p-12 rounded-2xl shadow-sm
            ${
              isDarkMode
                ? "bg-gray-800/50 backdrop-blur-sm border border-gray-700/50"
                : "bg-white/70 backdrop-blur-sm border border-gray-200/50"
            }
          `}
          >
            <div className="mx-w-full hitespace-normal break-words break-keep ">
              {/* // text render */}
              {renderText}
            </div>
            <div>
              {/* // typing over div model  */}
              {
                isTypingEnds && <TypingOverModal onReset={handleReset} />
              }
            </div>
          </div>
        </div>

        {/* Hidden Input Field */}
        <input
          onPaste={(e) => e.preventDefault()}
          ref={hiddenInputRef}
          onChange={(e) => {
            // Only allow one character
            const value = e.target.value;
            if (value.length > 1) {
              setInputValue(value.slice(-1));
            } else {
              setInputValue(value);
            }
          }}
          value={inputValue}
          onKeyDown={(e) => {
            if (e.key === "Backspace" || e.key === "Delete") {
              handleDeleteChar();
            }

          }}
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
          <Reseter isDarkMode={isDarkMode} handleReset={handleReset} />
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
