import React from "react";
import useThemeHook from "./useThemeHook";
import type { currentLetterType, WordHistoryItem } from "../types/maintyping";

interface TextRenderProps {
  currentLetter: currentLetterType;
  currentText: string;
  inputValue: string;
  wrongChars: number[];
  isTypingActive :boolean ;
  isWrongWord: boolean;
  trachWord: string[];
  wrongWords:{start : number , end:number}[];
   wordHistory: WordHistoryItem[]
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
    gray : 'text-gray-700' ,
    darkRed: 'text-red-900' ,
};
export const useTextRender = ({
  currentText,
  currentLetter,
  inputValue,
  wrongChars,
  trachWord,
  wrongWords ,
  isTypingActive ,
  wordHistory
}: TextRenderProps) => {
  const { isDarkMode } = useThemeHook();
  
  


  return currentText.split("").map((char, index) => {


    let className = "transition-all duration-150 ";

    if (index > currentLetter.index - 1) {
      // Untyped letters
      className += isDarkMode ? colors.gray : colors.gray;
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
      (inputValue !== "" && index === currentLetter.index + 1) || (inputValue === "" && index === currentLetter.index) 
    ) {
      indicator = "display-indicator";
    }

    
  






  

    const range = wrongWords.find(r => r.start === index);
    if(range){
       const word = currentText.slice(range.start, range.end + 1);
       const wordHistoryIndexing = wordHistory.find(wH =>  wH.start === range.start && wH.end === range.end ) ;
    

       const wordlen = word.length ;
        return (
         <span
              key={`wrong-${range.start}`}
              className="underLineBefore "
              style={{ display: "inline-block", position: "relative", whiteSpace: "nowrap" }}
            >
              <span className="char-wrapper"   style={{whiteSpace : "nowrap"  }}
                      >
                {word.split("").map((char, charIndex) => {
                    let compactedwordColor = '' ;     
                    

                                                           // figure out something to get the chars that shoulud be colored while the index here is chaging from 0 inn every word
                                                          //  q[jump][uick -> should be gray]
                                                          // we need to color last for elements 
                                                        
                                                          // {lastindex:4 , end:8} 2 chars
                                                          // end- lastindex == 4 the last for elements dhould be colored
                                                          //1,2,3,4,5
                                                          /* we seek to the get the start from where we should start coloring  0  with wold be the frst index where the charindex its 
                                                            self + the number of thelast chars to gray = the full word's lenght  
                                                          */    
                                                         // quick for example "quick" the lenght == 5
                                                          // q 0 + [numberof elements shold be colored = 4] = 4 # length // should not be colored stays eather white or red 

                                                          // u 1 + [numberof elements shold be colored = 4] = 5 === length  -> start coloring from thisi index so on //gray     
                                                          // i 2 + [numberof elements shold be colored = 4]   // gray        
                                                          // c 3 + [numberof elements shold be colored = 4]    // gray        
                                                          // k 4 + [numberof elements shold be colored = 4]    // gray        
                            

                    if(wordHistoryIndexing){
                             if(charIndex + ( wordHistoryIndexing.end -  wordHistoryIndexing.lastTypedIndex) + 1 >=  wordlen){
                                 compactedwordColor = colors.gray
                             }  

                    }

                  
                        
                  const globalCharIndex = range.start + charIndex;
                  return (
                    // the compacted words the ones who are underlined also the untyped ones
                    <span
                      key={charIndex}
                      className={`char-span text-3xl inline-block ${compactedwordColor}  ${wrongChars.includes(globalCharIndex) ? colors.red : ''} `}
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
