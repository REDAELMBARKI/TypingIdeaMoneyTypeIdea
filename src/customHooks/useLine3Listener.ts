import type { currentLetterType, ThemeColors } from "./../types/experementTyping";
import { useEffect } from "react";

interface line3listenerprops {
  currentTheme : ThemeColors;
  containerRef : React.RefObject<HTMLDivElement | null >;
  typedWordsAmount : number;
  prevLineRef :React.RefObject< number> ;
  line3YRef : React.RefObject<{ top: number, wordIndex: number } | null >;
  setIsShiftFirstLine : React.Dispatch<React.SetStateAction<boolean>>;
  currentLetter: currentLetterType
  containerWidth : number
}

const useLine3Listener = ({
  currentTheme,
  containerRef,
  typedWordsAmount,
  prevLineRef,
  line3YRef,
  setIsShiftFirstLine,
  currentLetter,
  containerWidth ,
}: line3listenerprops) => {
    
  useEffect(() => {
    if (currentTheme.isDarkModed) {
      document.documentElement.style.removeProperty("color-scheme");
    } else {
      document.documentElement.style.setProperty("color-scheme", "normal");
    }
  }, [currentTheme.isDarkModed]);

  // detects the line 3
  useEffect(() => {
    if (!containerRef.current) return;
    const words = containerRef.current.querySelectorAll(".word");
    if (!words || words.length === 0) return;

    const idx = Math.min(typedWordsAmount, words.length - 1);
    const tops: number[] = [];
    const firstIndexForTop = new Map<number, number>();

    for (let i = 0; i <= idx; i++) {
      const rect = (words[i] as HTMLElement).getBoundingClientRect();
      const top = Math.round(rect.top);
      if (tops.length === 0 || tops[tops.length - 1] !== top) {
        tops.push(top);
        if (!firstIndexForTop.has(top)) firstIndexForTop.set(top, i);
      }
    }

    const currentLine = Math.max(1, tops.length);
    const prevLine = prevLineRef.current ?? 0;

    if (currentLine >= 3 && prevLine < 3) {
      // reached line 3
      const line3Top = tops[2]; // index 2 -> third line
      const firstIdxOnLine3 = firstIndexForTop.get(line3Top) ?? 0;
      line3YRef.current = { top: line3Top, wordIndex: firstIdxOnLine3 };
      // shift line 1
      setIsShiftFirstLine(true);
      setTimeout(()=> setIsShiftFirstLine(false) , 100)
    }

    if (currentLine < 3 && prevLine >= 3) {
      line3YRef.current = null;
    }

    prevLineRef.current = currentLine;
  }, [typedWordsAmount, currentLetter.index, containerWidth]);
};


export default useLine3Listener ;