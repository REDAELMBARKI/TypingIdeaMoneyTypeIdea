import { useCallback } from "react";
import useLiveDataContext from "../contextHooks/useLiveDataContext";

interface VarsResterProps {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setTypedWordsAmount: React.Dispatch<React.SetStateAction<number>>;
  setIsShowTypingOverModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface TypingControlleFunctionsProps extends VarsResterProps {
  setIsTypingEnds: React.Dispatch<React.SetStateAction<boolean>>;
  hiddenInputRef: React.RefObject<HTMLInputElement | null>;
  sampleTexts: string[];
}

export default function useTypingControlleFunctions({
  setTypedWordsAmount,
  sampleTexts,
  hiddenInputRef,
  setIsTypingEnds,
  setInputValue,
  setIsShowTypingOverModal , 
}: TypingControlleFunctionsProps) {


   const {currentText , setCurrentLetter , setCurrentText , setGlobalState} = useLiveDataContext() ;


  // --- Define varsRester FIRST ---
  const varsRester = useCallback(({
    setInputValue,
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
      setInputValue,
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
      setInputValue,
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
