import { useEffect } from "react";

interface wpmServiceResetProps {
amountOfTimeRef: React.RefObject<number | null>
 startTypingTimeRef: React.RefObject<number>
 wpmFinalRef: React.RefObject<number | null>
 setTypedWordsAmount: React.Dispatch<React.SetStateAction<number>>
 totalCorrectedCharsRef: React.RefObject<number | null>
}
const useWpmServiceReset =  ({totalCorrectedCharsRef , amountOfTimeRef , startTypingTimeRef , wpmFinalRef , setTypedWordsAmount}:wpmServiceResetProps) => {
    useEffect(()=>{
        totalCorrectedCharsRef.current = 0 ;
        amountOfTimeRef.current = 0 ;
        startTypingTimeRef.current = 0 
        wpmFinalRef.current = 0;
        setTypedWordsAmount(0)
    })
}


export default useWpmServiceReset ; 