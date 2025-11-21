import { createContext } from "react";
import type { currentLetterType, globalStatetype } from "../types/experementTyping";







interface CurrentLiveDataContextType {
   currentText : string  
   setCurrentText: React.Dispatch<React.SetStateAction<string>>
   setCurrentLetter: React.Dispatch<React.SetStateAction<currentLetterType>>
    currentLetter : currentLetterType 
    setGlobalState: React.Dispatch<React.SetStateAction<globalStatetype>>
    globalState : globalStatetype ; 
     setBaseText: React.Dispatch<React.SetStateAction<string>>
    baseText  : string
}

export const CurrentLiveDataContext = createContext<CurrentLiveDataContextType | undefined>(undefined);