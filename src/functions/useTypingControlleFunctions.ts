import type { currentLetterType } from "../types/experementTyping";

interface typingControlleFunctionsProps {
setCurrentText: React.Dispatch<React.SetStateAction<string>> ;
setCurrentLetter: React.Dispatch<React.SetStateAction<currentLetterType>> ;
currentLetter: currentLetterType
setWrongChars: React.Dispatch<React.SetStateAction<number[]>>
setIsTypingEnds: React.Dispatch<React.SetStateAction<boolean>> ;
setWrongWords: React.Dispatch<React.SetStateAction<{
    start: number;
    end: number;
}[]>> ;
setInputValue: React.Dispatch<React.SetStateAction<string>>
currentText:string ;
 hiddenInputRef: React.RefObject<HTMLInputElement | null>
isTypingEnds : boolean ;
sampleTexts : string[];
setTypedWordsAmount: React.Dispatch<React.SetStateAction<number>>  ;

}

export default function useTypingControlleFunctions({ setTypedWordsAmount , sampleTexts , isTypingEnds,hiddenInputRef,currentText,setWrongChars,setCurrentLetter,setWrongWords,setIsTypingEnds ,setCurrentText , currentLetter ,setInputValue}:typingControlleFunctionsProps){
   const handleReset = () => {
    if (currentLetter.index === 0) return;

    // Placeholder for reset functionality
    setCurrentLetter({ index: 0, letter: "" });
    setInputValue("");
    setWrongWords([]);
    setWrongChars([]);
    setTypedWordsAmount(0); 
    setCurrentText(currentText);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }

    if (isTypingEnds) {
      setIsTypingEnds(false);
    }
  };


   const nextText = () => {
    // Placeholder for reset functionality
    setCurrentLetter({ index: 0, letter: "" });
    setInputValue("");
    setWrongWords([]);
    setWrongChars([]);
    setTypedWordsAmount(0);
    const randomText =
      sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(randomText);
    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }

    if (isTypingEnds) {
      setIsTypingEnds(false);
    }
  };
  return {nextText , handleReset}
}
