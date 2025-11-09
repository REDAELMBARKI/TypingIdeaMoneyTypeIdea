
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
  setIsShiftFirstLine,
  sessionWordsCount
}: line3listenerprops) => {
  const wordsRef = useRef<HTMLElement[]>([]) ;


  useEffect(() => {

  if (!containerRef.current || !wordsRef.current) return;

  const interval = setInterval(() => {
     wordsRef.current = Array.from(containerRef.current!.querySelectorAll(".word"));
    if (wordsRef.current.length >= sessionWordsCount * 2 ) { // include spaces becus every space is a words in how i render the etxt
      clearInterval(interval);
    }
    
  }, 50);
  
  return () => clearInterval(interval);
}, [containerRef , sessionWordsCount ]);



// detects the line 3
// detects the line 3
useEffect(() => {
  if (!containerRef.current) return;
  if (!wordsRef.current || wordsRef.current.length === 0) return;

  const containerWidth = containerRef.current.getBoundingClientRect().width;
  
  let currentLineWidth = 0;
  let lineCount = 1;


  const idx = Math.min(typedWordsAmount * 2, wordsRef.current.length - 1);

  for (let i = 0; i <= idx; i++) {
    const element = wordsRef.current[i] as HTMLElement;
    if (!element) continue;
    
    const rect = element.getBoundingClientRect();
    const wordWidth = rect.width;
    
    if (wordWidth === 0) continue;
    
    const willOverflow = currentLineWidth + wordWidth > containerWidth;
    
    if (willOverflow && currentLineWidth > 0) {
      lineCount++;
      currentLineWidth = wordWidth;
    } else {
      currentLineWidth += wordWidth;
    }
  }


  const prevLine = prevLineRef.current ?? 0;

  if (lineCount >= 3 && prevLine < 3) {
    setIsShiftFirstLine(true);

    setTimeout(()=>{ setIsShiftFirstLine(false)},50)
  }

  if (lineCount < 3 && prevLine >= 3) {
    setIsShiftFirstLine(false);
  }

  prevLineRef.current = lineCount;
}, [typedWordsAmount, containerRef]);
}


export default useLine3Listener ;