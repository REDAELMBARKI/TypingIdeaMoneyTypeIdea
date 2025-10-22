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

    if(currentLetter.index < currentText.length || currentText == "" ) return ;
    
    setIsTypingEnds(true) ;
    
  },[currentLetter.index])


}


export default useTypingEnd ;