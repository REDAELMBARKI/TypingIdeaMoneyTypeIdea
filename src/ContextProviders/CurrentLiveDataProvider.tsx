import { useState } from "react";
import { CurrentLiveDataContext } from "../contexts/CurrentLiveDataContext"
import type { currentLetterType, globalStatetype } from "../types/experementTyping";











export  const CurrentLiveDataProvider = ({children}: { children: React.ReactNode }) => {
        const [currentText, setCurrentText] = useState<string>("");
        const [currentLetter, setCurrentLetter] = useState<currentLetterType>({
            index: 0,
            letter: "",
        });

        const [globalState , setGlobalState] = useState<globalStatetype>({
            wrongChars: [] ,
            wrongWords: [] ,
            wordHistory: []
        }) 


      return (
        <CurrentLiveDataContext.Provider value={{ currentText ,setCurrentText ,  currentLetter, setCurrentLetter , globalState , setGlobalState}} >
          {children}
        </CurrentLiveDataContext.Provider>
      )
}