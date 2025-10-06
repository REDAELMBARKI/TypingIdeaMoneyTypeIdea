import { useCallback } from "react";
import type { currentLetterType } from "../types/experementTyping";

interface VarsResterProps {
  setCurrentLetter: React.Dispatch<React.SetStateAction<currentLetterType>>;
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
  setWrongWords: React.Dispatch<
    React.SetStateAction<
      {
        start: number;
        end: number;
      }[]
    >
  >;
  setTypedWordsAmount: React.Dispatch<React.SetStateAction<number>>;
  setWrongChars: React.Dispatch<React.SetStateAction<number[]>>;
  setIsShowTypingOverModal: React.Dispatch<React.SetStateAction<boolean>>
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
  setWrongChars,
  setCurrentLetter,
  setWrongWords,
  setIsTypingEnds,
  setCurrentText,
  setInputValue,
  setIsShowTypingOverModal
}: TypingControlleFunctionsProps) {

  // --- Define varsRester FIRST ---
  const varsRester = useCallback(({
    setCurrentLetter,
    setInputValue,
    setWrongWords,
    setTypedWordsAmount,
    setWrongChars,
    setIsShowTypingOverModal
  }: VarsResterProps) => {
    setCurrentLetter({ index: 0, letter: "" });
    setInputValue("");
    setWrongWords([]);
    setWrongChars([]);
    setTypedWordsAmount(0);
    setIsShowTypingOverModal(false) ; 
  }, []);

  const handleReset = useCallback(() => {
    varsRester({
      setCurrentLetter,
      setInputValue,
      setWrongWords,
      setTypedWordsAmount,
      setWrongChars,
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
      setWrongWords,
      setTypedWordsAmount,
      setWrongChars,
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
