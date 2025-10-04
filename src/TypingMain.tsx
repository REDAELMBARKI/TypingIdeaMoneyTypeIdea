import React, { useState, useRef, useEffect } from "react";
import useThemeHook from "./customHooks/useThemeHook";
import Footer from "./partials/Footer";
import States from "./partials/States";
import Reseter from "./partials/Reseter";
import { useTextRender } from "./customHooks/useTextRender";
import useCharacterDeleteHook from "./customHooks/useCharacterDeleteHook";
import useTypingSound from "./customHooks/useTypingSound";
import { allowedKeys } from "./data/allowdKeys";
import useControlleBoundery from "./customHooks/useControlleBoundery";
import type { currentLetterType, Mode, WordHistoryItem } from "./types/experementTyping";
import { useWrongWordsFinder } from "./customHooks/useWrongWordsFinder";
import TypingOverModal from "./partials/TypingOverModal";
import useTypingEnd from "./customHooks/useTypingEnd";
import useIndexIncrementer from "./customHooks/useIndexIncrementer";
import CapsOnModel from "./components/CapsOnModel";
import useTypingWatcher from "./customHooks/useTypingWatcher";
import useErrorTypingSound from "./customHooks/useErrorTypingSound";
import useSpaceJump from "./customHooks/useSpaceJump";
// import useWindowResize from "./customHooks/useWindowResize";
import NextText from "./partials/NextText";
import TypingBoardControls from "./components/TypingBoardControls";
import { ElapsedTimeHandler } from "./functions/elapsedTimeHandler";
import useSessionTimerCountDown from "./customHooks/useSessionTimerCountDown";
import useCapsLockListener from "./customHooks/useCapsLockListener";
import useTypingControlleFunctions from "./functions/useTypingControlleFunctions";
import useCorrectTypedCharsCounter from "./customHooks/useCorrectTypedCharsCounter";

const sampleTexts = [
  // "The quick brown fox jumps over the lazy dog near the riverbank.Technology has revolutionized the way we communicate and share information across the globe.Programming languages evolve continuously to meet the demands of modern software developmen Nature provides endless inspiration for artists writers and creative minds throughout history" ,
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
    letter: "",
  });
  // spaces tracker where the word left of before landing to next word
  const [wordHistory, setWordHistory] = useState<WordHistoryItem[]>([]);
  // ----------------------------------------------------------------------
  // sound param (mute / activate)
  const [isNormalTypingSoundEnabled] = useState<boolean>(false);
  const [isErrorSoundEnabled] = useState<boolean>(false);
  // game end controller state
  const [isTypingEnds, setIsTypingEnds] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  // chars that are worong and colored in red 
  const [wrongChars, setWrongChars] = useState<number[]>([]);

  const [isWrongWord, setIsWrongWord] = useState<boolean>(false);
  // wrong chars is not preserving the chars its deletes them after jumping to next word
  const [trachWord, setTrachWord] = useState<string[]>([]);
  const [isTypingActive, setIsTypingActive] = useState<boolean>(false);
  const [wrongWords, setWrongWords] = useState<
    { start: number; end: number }[]
  >([]);

  const [isCapsOn, setIsCapsOn] = useState<boolean>(false);
  // select time fo session typing
  const [selectedTime, setSelectedTime] = useState<number>(30);
  // time elased or count down realstate
  const [elapsedTime, setElapsedTime] = useState<number>(selectedTime);
  // typign begin listener
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  // typing mode (words | time )
  const [typingModeSelected , setTypingModeSelected] = useState<Mode>('words') ;
  // the amount of time the typing session took
  const [,setAmountOfTime] = useState<number>();
  // words typed
  const [typedWordsAmount, setTypedWordsAmount] = useState<number>(0);
  // correct words final result 
  const [totalCorrectedChars , setTotalCorrectedChars] =  useState<number>();
  //text conatiner width
  // const [containerWidth  ,setContainerWidth] =  useState<number>(0);

  // refs
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  // text container
  const containerRef = useRef<HTMLDivElement | null>(null);
  // timer accum
  const TimeEndRef = useRef<number | null>(null);
  const startTypingTimeRef = useRef<number>(0);
  //hooks
  const { isDarkMode } = useThemeHook();

  // console logs ////////////////

  useEffect(() => {
    console.log('correct chars' , totalCorrectedChars)
  }, [totalCorrectedChars]);

  ///////////////////////////////////



  // the amount if words typed handler
  useEffect(() => {
    if (inputValue !== " ") return;

    setTypedWordsAmount((prev) => prev + 1);
  }, [inputValue]);

  // typing start lister (envocking ellapsed time calculation)
  useEffect(() => {
    if (!isTypingStarted) return;
    ElapsedTimeHandler({ selectedTime, setElapsedTime });
  }, [isTypingStarted]);


  //  the start date of the typing session setter
  useEffect(() => {
    if (!isTypingEnds) return;

    const sessionTime = (TimeEndRef.current =
      Date.now() - startTypingTimeRef.current);
    setAmountOfTime(sessionTime);
  }, [isTypingEnds]);

  // caps listener
  useCapsLockListener({ setIsCapsOn });

  // Focus the hidden input on component mount
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, []);

  const { nextText, handleReset } = useTypingControlleFunctions({
    sampleTexts,
    isTypingEnds,
    hiddenInputRef,
    currentText,
    setWrongChars,
    setCurrentLetter,
    setWrongWords,
    setIsTypingEnds,
    setCurrentText,
    currentLetter,
    setInputValue,
    setTypedWordsAmount
  });

  // hooks call
  // window resize
  // useWindowResize({containerRef  ,setContainerWidth})

  
  // totall characters typed correctly 
  useCorrectTypedCharsCounter({  
  isTypingEnds,
  wordHistory,
  wrongChars,
  currentText,
  setTotalCorrectedChars,})


  
  // starting timer listener (typing session start listener)
  useSessionTimerCountDown({
    startTypingTimeRef,
    setIsTypingStarted,
    allowedKeys,
    currentLetter,
  });

  // jumps to next word in space clicking (before the current word ends)
  useSpaceJump({
    inputValue,
    currentLetter,
    currentText,
    setCurrentLetter,
    setWordHistory,
    setWrongWords,
  });

  // typing watcher (typing active or not)
  useTypingWatcher({ setIsTypingActive });

  // index incriment controller
  useIndexIncrementer({
    currentText,
    currentLetter,
    inputValue,
    setInputValue,
    wrongChars,
    isWrongWord,
    setIsWrongWord,
    setWrongChars,
    setCurrentLetter,
  });

  // findes the wrong words
  useWrongWordsFinder({
    currentLetter,
    currentText,
    setWrongWords,
    wrongChars,
    inputValue,
    wrongWords,
  });

  // text chars render function
  const renderText = useTextRender({
    currentText,
    currentLetter,
    inputValue,
    wrongChars,
    isWrongWord,
    trachWord,
    wrongWords,
    isTypingActive,
    wordHistory,
  });


   // delete click handler
  const handleDeleteChar = useCharacterDeleteHook({
    currentText,
    currentLetter,
    setCurrentLetter,
    wrongChars,
    setWrongChars,
    trachWord,
    setTrachWord,
    setWrongWords,
    wrongWords,
    wordHistory,
    setWordHistory,
  });

  // audio player
  // regular typing sound
  useTypingSound({ allowedKeys, isNormalTypingSoundEnabled });
  //error sound
  useErrorTypingSound({
    inputValue,
    currentLetter,
    currentText,
    isErrorSoundEnabled,
  });

  // typing  watcher
  useTypingEnd({ currentLetter, currentText, setIsTypingEnds });

  useControlleBoundery({
    wrongChars,
    hiddenInputRef,
    currentLetter,
    currentText,
    setIsWrongWord,
    setInputValue,
    trachWord,
    setTrachWord,
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
        {isCapsOn && <CapsOnModel />}
        {/* cntrolls  */}

        {/* Text Display */}
        <div className="w-[80%] max-w-screen mx-auto mt-[100px]">
          <section>
            <TypingBoardControls
              setTypingModeSelected={setTypingModeSelected}
              currentText={currentText}
              typingModeSelected={typingModeSelected}
              typedWordsAmount={typedWordsAmount}
              isTypingStarted={isTypingStarted}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
              elapsedTime={elapsedTime}
            />
          </section>
          <div
            className={`
            text-lg sm:text-lg lg:text-2xl leading-relaxed sm:leading-relaxed lg:leading-relaxed
            font-mono text-center p-6 sm:p-8 lg:p-12 rounded-2xl shadow-sm text-slate-400
            ${
              isDarkMode
                ? "backdrop-blur-sm border border-gray-700/50"
                : " backdrop-blur-sm border border-gray-200/50"
            }
          `}
          >
            <div
              className="mx-w-full hitespace-normal break-words break-keep text-3xl"
              ref={containerRef}
              style={{ textAlign: "center" }}
            >
              {/* // text render */}
              {renderText}
            </div>
            <div>
              {/* // typing over div model  */}
              {isTypingEnds && <TypingOverModal nextText={nextText} handleReset={handleReset} />}
            </div>
          </div>
        </div>

        {/* Hidden Input Field */}
        <input
          onPaste={(e) => e.preventDefault()}
          ref={hiddenInputRef}
          onChange={(e) => {
            
            if (
              (currentText[currentLetter.index - 1] === " " ||
                currentLetter.index === 0) &&
              e.target.value === " "
            )
            return; // dont allow space as in the begening of each word

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
          {
            <>
              <Reseter
                isBlured={currentLetter.index === 0 ? true : false}
                isDarkMode={isDarkMode}
                handleReset={handleReset}
              />
              <NextText isDarkMode={isDarkMode} nextText={nextText} />
            </>
          }
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
