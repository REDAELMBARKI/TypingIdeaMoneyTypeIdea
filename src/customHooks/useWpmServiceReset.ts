import React, { useEffect } from "react";

interface wpmServiceResetProps {
amountOfTimeRef: React.RefObject<number | null>
 startTypingTimeRef: React.RefObject<number>
 setWpmFinal: React.Dispatch<React.SetStateAction<number>>
 setTypedWordsAmount: React.Dispatch<React.SetStateAction<number>>
 totalCorrectedCharsRef: React.RefObject<number | null>
}
const useWpmServiceReset =  ({totalCorrectedCharsRef , amountOfTimeRef , startTypingTimeRef , setWpmFinal , setTypedWordsAmount}:wpmServiceResetProps) => {
    useEffect(()=>{
        totalCorrectedCharsRef.current = 0 ;
        amountOfTimeRef.current = 0 ;
        startTypingTimeRef.current = 0 
        setWpmFinal(0)
        setTypedWordsAmount(0)
    })
}


export default useWpmServiceReset ; 