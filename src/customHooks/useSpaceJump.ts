import { useEffect } from "react";
import type { currentLetterType, WordHistoryItem } from "../types/experementTyping";

interface spaceJumpPropps {
   inputValue : string ;
   currentLetter : currentLetterType ;
   currentText :string ;
   setCurrentLetter: React.Dispatch<React.SetStateAction<currentLetterType>> ;
   setWordHistory: React.Dispatch<React.SetStateAction<WordHistoryItem[]>> ;
   setWrongWords: React.Dispatch<React.SetStateAction<{start: number;end: number;}[]>>
}

 
const  useSpaceJump   = ({inputValue , currentLetter , currentText , setCurrentLetter ,setWordHistory , setWrongWords}:spaceJumpPropps) => {
  
      useEffect(()=>{
                        
                if(inputValue !== " ") return ;
                //prevent executning this hook in case theindicator at the start of a word |
                if(currentLetter.index === 0)  return ;
                
                // prevent executning this hook in case the indicator at the start of a word after the first word (skips the first word of the text);
                if(currentText[currentLetter.index - 1] === " ") return ;
   
                // prevent executning this hook in case the indicator at the the end of the word its completed so we dont have to make a history for it 
                if(currentText[currentLetter.index] === " ") return ;
            
            
                // the start of the next word   
                let nextWordFirstIndexStarts:number = currentLetter.index ;

                while(nextWordFirstIndexStarts < currentText.length &&  currentText[nextWordFirstIndexStarts] !== " "){
                    nextWordFirstIndexStarts++
                }

                    
                // preserve where we left of the previous word  so we get back to it diireclty after spaace clicking ; 
                let wordStart = currentLetter.index;

                while(wordStart > 0 && currentText[wordStart - 1] !== ' ') {
                wordStart--;
                }



                //get he word end this is for coloring the non typed chars to gray color
                let wordEnd = currentLetter.index;

                while(wordEnd > 0 && currentText[wordEnd + 1] !== ' ') {
                wordEnd++;
                }

             
                setWordHistory(prev => ([...prev , {start: wordStart ,lastTypedIndex:currentLetter.index , end : wordEnd}]))
                
                // asign the word as wrong after we jump it ;
                setWrongWords(prev => ([...prev , 
                    {start :wordStart , end:nextWordFirstIndexStarts - 1}
                ]))
                

                // set current index to next word begining
                setCurrentLetter(()=> { 
                   
                    return{
                    index: nextWordFirstIndexStarts,
                    letter: currentText[nextWordFirstIndexStarts] ?? "",
                   }
            }
            );

           
                 
      },[inputValue , currentLetter.index,currentText , setCurrentLetter , setWordHistory , setWrongWords])

}


export default useSpaceJump ;
