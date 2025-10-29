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
// import useSessionReplay from "./customHooks/useSessionReplay";

// import TypingResults from "./modals/TypingResults";


const lasySoundStoredState = () => JSON.parse(localStorage.getItem('parameters') ?? `[]`).includes('sound'.toLowerCase()) ; 
const lasyErrorSoundStoredState = () => JSON.parse(localStorage.getItem('parameters') ?? `[]`).includes('errorSound'.toLowerCase()) ; 

const TypingApp: React.FC = () => {
  
    // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ | states | ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \
    
  // the text sliced index where the text will be sliced from (the text starts from this index )
  const [textSliceStartIndex  , setTextSliceStartIndex] = useState<number>(0) ;
  // current text state 15 words to be genrated at the first time (the text ends in this index)
  const [sessionWordsCount , setSessionWordsCount] = useState<number>(10) ;

  const [dynamicTextRange , setDynamicTextRange] = useState<number>(0) ; // the words count that can fit in the container raws

  const [currentText, setCurrentText] = useState<string>("");
  const [currentLetter, setCurrentLetter] = useState<currentLetterType>({
    index: 0,
    letter: "",
  });
  // spaces tracker where the word left of before landing to next word
  const [wordHistory, setWordHistory] = useState<WordHistoryItem[]>([]);
  // ----------------------------------------------------------------------
  // sound param (mute / activate)
  const [isNormalTypingSoundEnabled,setIsNormalTypingSoundEnabled] = useState<boolean>(lasySoundStoredState);
  const [isErrorSoundEnabled , setIsErrorSoundEnabled] = useState<boolean>(lasyErrorSoundStoredState);
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
  
  const [isFocuceOnText ,setIsFocuceOnText] = useState<boolean>(false) ;
 //  first line shift toggler 
const [isShiftFirstLine , setIsShiftFirstLine] = useState<boolean>(false) ; 

//text conatiner width
const [containerWidth  ,setContainerWidth] =  useState<number>(0);

   // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ | end states | ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \
    


  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ | refs | ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \
  // line 3 data 

  const line3YRef = useRef<{top : number , wordIndex : number} |null>(null) ;
  // th epreviousline 
  const prevLineRef = useRef<number>(0);


  const totalCorrectedCharsRef =  useRef<number | null>(null);
  
  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const amountOfTimeRef = useRef<number | null>(null);
  // text container
  const containerRef = useRef<HTMLDivElement | null>(null);
  // text font size ref
  const fontSizeRef = useRef<number>(36);
  // underline ref

  const startTypingTimeRef = useRef<number>(0);

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ | end of refs | ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \
    

 
  
  // console logs ////////////////
  
  ///////////////////////////////////
  
  

//////////////////////////////////////////////////////


useEffect(() => {
  if (!containerRef.current) return;
  const words = containerRef.current.querySelectorAll('.word');
  if (!words || words.length === 0) return;

  const idx = Math.min(typedWordsAmount, words.length - 1);
  const tops: number[] = [];
  const firstIndexForTop = new Map<number, number>();

  for (let i = 0; i <= idx; i++) {
    const rect = (words[i] as HTMLElement).getBoundingClientRect();
    const top = Math.round(rect.top); 
    if (tops.length === 0 || tops[tops.length - 1] !== top) {
      tops.push(top);
      if (!firstIndexForTop.has(top)) firstIndexForTop.set(top, i);
    }
  }

  const currentLine = Math.max(1, tops.length);
  const prevLine = prevLineRef.current ?? 0;

  if (currentLine >= 3 && prevLine < 3) {
    // reached line 3
    const line3Top = tops[2]; // index 2 -> third line
    const firstIdxOnLine3 = firstIndexForTop.get(line3Top) ?? 0;
    line3YRef.current = { top: line3Top, wordIndex: firstIdxOnLine3 };
    // shift line 1
    setIsShiftFirstLine(true)
  }

  if (currentLine < 3 && prevLine >= 3) {
    line3YRef.current = null;
  }

  prevLineRef.current = currentLine;
}, [typedWordsAmount, currentLetter.index, containerWidth]); 



//////////////////////////////////////////////////////////
  
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

  
  // Focus the hidden input on component mount
  useEffect(() => {
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [isFocuceOnText]);
  
  
     // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++hooks++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \
    
    
    // theme state
    const {  currentTheme } =  useThemeHook() ;

  // store session typing data andtimestamps for relpay 
  //  useSessionReplay({ inputValue , startTypingTimeRef , isReplayTime}) ;   
   //  text raws to be rendered slicer
   useTextRawsSlicer({line3YRef , isShiftFirstLine ,  containerWidth , containerRef  , setCurrentText ,textSliceStartIndex ,dynamicTextRange, setDynamicTextRange})
  
  // caps listener
  useCapsLockListener({ setIsCapsOn });


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
  useTypingWatcher({ setIsTypingActive , isFocuceOnText , setIsFocuceOnText });

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
    currentTheme ,
    currentText,
    currentLetter,
    inputValue,
    wrongChars,
    isWrongWord,
    trachWord,
    wrongWords,
    isTypingActive,
    wordHistory
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
    setTypedWordsAmount
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
        <div className="w-full max-w-screen mx-auto mt-[100px] ">
          
          {/* chow controlls only if we dont type any more line 1000 no keydown */}

          {! isFocuceOnText && <section className="opacity-0 animate-appear-smooth"> 
            <TypingBoardControls
              setIsNormalTypingSoundEnabled={setIsNormalTypingSoundEnabled}
              setIsErrorSoundEnabled={setIsErrorSoundEnabled}
              setSessionWordsCount={setSessionWordsCount}
              currentTheme={currentTheme}
              setTypingModeSelected={setTypingModeSelected}
              typingModeSelected={typingModeSelected}
            
              isTypingStarted={isTypingStarted}
              selectedTime={selectedTime}
              setSelectedTime={setSelectedTime}
           
            />
          </section>} 
           
          <div
            className={`
            text-lg sm:text-lg lg:text-2xl leading-relaxed sm:leading-relaxed lg:leading-relaxed
            font-mono text-center p-6 sm:p-8 lg:p-12 rounded-2xl
            
          `}
          >
            {/* // words counter  */}
             {isFocuceOnText && typingModeSelected === 'time' ?
                        <div className={`px-4 py-2 rounded-lg text-white font-bold shadow-md cursor-default select-none text-center w-[4em] `}
                        style={{
                           background : isTypingStarted ? ( elapsedTime < 10 ? '#ef4444' : elapsedTime < 15 ? '#f97316' : '#16a34a' ) : currentTheme.buttonPrimary
                        }}          
                        
                        >
                           
                          {typingModeSelected === 'time' && elapsedTime}
                        
                        </div>

                        :
                      <div className={`px-4 py-2 rounded-lg text-white font-bold  cursor-default select-none  text-center w-[4em]`}
                        style={{color : currentTheme.buttonSecondary}}
                       >
                        
                        {/*  (currentText.split(' ').length - 1)  i used lenth -1 cuz we an extra char at the end empty space cuz of the space we add in the ext */}
                        {isFocuceOnText && typingModeSelected === 'words' && typedWordsAmount + "/" + sessionWordsCount}  
                      
                      </div>
                }
          
            
            <div
              className="mx-w-full hitespace-normal break-words break-keep h-[180px]"
              ref={containerRef}
              style={{ textAlign: "start" , fontSize : `${fontSizeRef.current}px`, overflowY:'hidden' }}
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
          className="absolute -left-9999px opacity-0 pointer-events-none "
          aria-hidden="true"
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
          spellCheck="false"
        />

        {/* Controls */}
        <div className="flex items-center justify-center mt-8 space-x-4">
          { ! isFocuceOnText &&  
            <section className="opacity-0 animate-appear-smooth flex gap-3">
              <Reseter
                isBlured={currentLetter.index === 0 ? true : false}
                currentTheme={currentTheme} 
                handleReset={handleReset}
              />
              <NextText  nextText={nextText} />
            </section>
          }
        </div>

        {/* Stats Placeholder */}
        {! isFocuceOnText &&  <States  wpmFinal={wpmFinal} currentTheme={currentTheme} />}
      </main>

      {/* Footer */}
      <Footer  />
    </div>
  );
};

export default TypingApp;
