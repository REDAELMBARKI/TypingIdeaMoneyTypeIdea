
import React, { useEffect, useRef } from "react";
import { recordDeleteTimestimps } from "../functions/recordDeleteTimestimps";




interface sessionReplayProps {
    inputValue : string
    startTypingTimeRef : React.RefObject<number>
}


type sessionReplayData = {
   key: string ,      
   timestamp : number 
}

const useSessionReplay = ({ inputValue , startTypingTimeRef}:sessionReplayProps) => {

    const sessionReplayDataRef = useRef<sessionReplayData[]>([]);

    useEffect(() => {
        if(inputValue == '') return ;
        // storing here the keys but not delete key or backspace 
        sessionReplayDataRef.current.push({key : inputValue  , timestamp : Date.now() - startTypingTimeRef.current })
       
    }, [inputValue])
    
    useEffect(() => {


           let lastBackspaceTime = 0;

        const handledelkey = (e:KeyboardEvent) => {
            if (e.key === 'Backspace' || e.key === 'Delete') {
                const now = Date.now();
                
                // Debounce: only record if 50ms passed since last backspace
                if (now - lastBackspaceTime > 50) {
                    sessionReplayDataRef.current.push({ 
                        key: e.key, 
                        timestamp: now - startTypingTimeRef.current
                    });
                    lastBackspaceTime = now;
                }
            }
        };

         window.addEventListener('keydown', handledelkey);
         return () => window.removeEventListener('keydown', handledelkey);
    } ,[])

    

}

export default useSessionReplay ;