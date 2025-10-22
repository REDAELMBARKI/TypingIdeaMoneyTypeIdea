import React, { useEffect, useState } from "react";
import {
  Timer,
  
  Clock,
  Hash,
  SquareAsteriskIcon,
  CaseSensitive,
  TextInitial,
  ChartBar,
} from "lucide-react";
import type { Mode, ThemeColors } from "../types/experementTyping";
import ButtonExtraOption from "./ButtonExtraOption";
import { isEqual } from "lodash";


interface TypingBoardControlsProps {
 selectedTime:number ;
 setSelectedTime:React.Dispatch<React.SetStateAction<number>>;
 elapsedTime: number ;
 isTypingStarted:boolean ;
 typedWordsAmount : number ;
 typingModeSelected :  Mode ;
 setTypingModeSelected: React.Dispatch<React.SetStateAction<Mode>>
  currentTheme : ThemeColors ;
  setSessionWordsCount : React.Dispatch<React.SetStateAction<number>>
  sessionWordsCount : number
  setIsErrorSoundEnabled : React.Dispatch<React.SetStateAction<boolean>>
  setIsNormalTypingSoundEnabled : React.Dispatch<React.SetStateAction<boolean>>
}

export default function TypingBoardControls({setSessionWordsCount , setIsNormalTypingSoundEnabled , setIsErrorSoundEnabled , sessionWordsCount , currentTheme ,setTypingModeSelected,typingModeSelected , typedWordsAmount ,selectedTime , setSelectedTime , elapsedTime , isTypingStarted}:TypingBoardControlsProps) {
  
  const [showTimes, setShowTimes] = useState(false);
  const [showWords,setShowWords] =  useState(false);
  const [selectedParametres , setSelectedParametres] = useState<string[]>([]) ;
  const timesOpt = [30, 60, 120];
  const wordsOpt= [10,20,30,50];
  
  const optionsList = typingModeSelected == "time" ? timesOpt : wordsOpt ;
  const  handleParamOption = (paramType:string) => {
          
           if(selectedParametres.includes(paramType)){
              setSelectedParametres(selectedParametres.filter(param => param !== paramType))
              return ;
           }
            setSelectedParametres([...selectedParametres , paramType]) 
      }


  useEffect(() => {
      const oldStoredParams = 
      localStorage.setItem('parametres' , JSON.stringify(selectedParametres)) ;
  }, [selectedParametres]);
  

  return (
    <div className="w-full relative flex items-center justify-center gap-6 px-4 py-2 ">

{/* Elapsed Time */}
     
      {typingModeSelected === 'time' ?
                        <div className={`px-4 py-2 rounded-lg text-white font-bold shadow-md cursor-default select-none text-center w-[4em] `}
                        style={{
                           background : isTypingStarted ? ( elapsedTime < 10 ? '#ef4444' : elapsedTime < 15 ? '#f97316' : '#16a34a' ) : currentTheme.buttonPrimary
                        }}          
                        
                        >
                           
                          {typingModeSelected === 'time' && elapsedTime}
                        
                        </div>

                        :
                      <div className={`px-4 py-2 rounded-lg text-white font-bold shadow-md cursor-default select-none  text-center w-[4em]`}
                        style={{background : currentTheme.buttonSecondary , color:currentTheme.buttonHover}}
                       >
                        
                        {/*  (currentText.split(' ').length - 1)  i used lenth -1 cuz we an extra char at the end empty space cuz of the space we add in the ext */}
                        {typingModeSelected === 'words' && typedWordsAmount + "/" + sessionWordsCount}  
                      
                      </div>
      }
          
      {/* Time Selector + Expanding Times // timer counter separate level */} 
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            if(showWords) setShowWords(false) ;
            setShowTimes(!showTimes)
            setTypingModeSelected('time')
          }}
          className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700"
        >
          <Timer size={22} style={{color:typingModeSelected == "time" ? currentTheme.buttonHover : currentTheme.white}}   />
          <span className="text-xs  leading-none" style={{color:typingModeSelected == "time" ? currentTheme.buttonHover : currentTheme.white}} >{selectedTime}</span>
        </button>
   
      </div>
      
      {/* Words Mode (new button) first level has top label of typing mods */}
      <button className="flex items-center gap-2 text-sm hover:scale-110 transition text-slate-700"
      onClick={()=> { 
                      if(showTimes) setShowTimes(false) ;
                      setTypingModeSelected('words') 
                      setShowWords(!showWords)
                    }}
      >
        <TextInitial size={22} style={{color: typingModeSelected == "words" ? currentTheme.buttonHover : currentTheme.white }}  />
        <span className="text-xs " style={{color: typingModeSelected == "words" ? currentTheme.buttonHover : currentTheme.white }} >Words</span>
      </button>


      {/* separator */}
      <div className="bg-gray-500 w-[6px] h-[20px] rounded-lg"></div >
      {/* exapan options */}


      
      {/* Other Functional Buttons // these are on the seconds level option or extra options  */}
      <div className="flex items-center gap-5 ml-2">
          <ButtonExtraOption handleParamOption={handleParamOption} label="Numbers" Icon={Hash} currentTheme={currentTheme} />
          <ButtonExtraOption handleParamOption={handleParamOption}  label="Symbols" Icon={SquareAsteriskIcon} currentTheme={currentTheme} />
          <ButtonExtraOption handleParamOption={handleParamOption}  label="Punctuation" Icon={CaseSensitive} currentTheme={currentTheme} />

          {/* // sound buttons activation */}
          {/* normal sound */}
          <ButtonExtraOption action={()=> setIsNormalTypingSoundEnabled(prev => !prev)}  Icon={CaseSensitive} currentTheme={currentTheme} />
          {/* erro sound */}
          <ButtonExtraOption action={()=> setIsErrorSoundEnabled(prev => !prev)}  Icon={CaseSensitive} currentTheme={currentTheme} />
          
      </div>
     
     {/* thith level has actions and labeled as actions  like to shuufle the texts */}
      {/* <div>
       <ButtonExtraOption handleParamOption={handleParamOption}  label="Shuffle" Icon={ShuffleIcon} currentTheme={currentTheme} />
      </div> */}

       
        {/* this one is options that belongs to typing mode selected i neeed to forth level */}
      <div>

        {
          typingModeSelected == 'time' ? 
           <ExpandedTimesOptionsList  optionsList={optionsList} showTimes={showTimes} setSelectedTime={setSelectedTime}  setShowTimes={setShowTimes}  /> 
           : <ExpandedWordsCountOptionsList  optionsList={optionsList}  showWords={showWords} setShowWords={setShowWords} setSessionWordsCount={setSessionWordsCount}  />
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


}


const ExpandedTimesOptionsList = ({showTimes , setSelectedTime , setShowTimes , optionsList}:expandedTimesOptionsProps) => {

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
              className="flex items-center gap-2 text-xs   hover:text-slate-700 transition"
            >
              <Clock size={18} className="text-slate-700" />
              <span>{option}s</span>
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

}
const ExpandedWordsCountOptionsList = ({optionsList , showWords , setShowWords , setSessionWordsCount}:expandedWordsCountOptionsProps) => {

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
              className="flex items-center gap-2 text-xs   hover:text-slate-700 transition"
            >
              <ChartBar size={18} className="text-slate-700" />
              <span>{option}s</span>
            </button>
          ))}
        </div>
  )
}

