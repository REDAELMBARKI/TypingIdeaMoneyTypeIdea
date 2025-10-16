import React, { useState } from "react";
import {
  Timer,
  
  AlignLeft,
  Clock,
  Hash,
  SquareAsteriskIcon,
  ShuffleIcon,
  AtSign,
} from "lucide-react";
import type { Mode, ThemeColors } from "../types/experementTyping";
import ButtonExtraOption from "./ButtonExtraOption";


interface TypingBoardControlsProps {
 selectedTime:number ;
 setSelectedTime:React.Dispatch<React.SetStateAction<number>>;
 elapsedTime: number ;
 isTypingStarted:boolean ;
 currentText : string ; 
 typedWordsAmount : number ;
 typingModeSelected :  Mode ;
 setTypingModeSelected: React.Dispatch<React.SetStateAction<Mode>>
  currentTheme : ThemeColors ;
}

interface expandedoptionsListProps {
  showTimes : boolean ;
  setSelectedTime:React.Dispatch<React.SetStateAction<number>>;
  setShowTimes: React.Dispatch<React.SetStateAction<boolean>> ;
  optionsList : number[];
  typingModeSelected : Mode ;
  showWordsFadeAnimat:boolean ;
 
}


export default function TypingBoardControls({currentTheme ,setTypingModeSelected,typingModeSelected , currentText , typedWordsAmount ,selectedTime , setSelectedTime , elapsedTime , isTypingStarted}:TypingBoardControlsProps) {
  
  const [showTimes, setShowTimes] = useState(false);
  const [showWordsFadeAnimat,setShowWordsFadeAnimat] =  useState(false);
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
                        {typingModeSelected === 'words' && typedWordsAmount + "/" + (currentText.split(' ').length - 1)}  
                      
                      </div>
      }
          
      {/* Time Selector + Expanding Times // timer counter separate level */} 
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
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
      onClick={()=> { setTypingModeSelected('words') 
                      setShowWordsFadeAnimat(!showWordsFadeAnimat)
                    }}
      >
        <AlignLeft size={22} style={{color: typingModeSelected == "words" ? currentTheme.buttonHover : currentTheme.white }}  />
        <span className="text-xs " style={{color: typingModeSelected == "words" ? currentTheme.buttonHover : currentTheme.white }} >Words</span>
      </button>


      {/* separator */}
      <div className="bg-gray-500 w-[6px] h-[20px] rounded-lg"></div >
      {/* exapan options */}


      
      {/* Other Functional Buttons // these are on the seconds level option or extra options  */}
      <div className="flex items-center gap-5 ml-2">
          <ButtonExtraOption handleParamOption={handleParamOption} label="Numbers" Icon={Hash} currentTheme={currentTheme} />
          <ButtonExtraOption handleParamOption={handleParamOption}  label="Symbols" Icon={SquareAsteriskIcon} currentTheme={currentTheme} />
          <ButtonExtraOption handleParamOption={handleParamOption}  label="Punctuation" Icon={AtSign} currentTheme={currentTheme} />
        

      </div>
      {/* separator */}
      <div className="bg-gray-500 w-[6px] h-[20px] rounded-lg"></div >
      {/* exapan options */}
     
     {/* thith level has actions and labeled as actions  like to shuufle the texts */}
      <div>
       <ButtonExtraOption handleParamOption={handleParamOption}  label="Shuffle" Icon={ShuffleIcon} currentTheme={currentTheme} />
      </div>

       
      <div>
        {/* this one is options that belongs to typing mode selected i neeed to forth level */}
        <ExpandedoptionsList typingModeSelected={typingModeSelected} optionsList={optionsList} showTimes={showTimes} setSelectedTime={setSelectedTime}  setShowTimes={setShowTimes} showWordsFadeAnimat={showWordsFadeAnimat} />
      </div>
    </div>
  );
}



const ExpandedoptionsList = ({showTimes , setSelectedTime , setShowTimes , optionsList , typingModeSelected , showWordsFadeAnimat}:expandedoptionsListProps) => {

  const isShowTime = showWordsFadeAnimat || showTimes ;
  return (
     <div
          className={`flex items-center gap-3 overflow-hidden transition-all duration-500 
            ${isShowTime  ? "w-72 opacity-100" : "w-0 opacity-0" }`}
            
        >
          {optionsList.map((option,ind) => (
            <button
              key={ind}
              onClick={() => {
                setSelectedTime(option);
                setShowTimes(false);
              }}
              className="flex items-center gap-2 text-xs   hover:text-slate-700 transition"
            >
              {typingModeSelected == 'time' &&  <Clock size={18} className="text-slate-700" />}
              <span>{option}{typingModeSelected == 'time' ? 's' : 'w'}</span>
            </button>
          ))}
        </div>
  )
}