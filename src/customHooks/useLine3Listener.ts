import type { currentLetterType } from "./../types/experementTyping";
import { useEffect, useRef } from "react";

interface line3listenerprops {

  containerRef : React.RefObject<HTMLDivElement | null >;
  typedWordsAmount : number;
  prevLineRef :React.RefObject< number> ;
  line3YRef : React.RefObject<{ top: number} | null >;
  setIsShiftFirstLine : React.Dispatch<React.SetStateAction<boolean>>;
  currentLetter: currentLetterType
  containerWidth : number
  sessionWordsCount : number
}

const useLine3Listener = ({

  containerRef,
  typedWordsAmount,
  prevLineRef,
  line3YRef,
  setIsShiftFirstLine,
  containerWidth ,
  sessionWordsCount
}: line3listenerprops) => {
    
  const wordsRef = useRef<HTMLElement[]>([])

  useEffect(() => {
     if (!containerRef.current) return;
    const interval = setInterval(()=>{
          wordsRef.current = Array.from(containerRef.current!.querySelectorAll(".word"));
          if(wordsRef.current.length >= sessionWordsCount ) {
            clearInterval(interval)
            console.log(wordsRef.current)
          }
    },50)

    return () => clearInterval(interval);
  }, [containerRef.current])
  

  
  // detects the line 3
  useEffect(() => {
  
    if (!wordsRef.current || wordsRef.current.length === 0) return;
    

    const idx = Math.min(typedWordsAmount, wordsRef.current.length - 1);
    const tops: number[] = [];
    

    for (let i = 0; i <= idx; i++) {
      const rect = (wordsRef.current[i] as HTMLElement).getBoundingClientRect();
      const top = Math.floor(rect.top);
      if (tops.length === 0 || tops[tops.length - 1] !== top) {
        tops.push(top);
        
      }
      
      console.log(tops)
    }

    const currentLine = Math.max(1, tops.length);
    const prevLine = prevLineRef.current ?? 0;

    if (currentLine >= 3 && prevLine < 3) {
      // reached line 3
      const line3Top = tops[2]; 
  
      line3YRef.current = { top: line3Top };
      // shift line 1
      setIsShiftFirstLine(true);
      // setTimeout(()=> setIsShiftFirstLine(false) , 100)
    }

    if (currentLine < 3 && prevLine >= 3) {
      line3YRef.current = null;
    }

    prevLineRef.current = currentLine;
  }, [typedWordsAmount, containerWidth , containerRef ]);
};


export default useLine3Listener ;