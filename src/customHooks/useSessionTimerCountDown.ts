
import { useEffect } from "react";
import type { currentLetterType } from "../types/experementTyping";

interface  sessionTimerCountDownProps {
    startTypingTimeRef: React.RefObject<number> ;
    setIsTypingStarted: React.Dispatch<React.SetStateAction<boolean>>
    allowedKeys: Set<string>;
    currentLetter : currentLetterType ;
}

const  useSessionTimerCountDown = ({startTypingTimeRef,setIsTypingStarted,allowedKeys,currentLetter}:sessionTimerCountDownProps) => {
      useEffect(() => {
        
         const isStartedTyping = (e: KeyboardEvent) => {
           if (e.repeat) return;
           if (!["Enter", "Backspace", "Tab", "CapsLock"].includes(e.key)) {
             if (allowedKeys.has(e.key)) {
               startTypingTimeRef.current = Date.now();
               setIsTypingStarted(true);
             }
           }


           if (!startTypingTimeRef.current && currentLetter.index === 0) {
             if (!startTypingTimeRef.current) startTypingTimeRef.current = Date.now();
              setIsTypingStarted(true);
            }

         };
         

         window.addEventListener("keydown", isStartedTyping);
         return () => window.removeEventListener("keydown", isStartedTyping);
       }, [currentLetter.index ,allowedKeys]);
     
       
}

export default useSessionTimerCountDown;