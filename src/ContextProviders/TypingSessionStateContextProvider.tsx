import { useRef, useState } from "react";
import { TypingSessionStateContext } from "../contexts/TypingSessionState";
import { lasyErrorSoundStoredState, lasySoundStoredState } from "../functions/lazyLoadedSessionData";






const TypingSessionStateContextProvider = ({children}:{children :  React.ReactNode  }) => {
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
     return (
           <TypingSessionStateContext.Provider value={{isTypingEnds, setIsTypingEnds ,isNormalTypingSoundEnabled, setIsNormalTypingSoundEnabled ,isErrorSoundEnabled, setIsErrorSoundEnabled , 
            isTypingStarted, setIsTypingStarted , 
            startTypingTimeRef
            }}>
              {children}
           </TypingSessionStateContext.Provider>
     )
}

export default TypingSessionStateContextProvider  ; 