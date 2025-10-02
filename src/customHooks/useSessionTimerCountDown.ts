
import { useEffect } from "react";
import type { currentLetterType } from "../types/maintyping";

interface  sessionTimerCountDownProps {
    startTypingTimeRef: React.RefObject<number> ;
    setIsTypingStarted: React.Dispatch<React.SetStateAction<boolean>>
    allowedKeys: Set<string>;
    currentLetter : currentLetterType ;
}

const  useSessionTimerCountDown = ({startTypingTimeRef,setIsTypingStarted,allowedKeys,currentLetter}:sessionTimerCountDownProps) => {
      useEffect(() => {
         if (currentLetter.index > 0) return;
         const isStartedTyping = (e: KeyboardEvent) => {
           if (!["Enter", "Backspace", "Tab", "CapsLock"].includes(e.key)) {
             if (allowedKeys.has(e.key)) {
               startTypingTimeRef.current = Date.now();
               setIsTypingStarted(true);
             }
           }
         };
     
         window.addEventListener("keydown", isStartedTyping);
         return () => window.removeEventListener("keydown", isStartedTyping);
       }, [currentLetter.index]);
     
       
}

export default useSessionTimerCountDown;