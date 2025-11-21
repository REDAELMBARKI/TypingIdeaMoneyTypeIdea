import React, { useEffect, useRef, useState } from "react";
import {
  Timer,
  Hash,
  SquareAsteriskIcon,
  CaseSensitive,
  TextInitial,
  Volume2,
  XCircle,
  Quote,
} from "lucide-react";
import { parametersTypes, type Mode, type ThemeColors } from "../types/experementTyping";
import ButtonExtraOption from "./ButtonExtraOption";
import { isEqual } from "lodash";
import useThemeHook from "../customHooks/useThemeHook";
import { lazyLoadedSoundSettings } from "../functions/lazyLoadedSessionData";
import { useTextTransformer } from "../functions/textTransform";
import { useTypingSessionStateContext } from "../contextHooks/useTypingSessionStateContext";
import useLiveDataContext from "../contextHooks/useLiveDataContext";


interface TypingBoardControlsProps {
  setSelectedTime:React.Dispatch<React.SetStateAction<number>>;
  isTypingStarted:boolean ;
  typingModeSelected :  Mode ;
 setTypingModeSelected: React.Dispatch<React.SetStateAction<Mode>>
 currentTheme : ThemeColors ;
 setSessionWordsCount : React.Dispatch<React.SetStateAction<number>>

  setIsErrorSoundEnabled : React.Dispatch<React.SetStateAction<boolean>>
  setIsNormalTypingSoundEnabled : React.Dispatch<React.SetStateAction<boolean>> 
   selectedTime:number ;
}


export default function TypingBoardControls({setSessionWordsCount , setIsNormalTypingSoundEnabled , setIsErrorSoundEnabled  , currentTheme ,setTypingModeSelected,typingModeSelected  ,selectedTime , setSelectedTime}:TypingBoardControlsProps) {
  
  const [showTimes, setShowTimes] = useState(false);
  const [showWords,setShowWords] =  useState(false);
  const {addNumbersToText , removeNumbersFromText , 
       addPunctuationToText , removePunctuationFromText , 
       addQuotesToText , removeQuotesFromText
  } = useTextTransformer()
  const {sessionWordsCount , selectedParameters , setSelectedParameters} = useTypingSessionStateContext()
  
  const previousSelectedParametersRef = useRef<string[] | null >(null);
  const [soundSettings , setSoundSettings] = useState<string[]>(lazyLoadedSoundSettings) ;
  const timesOpt = [30, 60, 120];
  const wordsOpt= [10,20,30,50];
  const {setCurrentText , baseText} =  useLiveDataContext()
  const optionsList = typingModeSelected == "time" ? timesOpt : wordsOpt ;

  const  handleParamOption = (paramType:string) => {
           previousSelectedParametersRef.current =  selectedParameters ;
           if(selectedParameters.includes(paramType)){
              setSelectedParameters(selectedParameters.filter(param => param !== paramType))
              return ;
           }
          setSelectedParameters([...selectedParameters , paramType.toLowerCase()]) 
      } 


   const  handleSoundSettingOption = (soundSet:string) => {
          
           if(soundSettings.includes(soundSet)){
              setSoundSettings(soundSettings.filter(soundOp => soundOp !== soundSet))
              return ;
           }
          setSoundSettings([...soundSettings , soundSet.toLowerCase()]) 
      } 
 

      useEffect(() => { 
      const   oldStoredParams : string[] =  JSON.parse(localStorage.getItem('parameters') ?? `[]`) ; 
      
      if(! isEqual(oldStoredParams ,  selectedParameters)) {
    
        localStorage.setItem('parameters' , JSON.stringify(selectedParameters)) ; 
      }
     
      }, [selectedParameters]); 
    
    
  
     useEffect(() => { 
      const   oldSoundSettings: string[] =  JSON.parse(localStorage.getItem('soundSettings') ?? `[]`) ; 
      
      if(! isEqual(oldSoundSettings ,  soundSettings)) {
    
        localStorage.setItem('soundSettings' , JSON.stringify(soundSettings)) ; 
      }
     
      }, [soundSettings]); 


    

    useEffect(() => {
        const oldTypingModeSelected : string = JSON.parse(localStorage.getItem('selectedMode') ?? '""') ;
        
        if(!isEqual(oldTypingModeSelected , typingModeSelected)) {
            localStorage.setItem('selectedMode' , JSON.stringify(typingModeSelected)) ; 
        }
    }, [typingModeSelected]);

 
    
    const NSoundHandler = () => setIsNormalTypingSoundEnabled(prev => !prev)  ; 
    const ErrSoundHandler = ()=> setIsErrorSoundEnabled(prev => !prev)  ; 
    
  useEffect(() => {

      setCurrentText(prevTxt => {
                  let updatedText = prevTxt ;
                  const newParamsTodd =  selectedParameters.filter(param => !previousSelectedParametersRef.current?.includes(param))
                  const oldParamsToremove =  previousSelectedParametersRef.current?.filter(param => !selectedParameters.includes(param))
                  
  

                  if(newParamsTodd.includes(parametersTypes.numbers)){
                    updatedText = addNumbersToText(updatedText)  
                  }
                  if(newParamsTodd.includes(parametersTypes.quotes)){
                        updatedText = addQuotesToText(updatedText)
                  }
                  if(newParamsTodd.includes(parametersTypes.punctuation)){
                         updatedText =  addPunctuationToText(updatedText)
                  }




                  if(oldParamsToremove?.includes(parametersTypes.numbers)) {
                       updatedText =  removeNumbersFromText(updatedText)
                  }
            
                  if(oldParamsToremove?.includes(parametersTypes.quotes)) {
                       updatedText =  removeQuotesFromText(updatedText)
                  }


                  if(oldParamsToremove?.includes(parametersTypes.punctuation)) {
                       updatedText =  removePunctuationFromText(updatedText)
                  }

                 
                

                  return updatedText ;
             
           }) 

           previousSelectedParametersRef.current = [...selectedParameters];

}, [selectedParameters , baseText]); 

  return (
    <div className="w-full relative flex items-center justify-center gap-6 px-4 py-2 ">

{/* Elapsed Time */}
     
    
      {/* Time Selector + Expanding Times // timer counter separate level */} 
        <button
          onClick={() => {
            if(showWords) setShowWords(false) ;
            setShowTimes(!showTimes)
            setTypingModeSelected('time')
          }}
          className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700 cursor-pointer"
        >
          <Timer size={22} style={{color:typingModeSelected == "time" ? currentTheme.buttonHover : currentTheme.white}}   />
          <span className="text-xs  leading-none" style={{color:typingModeSelected == "time" ? currentTheme.buttonHover : currentTheme.white}} >{selectedTime}</span>
        </button>
   
    
      
  
       <ButtonExtraOption
           action={()=> { 
                      if(showTimes) setShowTimes(false) ;
                      setTypingModeSelected('words') 
                      setShowWords(!showWords)
                    }}

           style={{background: typingModeSelected == "words" ? currentTheme.buttonPrimary :  '', color: '!important black' }} 
           label="Words" Icon={TextInitial} currentTheme={currentTheme} />
     

      {/* separator */}
      <div className="bg-gray-500 w-[6px] h-[20px] rounded-lg"></div >
      {/* exapan options */}


      
      {/* Other Functional Buttons // these are on the seconds level option or extra options  */}
      <div className="flex items-center gap-5 ml-2">
          <ButtonExtraOption  selectedParameters={selectedParameters}  handleParamOption={handleParamOption}  label={parametersTypes.numbers} Icon={Hash} currentTheme={currentTheme} />
          <ButtonExtraOption  selectedParameters={selectedParameters}  handleParamOption={handleParamOption}  label={parametersTypes.quotes} Icon={Quote} currentTheme={currentTheme} />
          <ButtonExtraOption  selectedParameters={selectedParameters}  handleParamOption={handleParamOption}  label={parametersTypes.symbols} Icon={SquareAsteriskIcon} currentTheme={currentTheme} />
          <ButtonExtraOption selectedParameters={selectedParameters}  handleParamOption={handleParamOption}   label={parametersTypes.punctuation} Icon={CaseSensitive} currentTheme={currentTheme} />

          {/* // sound buttons activation */}
          {/* normal sound */}
          <ButtonExtraOption  soundSettings={soundSettings} handleSoundSettingOption={handleSoundSettingOption} action={NSoundHandler} label={parametersTypes.sound} Icon={Volume2} currentTheme={currentTheme} />
          {/* erro sound */}
          <ButtonExtraOption soundSettings={soundSettings} handleSoundSettingOption={handleSoundSettingOption} action={ErrSoundHandler} label={parametersTypes.errorSound} Icon={XCircle} currentTheme={currentTheme} />
          
      </div>
     

        {/* this one is options that belongs to typing mode selected i neeed to forth level */}
      <div>

        {
          typingModeSelected == 'time' ? 
           <ExpandedTimesOptionsList  selectedTime={selectedTime}  optionsList={optionsList} showTimes={showTimes} setSelectedTime={setSelectedTime}  setShowTimes={setShowTimes}  /> 
           : <ExpandedWordsCountOptionsList  sessionWordsCount={sessionWordsCount} optionsList={optionsList}  showWords={showWords} setShowWords={setShowWords} setSessionWordsCount={setSessionWordsCount}  />
        }
        
      </div>
    </div>
  );
}



interface expandedTimesOptionsProps {
  showTimes : boolean ;
  setSelectedTime:React.Dispatch<React.SetStateAction<number>>;
  setShowTimes: React.Dispatch<React.SetStateAction<boolean>> ;
  optionsList : number[];
  selectedTime : number ;
 
}


const ExpandedTimesOptionsList = ({selectedTime , showTimes , setSelectedTime , setShowTimes , optionsList}:expandedTimesOptionsProps) => {
  const {currentTheme} = useThemeHook();
  return (
     <div
          className={`flex items-center gap-3 overflow-hidden transition-all duration-500  
            optionFade
            ${showTimes  ? "w-72 opacity-100" : "w-0 opacity-0" }`}
            
        >
           {/* separator */}
      <div className="bg-gray-500 w-[6px] h-[20px] rounded-lg"></div >
      {/* exapan options */}
     
          {optionsList.map((option,ind) => (
            <button
              key={ind}
              onClick={() => {

                setSelectedTime(option);
                setShowTimes(false);
                
              }}
              style={selectedTime === option ? {color : currentTheme.buttonHover} : {}}
              className="flex items-center gap-2 text-xs   hover:text-slate-700 transition cursor-pointer"
            >
              <span>{option}</span>
            </button>
          ))}
        </div>
  )
}




interface expandedWordsCountOptionsProps {
   showWords:boolean ;
   setShowWords: React.Dispatch<React.SetStateAction<boolean>>
   optionsList : number[];
   setSessionWordsCount : React.Dispatch<React.SetStateAction<number>>
   sessionWordsCount : number ;
}
const ExpandedWordsCountOptionsList = ({sessionWordsCount,optionsList , showWords , setShowWords , setSessionWordsCount}:expandedWordsCountOptionsProps) => {
  const {currentTheme} = useThemeHook();
  return (
     <div
          className={`flex items-center gap-3 overflow-hidden transition-all duration-500 optionFade
            ${showWords  ? "w-72 opacity-100" : "w-0 opacity-0" }`}
            
        >
           {/* separator */}
      <div className="bg-gray-500 w-[6px] h-[20px] rounded-lg"></div >
      {/* exapan options */}
     
          {optionsList.map((option,ind) => (
             
            <button
              key={ind}
              onClick={() => {
                setSessionWordsCount(option);
                setShowWords(false);
                
              }}
              style={sessionWordsCount === option ? {color : currentTheme.buttonHover} : {}}
              className="flex items-center gap-2 text-xs   hover:text-slate-700 transition cursor-pointer"
            >
              <span>{option}</span>
            </button>
          ))}
        </div>
  )
}

