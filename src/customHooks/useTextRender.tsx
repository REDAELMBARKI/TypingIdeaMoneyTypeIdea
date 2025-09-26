import React from "react";
import useThemeHook from "./useThemeHook";
import type { currentLetterType } from "../types/maintyping";

interface TextRenderProps {
  currentLetter: currentLetterType;
  currentText: string;
  inputValue: string;
  wrongChars: number[];
  isTypingActive :boolean ;
  isWrongWord: boolean;
  trachWord: string[];
  wrongWords:{start : number , end:number}[];
}
interface colors {
  red : string
  white  : string
  gray : string
  darkRed : string
}

const  colors:colors= {
    red: 'text-red-400' ,
    white: 'text-slate-400' ,
    gray : 'text-gray-400' ,
    darkRed: 'text-red-900' ,
};
export const useTextRender = ({
  currentText,
  currentLetter,
  inputValue,
  wrongChars,
  trachWord,
  wrongWords ,
  isTypingActive
}: TextRenderProps) => {
  const { isDarkMode } = useThemeHook();
  
  


  return currentText.split("").map((char, index) => {
    let className = "transition-all duration-150 ";

    if (index > currentLetter.index - 1) {
      // Untyped letters
      className += isDarkMode ? "text-gray-700" : colors.gray;
    } else if (wrongChars.includes(index)) {
      // Wrong chars
      className += colors.red;
    } else {
      // Correct typed chars
      className += isDarkMode ? colors.white : "text-black";
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
       const word = currentText.slice(range.start, range.end + 1);

        return (
         <span
              key={`wrong-${range.start}`}
              className="underLineBefore "
              style={{ display: "inline-block", position: "relative", whiteSpace: "nowrap" }}
            >
              <span className="char-wrapper"   style={{whiteSpace : "nowrap"  }}
                      >
                {word.split("").map((char, charIndex) => {
                  const globalCharIndex = range.start + charIndex;
                  return (
                    <span
                      key={charIndex}
                      className={`char-span text-3xl inline-block  ${wrongChars.includes(globalCharIndex) ? colors.red : colors.white} `}
                      style={{letterSpacing:0.07 + "em" , whiteSpace : "nowrap"  }}
                      
                    
                    >
                      {char}
                    </span>
                  );
                })}
              </span>

              {/* Block underline below the word */}
              <span className="underline-block"></span>
            </span>



        );
    }

    // hehre the index isalready belongs to wrong word we dodnt return it again its returns with the compacted wordd 
    if(wrongWords.some(obj => index >= obj.start && index <= obj.end)){
        return null ;
    }
     
    return (
      <React.Fragment key={index} >
      {/* trach words */}
        {char === " " &&
          index === currentLetter.index &&
          trachWord.length > 0 && (
            <span className={`trach-word  text-3xl inline-block  ${colors.darkRed} `} 
            
            style={{ whiteSpace : "nowrap"  }} 
            >
              {trachWord.join("")}
            </span>
          )}
         {/* original text chars */}
         
         { 

        <span key={index} style={{ whiteSpace : "nowrap"  }} className={`px-[1px] text-3xl inline-block   ${className} ${indicator} ${isTypingActive ? 'stop-animation' : ''}`}
        
        >
          {char === " " ? "\u00A0" : char}
        </span>
          
         }
        </React.Fragment>
    );
  });
};
