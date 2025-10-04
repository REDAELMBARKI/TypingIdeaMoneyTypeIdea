import { useEffect } from "react";
import type { WordHistoryItem } from "../types/experementTyping";

interface correctTypedCharsCounterProps {
  isTypingEnds:boolean ;
  wordHistory:WordHistoryItem[] ;
  wrongChars: number[] ;
  currentText: string ;
  setTotalCorrectedChars: React.Dispatch<React.SetStateAction<number | undefined>>
}

const useCorrectTypedCharsCounter = ({
  isTypingEnds,
  wordHistory,
  wrongChars,
  currentText,
  setTotalCorrectedChars,
}: correctTypedCharsCounterProps) => {
useEffect(()=>{
      const  skippedCharsCount =  wordHistory.reduce((wrongCharsTotal , wH) => {
           
           for(let i = wH.lastTypedIndex ; i <= wH.end ; i++) ++wrongCharsTotal

           return wrongCharsTotal ;
      } , 0)
      
      // total wring chars in wrongchars the red chars and those are skipped 
      const totallWrongChars = skippedCharsCount + wrongChars.length ;
      const  originalTextCharsAmount:number = currentText.replaceAll(" " , '').split('').length;
     const correctCharsTotal = Math.max(originalTextCharsAmount - totallWrongChars , 0)
      setTotalCorrectedChars(correctCharsTotal);
  },[isTypingEnds])
};

export default useCorrectTypedCharsCounter;
