import { useEffect } from "react";
import type { currentLetterType, ThemeColors, WordHistoryItem } from "../types/experementTyping";



interface  coloringEffectprops {
     currentLetter: currentLetterType
      containerRef : React.RefObject<HTMLDivElement | null >
        currentTheme: ThemeColors ;
        inputValue : string ; 
        wrongWords: {
            start: number;
            end: number;
        }[]


        wrongChars: number[] ;
        wordHistory: WordHistoryItem[]

}


const useColoringEffect = ({
  currentTheme,
  containerRef,
  currentLetter,
  inputValue , 
  wrongWords , 
  wrongChars , 
  wordHistory
 
}: coloringEffectprops) => {

    useEffect(() => {
  if (!containerRef.current) return;
  
  const allChars = containerRef.current.querySelectorAll(".word > span ");
  
  // First pass: remove all indicators
  allChars.forEach((element) => {
    element.classList.remove("display-indicator");
    const charSpans = element.querySelectorAll(".char-spa");
    charSpans.forEach((char) => char.classList.remove("display-indicator"));
  });
  
  // Second pass: color and add indicator
  let globalIndex = 0;

  allChars.forEach((element) => {
    const el = element as HTMLElement;
    
    // Check if this is a wrong word wrapper (already has the class from render)
    if (el.classList.contains("underLineBefore")) {
      const charSpans = el.querySelectorAll(".char-spa") as NodeListOf<HTMLElement>;
      const firstCharIndex = globalIndex;
    
      // Find the range for this wrong word
      const range = wrongWords.find(r => r.start === firstCharIndex);
      if (range) {
        const wordHistoryIndexing = wordHistory.find(
          (wH) => wH.start === range.start && wH.end === range.end
        );
        

        const wordlen = charSpans.length;
        
        charSpans.forEach((char, i) => {
          let compactedwordColor = "";
         
          if (wordHistoryIndexing) {
            const remaining = wordHistoryIndexing.end - wordHistoryIndexing.lastTypedIndex;
            const grayStart = wordlen - remaining -1 ;
            
            if (i >= grayStart) {
              compactedwordColor = currentTheme.gray;
            }
          }
          
          const globalCharIndex = firstCharIndex + i;
          
          // Add indicator if this is the current position
          if ((inputValue !== "" && globalCharIndex === currentLetter.index + 1) || 
              (inputValue === "" && globalCharIndex === currentLetter.index)) {
             char.classList.add("display-indicator");
          }
          
          char.style.color = wrongChars.includes(globalCharIndex)
            ? currentTheme.red
            : compactedwordColor;
        });
      }
      
      globalIndex += charSpans.length;
    } else {
      // Regular char
      const spanIndex = globalIndex++;
      
      // Skip if this char is part of a wrong word range
      const isPartOfWrongWord = wrongWords.some(
        (range) => spanIndex >= range.start && spanIndex <= range.end
      );
      
      if (!isPartOfWrongWord) {
        // Add indicator if this is the current position
        if ((inputValue !== "" && spanIndex === currentLetter.index + 1) || 
            (inputValue === "" && spanIndex === currentLetter.index)) {
          el.classList.add("display-indicator");
        }
        
        el.style.color =
          spanIndex > currentLetter.index - 1
            ? currentTheme.gray
            : wrongChars.includes(spanIndex)
            ? currentTheme.red
            : currentTheme.white;
      }
    }
  });
}, [currentLetter.index , wrongChars, wrongWords, wordHistory, currentTheme, inputValue]);


}

export default useColoringEffect ; 