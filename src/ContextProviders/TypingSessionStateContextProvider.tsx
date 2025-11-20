import { useRef, useState } from "react";
import { TypingSessionStateContext } from "../contexts/TypingSessionStateContext";
import { lasyErrorSoundStoredState, lasySoundStoredState, lazyLoadedSelectedTime, lazyLoadedSessionWordsCount, lazyLoadeStoredParams } from "../functions/lazyLoadedSessionData";






const TypingSessionStateContextProvider = ({children}:{children :  React.ReactNode  }) => { 
   // selected ampunt of words and time 
    // current text state 15 words to be genrated at the first time (the text ends in this index)
     const [sessionWordsCount, setSessionWordsCount] = useState<number>(
       lazyLoadedSessionWordsCount
     );
   
      // select time fo session typing
     const [selectedTime, setSelectedTime] = useState<number>(
       lazyLoadedSelectedTime
     );


     const startTypingTimeRef = useRef<number>(0);
     const [isNormalTypingSoundEnabled, setIsNormalTypingSoundEnabled] =
    useState<boolean>(lasySoundStoredState);

    const [isErrorSoundEnabled, setIsErrorSoundEnabled] = useState<boolean>(
    lasyErrorSoundStoredState
  );
    // typing endslistyteener 

    const [isTypingEnds, setIsTypingEnds] = useState<boolean>(false);

    // typign begin listener
    const [isTypingStarted, setIsTypingStarted] = useState(false);


    // selected parametres 
     const [selectedParameters , setSelectedParameters] = useState<string[]>(lazyLoadeStoredParams) ;
     return (
           <TypingSessionStateContext.Provider value={{isTypingEnds, setIsTypingEnds ,isNormalTypingSoundEnabled, setIsNormalTypingSoundEnabled ,isErrorSoundEnabled, setIsErrorSoundEnabled , 
            isTypingStarted, setIsTypingStarted ,  sessionWordsCount, setSessionWordsCount ,selectedTime, setSelectedTime ,
            startTypingTimeRef , selectedParameters , setSelectedParameters
            }}>
              {children}
           </TypingSessionStateContext.Provider>
     )
}

export default TypingSessionStateContextProvider  ; 