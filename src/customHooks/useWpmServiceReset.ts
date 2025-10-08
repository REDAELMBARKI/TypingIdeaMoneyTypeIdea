import React, { useEffect } from "react";

interface wpmServiceResetProps {
amountOfTimeRef: React.RefObject<number | null>
 startTypingTimeRef: React.RefObject<number>
 setWpmFinal: React.Dispatch<React.SetStateAction<number>>
 setTypedWordsAmount: React.Dispatch<React.SetStateAction<number>>
 totalCorrectedCharsRef: React.RefObject<number | null> 
 isTypingEnds:boolean
 wpmFinal : number
}
const useWpmServiceReset =  ({wpmFinal , totalCorrectedCharsRef , amountOfTimeRef , startTypingTimeRef , setWpmFinal , setTypedWordsAmount , isTypingEnds}:wpmServiceResetProps) => {
    useEffect(()=>{
        if(wpmFinal === 0) return ;

        totalCorrectedCharsRef.current = 0 ;
        amountOfTimeRef.current = 0 ;
        startTypingTimeRef.current = 0 
        setWpmFinal(0)
        setTypedWordsAmount(0)
    },[isTypingEnds])
}


export default useWpmServiceReset ; 