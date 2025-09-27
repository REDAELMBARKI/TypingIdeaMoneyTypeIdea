import type { currentLetterType } from "../types/maintyping";

import { useEffect } from "react";
// Import just the function
// import isEqual from 'lodash/isEqual';

interface wrongWordsProps {
        currentText: string;
        currentLetter: currentLetterType;
        setWrongWords: React.Dispatch<React.SetStateAction<{ start: number;end: number;}[]>> ;
       wrongChars: number[];
       inputValue : string ;
       wrongWords : { start: number;end: number;}[] ;

}




export const useWrongWordsFinder = ({currentLetter , currentText , setWrongWords , wrongChars , inputValue}:wrongWordsProps) =>{

      useEffect(()=>{

        if(currentText[currentLetter.index] !== ' ') return ;
        // here now we are in the end of a word and the previous wordd has error 
        // lets only add the word to the wrong words if space clicked 
        
        const asignPreviousWordAsWrong = (e:KeyboardEvent) => {
          
          if(e.key !== ' ' ) return ;
          


          //  we get the last index of the char of the previous word with currentLetter.index - 1
          //  we search for the first char index of the word after space 
           let wordFirstIndex:number = currentLetter.index - 1;
           let i:number = currentLetter.index - 1 ;
           while(currentText[i] !== ' ' && i >= 0 ){
             wordFirstIndex = i ;
            i-- ;
           }
       
            // check if the word range first index letter - last index letter is in wrongchars array
            const isInWrongChars = wrongChars.some(el_index =>  el_index >= wordFirstIndex && el_index <= currentLetter.index - 1 )
         
          
            if (isInWrongChars) {
                setWrongWords((prev) => [
                  ...prev,
                  { start: wordFirstIndex, end: currentLetter.index - 1 }
                ]);  
             }
        }

        window.addEventListener('keydown' , asignPreviousWordAsWrong)
    
    
        return () => window.removeEventListener('keydown' , asignPreviousWordAsWrong)
      },[wrongChars,inputValue , currentLetter.index])




}


