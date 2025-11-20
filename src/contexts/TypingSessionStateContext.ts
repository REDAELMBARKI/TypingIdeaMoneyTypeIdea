import { createContext } from "react";


type typingSessionStateContextType = {
      startTypingTimeRef: React.RefObject<number>
      // typing start and end  
      isTypingStarted: boolean
      isTypingEnds: boolean
      setIsTypingStarted: React.Dispatch<React.SetStateAction<boolean>>
      setIsTypingEnds: React.Dispatch<React.SetStateAction<boolean>>
      //   sound 
      isNormalTypingSoundEnabled: boolean
      isErrorSoundEnabled: boolean
      setIsNormalTypingSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>
      setIsErrorSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>
      // 

      // selected amount of session words count and time 
      setSessionWordsCount: React.Dispatch<React.SetStateAction<number>>
      sessionWordsCount: number
      setSelectedTime: React.Dispatch<React.SetStateAction<number>>
      selectedTime : number 

      // selected param 
      setSelectedParameters: React.Dispatch<React.SetStateAction<string[]>>
      selectedParameters : string[]
}


export const TypingSessionStateContext = createContext<typingSessionStateContextType | undefined>(undefined)