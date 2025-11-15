import React, { useState, useRef, useEffect, useMemo } from "react";
import useThemeHook from "./customHooks/useThemeHook";
import Footer from "./partials/Footer";

import Reseter from "./partials/Reseter";
import { textRender } from "./functions/textRender";
import useCharacterDeleteHook from "./customHooks/useCharacterDeleteHook";
import useTypingSound from "./customHooks/useTypingSound";
import { allowedKeys } from "./data/allowdKeys";
import useControlleBoundery from "./customHooks/useControlleBoundery";
import type {
  KeyRecord,
  Mode,
  WordHistoryItem,
  // WordHistoryItem,
} from "./types/experementTyping";
import { useWrongWordsFinder } from "./customHooks/useWrongWordsFinder";
import useTypingEnd from "./customHooks/useTypingEnd";
import useIndexIncrementer from "./customHooks/useIndexIncrementer";
import CapsOnModel from "./modals/CapsOnModel";
import useTypingWatcher from "./customHooks/useTypingWatcher";
import useErrorTypingSound from "./customHooks/useErrorTypingSound";
import useSpaceJump from "./customHooks/useSpaceJump";
import useWindowResize from "./customHooks/useWindowResize";

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
import useLine3Listener from "./customHooks/useLine3Listener";
import useColoringEffect from "./customHooks/useColoringEffect";
import usePersistantSelectedSessionParams from "./customHooks/usePersistantSelectedSessionParams";
import { lasyErrorSoundStoredState, lasySoundStoredState, lazyLoadedSelectedMode, lazyLoadedSelectedTime, lazyLoadedSessionWordsCount } from "./functions/lazyLoadedSessionData";
import { recordKeyStroke } from "./functions/typeSessionRecord";
import TypingChartResult from "./components/TypingChartResult";
import useLiveDataContext from "./contextHooks/useLiveDataContext";
import useReplayDataContext from "./contextHooks/useReplayDataContext";
import useContainerAndFontContext from "./contextHooks/useContainerAndFontContext";
// import useCharacterDeleteHookV2 from "./customHooks/useCharacterDeleteHook2";

// import useSessionReplay from "./customHooks/useSessionReplay";




const TypingApp: React.FC = () => {
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ | states | ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \

  // the text sliced index where the text will be sliced from (the text starts from this index )
  const [textSliceStartIndex] = useState<number>(0);
  // current text state 15 words to be genrated at the first time (the text ends in this index)
  const [sessionWordsCount, setSessionWordsCount] = useState<number>(lazyLoadedSessionWordsCount);

  const [dynamicTextRange, setDynamicTextRange] = useState<number>(0); // the words count that can fit in the container raws

 
  // spaces tracker where the word left of before landing to next word
  // ----------------------------------------------------------------------
  // sound param (mute / activate)
  const [isNormalTypingSoundEnabled, setIsNormalTypingSoundEnabled] =
    useState<boolean>(lasySoundStoredState);
  const [isErrorSoundEnabled, setIsErrorSoundEnabled] = useState<boolean>(
    lasyErrorSoundStoredState
  );
  // game end controller state
  const [isTypingEnds, setIsTypingEnds] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  // chars that are worong and colored in red
  const [isWrongWord, setIsWrongWord] = useState<boolean>(false);
  // wrong chars is not preserving the chars its deletes them after jumping to next word
  const [trachWord, setTrachWord] = useState<string[]>([]);
  const [isTypingActive, setIsTypingActive] = useState<boolean>(false);


  const [isCapsOn, setIsCapsOn] = useState<boolean>(false);
  // select time fo session typing
  const [selectedTime, setSelectedTime] = useState<number>(lazyLoadedSelectedTime);
  // time elased or count down realstate
  const [elapsedTime, setElapsedTime] = useState<number>(lazyLoadedSelectedTime);
  // typign begin listener
  const [isTypingStarted, setIsTypingStarted] = useState(false);
  // typing mode (words | time )
  const [typingModeSelected, setTypingModeSelected] = useState<Mode>(lazyLoadedSelectedMode);
  // the amount of time the typing session took
  // const [amountOfTime,setAmountOfTime] = useState<number>();
  // words typed
  const [typedWordsAmount, setTypedWordsAmount] = useState<number>(0);
  // correct words final result
  // typing ends model togller
  const [isShowTypingOverModal, setIsShowTypingOverModal] =
    useState<boolean>(false);
  // wpm ref
  const [wpmFinal, setWpmFinal] = useState<number>(0);

  const [isFocuceOnText, setIsFocuceOnText] = useState<boolean>(false);
  //  first line shift toggler
  const [isShiftFirstLine, setIsShiftFirstLine] = useState<boolean>(false);

  //text conatiner width
  const [containerWidth, setContainerWidth] = useState<number>(0);
  
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ | end states | ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \

  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ | refs | ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \
  // line 3 data
  
  const line3YRef = useRef<{ top: number } | null>(null);
  // th epreviousline
  const prevLineRef = useRef<number>(0);

  const totalCorrectedCharsRef = useRef<number | null>(null);

  const hiddenInputRef = useRef<HTMLInputElement | null>(null);
  const amountOfTimeRef = useRef<number | null>(null);
  

  const startTypingTimeRef = useRef<number>(0);

  // words count of the chars in every first line 
  const firstRowLastIndexRef = useRef<number>(0)

  // did mount for skipping the initial effect render 

  const didMountsessionWordsCount = useRef(false); 
  const didMountSelectedTime= useRef(false); 

 // sessionRecord 
  const  sessionRecordRef = useRef<KeyRecord[]>([]) ;

  // previous index ref for replaying
  const previousIndexRef = useRef<number>(0) ;
  // storeed copy of words history for replaying
  const wordHistoryCopyRef = useRef<WordHistoryItem[]>([]) ; 
  // the text used to be paassedf to recordRender
  // theme state
  const { currentTheme } = useThemeHook();
  const {currentLetter , currentText , setCurrentText ,
    globalState 
  } = useLiveDataContext() ;
  // font size and container ref
  const { containerRef , fontSizeRef } = useContainerAndFontContext() ;
  // replay context data 
  const {isRecordActive , isRecordPanelOpen} =  useReplayDataContext();
  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ | end of refs | ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \

   useEffect(() => {
    if(!isRecordActive) return ;
    const letters = Array.from(document.querySelectorAll('.letter')) as HTMLElement[] ;
   
    sessionRecordRef.current.forEach((record) => {
      setTimeout(() => {
         const letter = letters[record.currentLetterIndex] ;
          if (record.isTyped && !record.isWrong ) {
            letter.style.color = currentTheme.white; // correct
          } else if (record.isWrong) {
            letter.style.color = currentTheme.red;   // wrong
          }
          else{
            letter.style.color = currentTheme.gray;   // wrong
          }
       
          if(record.isDelete){
            letter.style.color = currentTheme.gray;   // deleted
          }


          
          

      }, record.timestamp);
    });

   }, [isRecordActive]);
  ///////////////////////////////////
  

  useEffect(() => {
    if(previousIndexRef.current > currentLetter.index) {
         sessionRecordRef.current.push({
           isDelete: true ,
           isWrong: false,
           isTyped: false,
          timestamp: Date.now() - startTypingTimeRef.current,
          currentLetterIndex: currentLetter.index ,
        }
        );
      }
      previousIndexRef.current = currentLetter.index ;
  }, [currentLetter.index]);
  // get the coun of words in the first line to shift
useEffect(() => {
  if (!containerRef.current || !isShiftFirstLine) return;

  let wordsWidthAccum = 0;
  firstRowLastIndexRef.current = 0 ;
  const words = Array.from(containerRef.current.querySelectorAll(".word")) as HTMLElement[];
  const containerWidth = containerRef.current.getBoundingClientRect().width;

  for (let i = 0; i < words.length; i++) {
    const element = words[i];
    const elementWidth = element.getBoundingClientRect().width;
    const nextAccum = wordsWidthAccum + elementWidth;

    // If adding this word would exceed container width, stop
    if (nextAccum > containerWidth) break;

    // Add text length
    firstRowLastIndexRef.current += element.textContent?.length || 0;

    // Include margin to be more accurate
    const style = getComputedStyle(element);
    const marginRight = parseFloat(style.marginRight) || 0;
    wordsWidthAccum = nextAccum + marginRight;
  }
}, [isShiftFirstLine]);


 useEffect(() => {
  if(!isShiftFirstLine) {
    return ;
  }


  console.log('last index' , firstRowLastIndexRef.current)
  
  }, [isShiftFirstLine]);


  useEffect(() => {
    
     setCurrentText(sampleTexts[0].split(" ").slice(0, sessionWordsCount).join(" ")) 

  }, [sessionWordsCount]);


  // session's selected time and words count persistance
  usePersistantSelectedSessionParams({sessionWordsCount , selectedTime , didMountsessionWordsCount , didMountSelectedTime })

  
// coloring effect 
useColoringEffect({  
  currentTheme,
  containerRef,
  currentLetter,
  inputValue , 
  globalState
})



// ddetects onece we hit the line 3
 useLine3Listener({
  isShowTypingOverModal,
  containerRef,
  typedWordsAmount,
  prevLineRef,
  line3YRef,
  setIsShiftFirstLine,
  currentLetter ,
  containerWidth , 
  sessionWordsCount
});

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
  }, [isTypingStarted , selectedTime]);

  
  useEffect(() => {
    // Focus the hidden input on component mount
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [isFocuceOnText]);



  


  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++hooks++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \

  // store session typing data andtimestamps for relpay
 
  //  text raws to be rendered slicer
  useTextRawsSlicer({
    sessionWordsCount,
    line3YRef,
    containerWidth,
    containerRef,
    setCurrentText,
    textSliceStartIndex,
    dynamicTextRange,
    setDynamicTextRange,
  });



  // caps listener
  useCapsLockListener({ setIsCapsOn });

  const { nextText, handleReset } = useTypingControlleFunctions({
    sampleTexts,
    hiddenInputRef,
    setIsTypingEnds,
    setInputValue,
    setTypedWordsAmount,
    setIsShowTypingOverModal,
  });

  // hooks call
  // window resize
  useWindowResize({ containerRef, setContainerWidth });

  // ########################  wpm services and calculations reset ###########################
  // wpm calculations handlers
  useWpmCalculationHandler({
    setIsShowTypingOverModal,
    setWpmFinal,
    isTypingEnds,
    startTypingTimeRef,
    amountOfTimeRef,
    totalCorrectedCharsRef,
  });
  // wpm reset service
  useWpmServiceReset({
    wpmFinal,
    totalCorrectedCharsRef,
    amountOfTimeRef,
    startTypingTimeRef,
    setWpmFinal,
    setTypedWordsAmount,
    isTypingEnds,
  });
  // ########################  ###############  // ###########################

  // theme previewer
  useThemePreviewerAndSetter();
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
    setIsTypingEnds ,
    inputValue,
  });

  // typing watcher (typing active or not)
  useTypingWatcher({ setIsTypingActive, isFocuceOnText, setIsFocuceOnText });

  // index incriment controller
  useIndexIncrementer({
    inputValue,
    setInputValue,
    isWrongWord,
    setIsWrongWord,
  });

  // findes the wrong words
  useWrongWordsFinder({
    inputValue,
  });



  // text chars render function
  const renderedText = useMemo(
    () =>
      textRender({
        isRecordPanelOpen ,
        currentTheme,
        currentText,
        currentLetter,
        inputValue,
        isWrongWord,
        trachWord,
        globalState ,
        isTypingActive,
        firstRowLastIndexRef , 
      }),
    [currentText, currentTheme , trachWord  , globalState.wordHistory ,globalState.wrongWords , containerWidth , isShiftFirstLine ] // only rebuild when text or theme changes
  );

  // delete click handler
  const handleDeleteChar = useCharacterDeleteHook({
    trachWord,
    setTrachWord,
    setTypedWordsAmount,
  });



  // audio player
  // regular typing sound
  useTypingSound({ allowedKeys, isNormalTypingSoundEnabled });
  //error sound
  useErrorTypingSound({
    inputValue,
    isErrorSoundEnabled,
  });

  // typing  watcher
  useTypingEnd({setIsTypingEnds });

  useControlleBoundery({
    hiddenInputRef,
    setIsWrongWord,
    setInputValue,
    trachWord,
    setTrachWord,
  });


  


  // +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ end of hooks +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++  \
  if(isShowTypingOverModal) return   <TypingChartResult    
                                                            wordHistoryCopyRef={wordHistoryCopyRef}
                                                            wpmFinal={wpmFinal}
                                                            nextText={nextText}
                                                            handleReset={handleReset}
                                                            
                                                        />
  


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
      style={{ background: currentTheme.page_bg }}
    >
      {/* Main Content */}
      <main className="flex-1  flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pb-20 ">
        {/* inform for caps on case  */}
        {isCapsOn && <CapsOnModel />}
        {/* cntrolls  */}

        {/* Text Display */}
        <div className="w-full max-w-screen mx-auto mt-[100px]  ">
          {/* chow controlls only if we dont type any more line 1000 no keydown */}

          {!isFocuceOnText && (
            <section className="opacity-0 animate-appear-smooth  ">
              <TypingBoardControls 

                sessionWordsCount={sessionWordsCount}
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
            </section>
          )}

          <div
            className={`
            w-[80%] 
            text-lg sm:text-lg lg:text-2xl leading-relaxed sm:leading-relaxed lg:leading-relaxed
            font-mono text-center py-2 sm:py-2 lg:py-2  px-8 sm:px-8 lg:px-8 rounded-2xl
 
            `}

          style={{  

                position : 'absolute',
                top:'200px' , 
                left: '50%' ,
                transform: 'translateX(-50%)',
                backgroundColor: currentTheme.buttonPrimary + "0D", // 10% opacity = 1A in hex
                border: "2px solid " + currentTheme.buttonPrimary + "2D", // 30% opacity = 4D
              
              
              }}
          >
            {/* // words counter  */}
            {isFocuceOnText && typingModeSelected === "time" ? (
              <div
                className={`px-4 py-2 rounded-lg text-white font-bold shadow-md cursor-default select-none text-center w-[4em] `}
                style={{
                  background: isTypingStarted
                    ? elapsedTime < 10
                      ? "#ef4444"
                      : elapsedTime < 15
                      ? "#f97316"
                      : "#16a34a"
                    : currentTheme.buttonPrimary,
                }}
              >
                {typingModeSelected === "time" && elapsedTime}
              </div>
            ) : (
                <div
                  className={`px-4 py-2 rounded-lg text-white font-bold  cursor-default select-none  text-center w-[4em]   right-4`}
                  style={{ color: currentTheme.buttonSecondary  , 
                            // border: `1px solid ${currentTheme.buttonSecondary}`,
                            position: 'absolute',
                            top: '0px',
                            left : '0px',
                            transform: 'translateY(-100%)'


                  }}
                >
                  {/*  (currentText.split(' ').length - 1)  i used lenth -1 cuz we an extra char at the end empty space cuz of the space we add in the ext */}
                  {isFocuceOnText &&
                    typingModeSelected === "words" &&
                    typedWordsAmount + "/" + sessionWordsCount}
                </div>
            )}

            <div
              className="mx-w-full hitespace-normal break-words break-keep h-[200px]  "

              ref={containerRef}
              style={{
                textAlign: "start",
                fontSize: `${fontSizeRef.current}px`,
                overflowY: "hidden",
                
              }}
            >
              {/* // text render */}
              {renderedText}
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
            recordKeyStroke({inputKey:value, currentText , sessionRecordRef, startTypingTimeRef, currentLetter});
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
        <div className="flex items-center justify-center mt-8 space-x-4 " 
         style={{ position: 'absolute'  , top : '400px'}}
         >
          {!isFocuceOnText && (
            <section className="opacity-0 animate-appear-smooth flex gap-3">
              <Reseter
                isBlured={currentLetter.index === 0 ? true : false}
                currentTheme={currentTheme}
                handleReset={handleReset}
              />
    
            </section>
          )}
        </div>


        {/* Stats Placeholder */}
        {/* <div style={{ position: 'absolute'  , top : '500px'}}>

        {!isFocuceOnText && (
          <States wpmFinal={wpmFinal} currentTheme={currentTheme} />
        )}

        </div> */}

      </main>

      {/* Footer */}
      <footer style={{ position: 'absolute'  , bottom : '10%' , width: '100%'}}>

      <Footer />
      </footer>
    </div>
  );
};

export default TypingApp;
