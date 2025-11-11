import { useEffect } from "react";
import type { currentLetterType } from "../types/experementTyping";



interface typingEndProps {
 currentLetter: currentLetterType;
  currentText: string;
  setIsTypingEnds: React.Dispatch<React.SetStateAction<boolean>>
}
const useTypingEnd = ({currentLetter , currentText , setIsTypingEnds}:typingEndProps) => {
    useEffect(()=>{
    // shows end typing model 
    
    
    if(currentLetter.index === 0 || currentLetter.index < currentText.length) return ;
    setIsTypingEnds(true) ;
    
  },[currentLetter.index , currentText , setIsTypingEnds]) ;


}


export default useTypingEnd ;