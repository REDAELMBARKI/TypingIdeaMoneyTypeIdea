import type { WordHistoryItem } from "../types/experementTyping";

interface correctTypedCharsCounterProps {
  wordHistory:WordHistoryItem[] ;
  wrongChars: number[] ;
  currentText: string ;
  totalCorrectedCharsRef: React.RefObject<number | null>
}

const correctTypedCharsCounterHandler = ({
  wordHistory,
  wrongChars,
  currentText,
  totalCorrectedCharsRef,
}: correctTypedCharsCounterProps) => {

      const  skippedCharsCount =  wordHistory.reduce((wrongCharsTotal , wH) => {
           
           for(let i = wH.lastTypedIndex ; i <= wH.end ; i++) ++wrongCharsTotal

           return wrongCharsTotal ;
      } , 0)
      
      // total wring chars in wrongchars the red chars and those are skipped 
      const totallWrongChars = skippedCharsCount + wrongChars.length ;
      const  originalTextCharsAmount:number = currentText.replaceAll(" " , '').split('').length;
      const correctCharsTotal = Math.max(originalTextCharsAmount - totallWrongChars , 0)
      
      totalCorrectedCharsRef.current = correctCharsTotal;
};

export default correctTypedCharsCounterHandler;
