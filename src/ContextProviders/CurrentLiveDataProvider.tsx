import { useState } from "react";
import { CurrentLiveDataContext } from "../contexts/CurrentLiveDataContext"
import type { currentLetterType, globalStatetype } from "../types/experementTyping";
import { sampleTexts } from "../data/texts";
import { baseTextNumberGenerator } from "../functions/baseTextNumber";











export  const CurrentLiveDataProvider = ({children}: { children: React.ReactNode }) => {

        const index = baseTextNumberGenerator() ;
        const [baseText ,  setBaseText] = useState<string>(sampleTexts[index])
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
        <CurrentLiveDataContext.Provider value={{ currentText ,setCurrentText ,  currentLetter, setCurrentLetter , globalState , setGlobalState ,
         baseText ,  setBaseText}} >
          {children}
        </CurrentLiveDataContext.Provider>
      )
}