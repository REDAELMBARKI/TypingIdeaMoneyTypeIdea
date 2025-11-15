import { useEffect } from "react";
import useLiveDataContext from "../contextHooks/useLiveDataContext";



interface typingEndProps {
  setIsTypingEnds: React.Dispatch<React.SetStateAction<boolean>>
}
const useTypingEnd = ({setIsTypingEnds}:typingEndProps) => {

    const {currentLetter , currentText  } = useLiveDataContext() ;
    useEffect(()=>{
    // shows end typing model 
    
    
    if(currentLetter.index === 0 || currentLetter.index < currentText.length) return ;
    setIsTypingEnds(true) ;
    
  },[currentLetter.index , currentText , setIsTypingEnds]) ;


}


export default useTypingEnd ;