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
}

export default function useTypingControlleFunctions({
  setTypedWordsAmount,
  hiddenInputRef,
  setIsTypingEnds,
  setInputValue,
  setIsShowTypingOverModal , 
}: TypingControlleFunctionsProps) {


   const {currentText , setCurrentLetter , setCurrentText , setGlobalState ,  baseText} = useLiveDataContext() ;


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
  }, []);

  const nextText = useCallback(() => {
    varsRester({
      setInputValue,
      setTypedWordsAmount,
      setIsShowTypingOverModal
    });

    setCurrentText(baseText);
    setIsTypingEnds(false);

    if (hiddenInputRef.current) {
      hiddenInputRef.current.focus();
    }
  }, [baseText,hiddenInputRef]);

  return { nextText, handleReset };
}
