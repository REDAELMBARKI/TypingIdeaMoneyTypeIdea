import { useEffect } from "react";
import correctTypedCharsCounterHandler from "../functions/correctTypedCharsCounterHandler";
import { timeAmountCountHandler } from "../functions/timeAmountCountHandler";
import type { globalStatetype } from "../types/experementTyping";



interface wpmCalculattionHandlerProps {
    isTypingEnds : boolean ;
    setWpmFinal: React.Dispatch<React.SetStateAction<number>>;
    setIsShowTypingOverModal: React.Dispatch<React.SetStateAction<boolean>>;
    currentText: string;
    totalCorrectedCharsRef: React.RefObject<number | null>;
    amountOfTimeRef: React.RefObject<number | null>;
    startTypingTimeRef: React.RefObject<number>;
    globalState: globalStatetype

}

const useWpmCalculationHandler = ({setIsShowTypingOverModal , setWpmFinal , isTypingEnds,startTypingTimeRef,amountOfTimeRef ,globalState,  currentText , totalCorrectedCharsRef }:wpmCalculattionHandlerProps)  => {
      
        const  { wordHistory , wrongChars } = globalState ;
        // wpm Calculations 
        useEffect(()=>{
          if(!isTypingEnds ) return ;
      
          setTimeout(() => {
              // totall characters typed correctly 
              correctTypedCharsCounterHandler({  
              wordHistory,
              wrongChars,
              currentText,
              totalCorrectedCharsRef})
      
              // time amount 
              timeAmountCountHandler({startTypingTimeRef , amountOfTimeRef});
          
              if (amountOfTimeRef.current != null && amountOfTimeRef.current < 0.05) { 
                console.warn("Session too short, skipping WPM calculation");
                return;
              }
      
              const finalWpm = (totalCorrectedCharsRef.current! / 5)  / (amountOfTimeRef.current!)
              setWpmFinal(Math.floor(finalWpm));
              // alert( )
      
              
               setIsShowTypingOverModal(true);
           }, 100);
        },[isTypingEnds])
}


export default useWpmCalculationHandler ;