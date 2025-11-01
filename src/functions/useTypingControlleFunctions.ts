import { useCallback } from "react";
import type { currentLetterType, globalStatetype } from "../types/experementTyping";

interface VarsResterProps {
  setCurrentLetter: React.Dispatch<React.SetStateAction<currentLetterType>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setTypedWordsAmount: React.Dispatch<React.SetStateAction<number>>;
  setIsShowTypingOverModal: React.Dispatch<React.SetStateAction<boolean>>
  setGlobalState: React.Dispatch<React.SetStateAction<globalStatetype>>
}

interface TypingControlleFunctionsProps extends VarsResterProps {
  setCurrentText: React.Dispatch<React.SetStateAction<string>>;
  // currentLetter: currentLetterType;
  setIsTypingEnds: React.Dispatch<React.SetStateAction<boolean>>;
  currentText: string;
  hiddenInputRef: React.RefObject<HTMLInputElement | null>;
  sampleTexts: string[];

}

export default function useTypingControlleFunctions({
  setTypedWordsAmount,
  sampleTexts,
  hiddenInputRef,
  currentText,
  setCurrentLetter,
  setIsTypingEnds,
  setCurrentText,
  setInputValue,
  setIsShowTypingOverModal , 
  setGlobalState 
}: TypingControlleFunctionsProps) {

  // --- Define varsRester FIRST ---
  const varsRester = useCallback(({
    setCurrentLetter,
    setInputValue,
    setGlobalState ,
    setTypedWordsAmount,
    setIsShowTypingOverModal
  }: VarsResterProps) => {
    setCurrentLetter({ index: 0, letter: "" });
    setInputValue("");
    setGlobalState(prev => ({
       ...prev , 
       wrongChars : [] , 
       wrongWords : []
    }))
    setTypedWordsAmount(0);
    setIsShowTypingOverModal(false) ; 
  }, []);

  const handleReset = useCallback(() => {
    varsRester({
      setCurrentLetter,
      setInputValue,
      setGlobalState ,
      setTypedWordsAmount,
      setIsShowTypingOverModal 
    });

    setCurrentText(currentText);
    setIsTypingEnds(false);

    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [sampleTexts,hiddenInputRef]);

  const nextText = useCallback(() => {
    varsRester({
      setCurrentLetter,
      setInputValue,
      setGlobalState ,
      setTypedWordsAmount,
      setIsShowTypingOverModal
    });

    const randomText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
    setCurrentText(randomText);
    setIsTypingEnds(false);

    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [sampleTexts,hiddenInputRef]);

  return { nextText, handleReset };
}
