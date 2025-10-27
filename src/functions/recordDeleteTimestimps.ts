import type React from "react";

interface recordDeleteTimestimpsProps {
    sessionReplayDataRef : React.RefObject<{key:string , timestamp : number}[]>
    startTypingTimeRef : React.RefObject<number>
}

export const recordDeleteTimestimps = ({sessionReplayDataRef ,startTypingTimeRef }:recordDeleteTimestimpsProps) => {
    let lastBackspaceTime = 0;
        
        return  (e:KeyboardEvent) => {
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
        
}
 