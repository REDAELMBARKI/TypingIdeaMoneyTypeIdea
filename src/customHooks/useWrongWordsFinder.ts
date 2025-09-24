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
        console.log('current index ' , currentText[currentLetter.index] )
        if(currentText[currentLetter.index] !== ' ') return ;
        // here now we are in the end of a word and the previous wordd has error 
        // lets only add the word to the wrong words if space clicked 
        
        const asignPreviousWordAsWrong = (e:KeyboardEvent) => {
          console.log("here i m")
          
          if(e.key !== ' ') return ;
          

          //  we get the last index of the char of the previous word with currentLetter.index - 1
          //  we search for the first char index of the word after space 
           let wordFirstIndex:number = currentLetter.index - 1;
           let i:number = currentLetter.index - 1 ;
           while(currentText[i] !== ' ' && i >= 0 ){
             wordFirstIndex = i ;
            i-- ;
           }
           // we splice the word starting from first index till currentLetter.index since slice exclude the last the last number we put currentLetter.index istead of currentLetter.index - 1
            
            let isInWrongChars:boolean = false ;
            for(let i = wordFirstIndex ; i <=  currentLetter.index - 1 ; i++){
                 if(wrongChars.includes(i)){
                   isInWrongChars  =  true ;
                   break ;
                 }
            }

            console.log("is wrong " , isInWrongChars )
            if(isInWrongChars){
               setWrongWords(prev => [...prev , {start: wordFirstIndex, end : currentLetter.index - 1}])
            }
    
        }

        window.addEventListener('keydown' , asignPreviousWordAsWrong)
    
    
        return () => window.removeEventListener('keydown' , asignPreviousWordAsWrong)
      },[wrongChars,inputValue , currentLetter])




}