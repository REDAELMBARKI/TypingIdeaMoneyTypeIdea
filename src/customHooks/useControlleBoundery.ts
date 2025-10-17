import React, { useEffect, useRef } from "react";
import type { currentLetterType } from "../types/experementTyping";

interface BlureType {
  hiddenInputRef: React.RefObject<HTMLInputElement | null>;
  wrongChars: number[];
  currentLetter: currentLetterType;
  currentText: string;

  setIsWrongWord: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  trachWord: string[];
  setTrachWord: React.Dispatch<React.SetStateAction<string[]>>;
}

const useControlleBoundery = ({
  wrongChars,
  hiddenInputRef,
  currentLetter,
  currentText,
  setIsWrongWord,
  setInputValue,
  trachWord,
  setTrachWord
}: BlureType) => {
  // this collects the extra trach chars and make a word of them

  const trachWordRef = useRef<string[]>([]);
  const currentLetterRef = useRef(currentLetter);
  // keep refs in sync with latest state
  useEffect(() => {
    trachWordRef.current = trachWord;
  }, [trachWord]);

  useEffect(() => {
    currentLetterRef.current = currentLetter;
  }, [currentLetter]);

  const handleBlurChange = (e: KeyboardEvent) => {
    // dont get forward if did not press space 
    if(currentText[currentLetter.index] === " " &&
       wrongChars.length > 0 &&
       e.key !== " "
      )
      {
        
          setIsWrongWord(true) 
         
      }


    if (e.key === " ") {
     
        setIsWrongWord(false);
      // this ref for add theis trached words to a state in case i wanna keep the trach in every word in before
      const word = trachWordRef.current.join("");

      setInputValue((prev) => prev.replace(word, ""));

      // empty traches extra chars in space click 
      setTrachWord([]);
    }


    if (e.key === "Backspace" ) {
      setIsWrongWord(false);
    } 
    
    else if (e.key !== "Backspace" && e.key !== " ") {
      
      // we puch the trach 
      if(trachWord.length < 7){
        setTrachWord((prev) => [...prev, e.key]);
      }
      
    }
  };

  useEffect(() => {
    if (
      !hiddenInputRef.current ||
      wrongChars.length === 0 ||
      currentLetter.index === 0 ||
      currentText[currentLetter.index ] !== " "
      
    ) {
      return;
    }

    // here  the indicator | sets on space before next word 
    // and there is wrong chars in before
      setIsWrongWord(true);
    
    
    window.addEventListener("keydown", handleBlurChange);
    return () => window.removeEventListener("keydown", handleBlurChange);
  }, [wrongChars , setIsWrongWord, currentLetter.index]);
};

export default useControlleBoundery;
