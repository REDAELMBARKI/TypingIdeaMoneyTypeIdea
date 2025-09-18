import React, { useEffect } from "react";
import useThemeHook from "./useThemeHook";
import type { currentLetterType } from "../types/maintyping";

interface TextRenderProps {
  currentLetter: currentLetterType;
  currentText: string;
  inputValue: string;
  wrongChars: number[];

  isWrongWord: boolean;
  setWrongChars: React.Dispatch<React.SetStateAction<number[]>>;
  trachWord: string[];
}

export const useTextRender = ({
  currentText,
  currentLetter,
  inputValue,
  wrongChars,
  setWrongChars,
  trachWord,
}: TextRenderProps) => {
  const { isDarkMode } = useThemeHook();

  useEffect(() => {
    if (inputValue === "") return;
    if (currentLetter.letter !== currentText[currentLetter.index]) {
      setWrongChars((prev) => {
        if (prev.includes(currentLetter.index)) return prev;
        return [...prev, currentLetter.index];
      });
    }
  }, [currentLetter]);

  return currentText.split("").map((char, index) => {
    let className = "transition-all duration-150 ";

    if (index > currentLetter.index - 1) {
      // Untyped letters
      className += isDarkMode ? "text-gray-400" : "text-gray-600";
    } else if (wrongChars.includes(index)) {
      // Wrong chars
      className += "text-red-500";
    } else {
      // Correct typed chars
      className += isDarkMode ? "text-white" : "text-black";
    }

    // Custom indicator logic
    let indicator = "";
    if (
      (inputValue !== "" && index === currentLetter.index + 1) ||
      (inputValue === "" && index === currentLetter.index)
    ) {
      indicator = "display-indicator";
    }

    return (
      <>
        {char === " " &&
          index === currentLetter.index &&
          trachWord.length > 0 && (
            <span className="trach-word text-red-400">
              {trachWord.join("")}
            </span>
          )}
        <span key={index} className={`px-[1px]  ${className} ${indicator}`}>
          {char === " " ? "\u00A0" : char}
        </span>
      </>
    );
  });
};
