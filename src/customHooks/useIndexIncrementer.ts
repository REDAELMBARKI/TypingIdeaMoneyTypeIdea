import { useEffect } from "react";
import type { currentLetterType } from "../types/maintyping";

interface useIncrimenterProps {
     
      wrongChars: number[];
      currentLetter: currentLetterType;
      currentText: string;
        setCurrentLetter: React.Dispatch<
    React.SetStateAction<{
      index: number;
      letter: string;
    }>
  >;
      setIsWrongWord: React.Dispatch<React.SetStateAction<boolean>>;
      setInputValue: React.Dispatch<React.SetStateAction<string>>;
       inputValue : string ;
        setWrongChars: React.Dispatch<React.SetStateAction<number[]>>;
        isWrongWord : boolean ; 

}


function useIndexIncrementer({currentText , currentLetter , inputValue , setInputValue , wrongChars ,isWrongWord, setIsWrongWord , setWrongChars ,setCurrentLetter}:useIncrimenterProps) {
   useEffect(() => {
    // reset is wrong if we are in the bigining of each word
    if(currentText[currentLetter.index - 1] === " " || currentLetter.index === 0){
      setIsWrongWord(false)
    }


   // Only allow one character in input
    if (inputValue.length > 1) {
      setInputValue(inputValue.slice(-1));
      return;
    }

    
   
    const typedChar = inputValue;
    const expectedChar = currentText[currentLetter.index];
   
    if (
    currentText[currentLetter.index] === " " &&
    wrongChars.length > 0 &&
    typedChar !== " "
  ) {

    // block use to bypass space with any char rather then  space 
    setIsWrongWord(true);
    setInputValue(""); 
    return;
  }

    // Compare input to currentText[current index]
    if (inputValue.length === 1) {
      
      //  incriment only if the previous word is correct !iswrongword  
      if (typedChar === expectedChar && !isWrongWord) {
        setCurrentLetter((prev) => ({
          ...prev,
          index: prev.index + 1,
          letter: typedChar,
        }));
      } else if (typedChar !== expectedChar && !isWrongWord) {
        // skip spaces dont add then to wrong chars 
        if(currentText[currentLetter.index] !== " "){
          setWrongChars((prev) => [...prev, currentLetter.index]);
        }
        setCurrentLetter((prev) => ({ ...prev, index: prev.index + 1 }));
      }

      setInputValue(""); // clear for next char
    }
  }, [inputValue, currentLetter.index, currentText]);

}

export default useIndexIncrementer