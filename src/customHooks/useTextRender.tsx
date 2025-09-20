import React from "react";
import useThemeHook from "./useThemeHook";
import type { currentLetterType } from "../types/maintyping";

interface TextRenderProps {
  currentLetter: currentLetterType;
  currentText: string;
  inputValue: string;
  wrongChars: number[];

  isWrongWord: boolean;
  trachWord: string[];
  wrongWords:{start : number , end:number}[];
}

export const useTextRender = ({
  currentText,
  currentLetter,
  inputValue,
  wrongChars,
  trachWord,
  wrongWords
}: TextRenderProps) => {
  const { isDarkMode } = useThemeHook();
  

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

  

    const range = wrongWords.find(r => r.start === index);
    if(range){
      return (
          <span
            key={index}
            className="text-red-500 px-[1px]"
            style={{
            borderBottom: "1px solid red",    
            lineHeight: 1,                      
            display: "inline-block"            
          }}
          >
            {currentText.slice(range!.start, range!.end + 1)}
          </span>
        );
    }

    // hehre the index isalready belongs to wrong word we dodnt return it again its returns with the compacted wordd 
    if(wrongWords.some(obj => index >= obj.start && index <= obj.end)){
        return null ;
    }
     
    return (
      <React.Fragment key={index}>
      {/* trach words */}
        {char === " " &&
          index === currentLetter.index &&
          trachWord.length > 0 && (
            <span className="trach-word text-red-400">
              {trachWord.join("")}
            </span>
          )}
         {/* original text chars */}
         
         { 

        <span key={index} className={`px-[1px]  ${className} ${indicator}`}
        
        >
          {char === " " ? "\u00A0" : char}
        </span>
          
         }
        </React.Fragment>
    );
  });
};
