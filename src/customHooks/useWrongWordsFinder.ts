import type { currentLetterType } from "../types/maintyping";

import { useEffect } from "react";


interface wrongWordsProps {
        currentText: string;
        currentLetter: currentLetterType;
        setWrongWords: React.Dispatch<React.SetStateAction<{ start: number;end: number;}[]>> ;
       wrongChars: number[];
       inputValue : string ;

}

export const useWrongWordsFinder = ({currentLetter , currentText , setWrongWords , wrongChars , inputValue}:wrongWordsProps) =>{
      useEffect(()=>{

        if(currentText[currentLetter.index ] !== ' ') return ;
        // here now we are in the end of a word and the previous wordd has error 
        // lets only add the word to the wrong words if space clicked 
      
        const asignPreviousWordAsWrong = (e:KeyboardEvent) => {
          if(e.key !== ' ') return ;
          //  we get the last index of the char of the previous word with currentLetter.index - 1
          //  we search for the first char index of the word after space 
           let wordFirstIndex:number;
           let i:number = currentLetter.index - 1 ;
           while(currentText[i] !== ' ' && i >= 0 ){
             wordFirstIndex = i ;
            i-- ;
           }
           // we splice the word starting from first index till currentLetter.index since slice exclude the last the last number we put currentLetter.index istead of currentLetter.index - 1
           console.log('storing obj')
           setWrongWords(prev => [...prev , {start: wordFirstIndex, end : currentLetter.index - 1}])
    
        }
        window.addEventListener('keydown' , asignPreviousWordAsWrong)
    
    
        return () => window.removeEventListener('keydown' , asignPreviousWordAsWrong)
      },[wrongChars,inputValue])




}