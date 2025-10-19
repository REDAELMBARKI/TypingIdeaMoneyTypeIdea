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
import TypingOverModal from "./modals/TypingOverModal";
import useTypingEnd from "./customHooks/useTypingEnd";
import useIndexIncrementer from "./customHooks/useIndexIncrementer";
import CapsOnModel from "./modals/CapsOnModel";
import useTypingWatcher from "./customHooks/useTypingWatcher";
import useErrorTypingSound from "./customHooks/useErrorTypingSound";
import useSpaceJump from "./customHooks/useSpaceJump";
import useWindowResize from "./customHooks/useWindowResize";
import NextText from "./partials/NextText";
import TypingBoardControls from "./components/TypingBoardControls";
import { ElapsedTimeHandler } from "./functions/elapsedTimeHandler";
import useSessionTimerCountDown from "./customHooks/useSessionTimerCountDown";
import useCapsLockListener from "./customHooks/useCapsLockListener";
import useTypingControlleFunctions from "./functions/useTypingControlleFunctions";
import useWpmServiceReset from "./customHooks/useWpmServiceReset";
import useWpmCalculationHandler from "./customHooks/useWpmCalculationHandler";
import useThemePreviewerAndSetter from "./customHooks/useThemePreviewerAndSetter";
import { sampleTexts } from "./data/texts";
import useTextRawsSlicer from "./customHooks/useTextRawsSlicer";
import { sliceWordsHandler } from "./functions/sliceWordsHandler";
import { containerWordsRangeFitHanlder } from "./functions/containerWordsRangeFitHanlder";

// import TypingResults from "./modals/TypingResults";




const TypingApp: React.FC = () => {
  
  // the text sliced index where the text will be sliced from (the text starts from this index )
  const [textSliceStartIndex , setTextSliceStartIndex] = useState<number>(0) ;
  // current text state 15 words to be genrated at the first time (the text ends in this index)
  const [sessionWordsCount , setSessionWordsCount] = useState<number>(100) ;

  const [dynamicTextRange , setDynamicTextRange] = useState<number>(15) ; // the words count that can fit in the container raws

  const [currentText, setCurrentText] = useState<string>(sliceWordsHandler(textSliceStartIndex , dynamicTextRange ));
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
  // const [amountOfTime,setAmountOfTime] = useState<number>();
  // words typed
  const [typedWordsAmount, setTypedWordsAmount] = useState<number>(0);
  // correct words final result 
  // const [totalCorrectedChars , setTotalCorrectedChars] =  useState<number>();
  // typing ends model togller
  const [isShowTypingOverModal , setIsShowTypingOverModal] = useState<boolean>(false)
    // wpm ref
  const [wpmFinal, setWpmFinal] = useState<number>(0);

 // lne bbreaks
 const [lineBreakIndices, setLineBreakIndices] = useState<number[]>([]);
 
  const totalCorrectedCharsRef =  useRef<number | null>(null);
  //text conatiner width
  const [containerWidth  ,setContainerWidth] =  useState<number>(0);
  
  // refs
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const amountOfTimeRef = useRef<number | null>(null);
  // text container
  const containerRef = useRef<HTMLDivElement | null>(null);
  // text font size ref
  const fontSizeRef = useRef<number>(36);
  // underline ref

  const startTypingTimeRef = useRef<number>(0);
  //hooks
 

  // theme state

  // console.log(previewTheme , 'preview theme in main');
  const {  currentTheme } =  useThemeHook() ;
 

  // console logs ////////////////
     useEffect(() => {

      //  console.log(currentText)
    
     }, [currentText , sessionWordsCount]);
  ///////////////////////////////////



//////////////////////////////////////////////////////


// count the eindexes where the text breaks to next like /n
useEffect(() => {
 let prevY = containerRef.current?.querySelector('span')?.getBoundingClientRect().top ;
 const myTextSpans = containerRef.current?.querySelectorAll('span') ?? [] ;
 myTextSpans.forEach((span , spanIndex) => {
    if(span.getBoundingClientRect().top !== prevY ) {
      setLineBreakIndices(prev => [...prev , spanIndex]) // set to new raw Y 
      prevY = span.getBoundingClientRect().top;
    }
 })

}, [containerWidth]);

//////////////////////////////////////////////////////////
  
  // denamice text raws updater (every we typd two raws the first line of the text should be removed  and new line appears )
  useEffect(() => {
    if(! containerRef.current ) return ;
    const currentSpan = containerRef.current.querySelector('span')!.getBoundingClientRect().top;
    if (!currentSpan) return;
    // const i:number = 15 ;
    // setTextSliceStartIndex(i) ; 
    // setDynamicTextRange(prev => prev + i) ;
  }, [currentLetter.index]);

  // the amount of words typed handler
  useEffect(() => {
    if (inputValue !== " ") return;
    setTypedWordsAmount((prev) => prev + 1);
  }, [inputValue]);

  // typing start listener (envocking ellapsed time calculation)
  useEffect(() => {
    if (!isTypingStarted) return;
    ElapsedTimeHandler({ selectedTime, setElapsedTime });
  }, [isTypingStarted]);

 


   //  text raws to be rendered slicer
   useTextRawsSlicer({containerWidth , containerRef  , setCurrentText ,textSliceStartIndex ,dynamicTextRange, setDynamicTextRange})
  
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
    hiddenInputRef,
    currentText,
    setWrongChars,
    setCurrentLetter,
    setWrongWords,
    setIsTypingEnds,
    setCurrentText,
    setInputValue,
    setTypedWordsAmount ,
    setIsShowTypingOverModal
  });

  // hooks call
  // window resize
  useWindowResize({containerRef  ,setContainerWidth})
  
  // ########################  wpm services and calculations reset ###########################
     // wpm calculations handlers
     useWpmCalculationHandler({setIsShowTypingOverModal , setWpmFinal , isTypingEnds,startTypingTimeRef,amountOfTimeRef ,wordHistory , wrongChars ,  currentText , totalCorrectedCharsRef }) ;
     // wpm reset service
     useWpmServiceReset({wpmFinal ,totalCorrectedCharsRef , amountOfTimeRef , startTypingTimeRef , setWpmFinal , setTypedWordsAmount , isTypingEnds})
  // ########################  ###############  // ###########################

     // theme previewer
    useThemePreviewerAndSetter() ;
  // end theme setter 
  
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
    lineBreakIndices ,
    currentTheme ,
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


  //   const sampleSessionStats = {
  //   wpm: 85,
  //   rawWpm: 92,
  //   accuracy: 96.5,
  //   totalTime: 60,
  //   correctChars: 425,
  //   wrongChars: 12,
  //   missedChars: 8,
  //   totalChars: 445,
  //   peakWpm: 98,
  //   consistency: 89
  // };

  // const sampleChartData = [
  //   { time: 0, wpm: 0 },
  //   { time: 5, wpm: 45 },
  //   { time: 10, wpm: 62 },
  //   { time: 15, wpm: 73 },
  //   { time: 20, wpm: 78 },
  //   { time: 25, wpm: 85 },
  //   { time: 30, wpm: 88 },
  //   { time: 35, wpm: 92 },
  //   { time: 40, wpm: 87 },
  //   { time: 45, wpm: 90 },
  //   { time: 50, wpm: 95 },
  //   { time: 55, wpm: 98 },
  //   { time: 60, wpm: 85 }
  // ];


  return (
    <div
      className={`min-h-screen transition-colors duration-300  `}
      style={{background :  currentTheme.page_bg}}
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
              sessionWordsCount={sessionWordsCount}
              setSessionWordsCount={setSessionWordsCount}
              currentTheme={currentTheme}
              setTypingModeSelected={setTypingModeSelected}
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
            font-mono text-center p-6 sm:p-8 lg:p-12 rounded-2xl shadow-sm 
            backdrop-blur-sm 
          `}
          >
            <div
              className="mx-w-full hitespace-normal break-words break-keep  "
              ref={containerRef}
              style={{ textAlign: "start" , fontSize : `${fontSizeRef.current}px` , border : "1px solid red" , overflowY:'hidden' }}
            >
              {/* // text render */}
              {renderText}
            </div>
            <div className="">
              {/* // typing over div model  */}
              {isShowTypingOverModal  && <TypingOverModal
                    wpmFinal={wpmFinal}  nextText={nextText} handleReset={handleReset} />}
            </div>

            <div>
              {/* { isShowTypingOverModal &&
                 <TypingResults
                  sessionStats={sampleSessionStats}
                  chartData={sampleChartData}
                />
              } */}
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
                currentTheme={currentTheme} 
                handleReset={handleReset}
              />
              <NextText  nextText={nextText} />
            </>
          }
        </div>

        {/* Stats Placeholder */}
        <States  wpmFinal={wpmFinal} currentTheme={currentTheme} />
      </main>

      {/* Footer */}
      <Footer  />
    </div>
  );
};

export default TypingApp;
