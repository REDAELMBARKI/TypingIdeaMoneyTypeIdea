import React, {  } from "react";
import type { currentLetterType, ThemeColors, WordHistoryItem } from "../types/experementTyping";

interface TextRenderProps {
  currentLetter: currentLetterType;
  currentText: string;
  inputValue: string;
  wrongChars: number[];
  isTypingActive :boolean ;
  isWrongWord: boolean;
  trachWord: string[];
  wrongWords:{start : number , end:number}[];
  wordHistory: WordHistoryItem[] ;
  currentTheme: ThemeColors
}

export const useTextRender = ({
  currentText,
  currentLetter,
  inputValue,
  wrongChars,
  trachWord,
  wrongWords ,
  isTypingActive ,
  wordHistory ,
 currentTheme
}: TextRenderProps) => {

  return currentText.split("").map((char, index) => {
      
    let className = "transition-all duration-150 ";

    if (index > currentLetter.index - 1) {
      // Untyped letters
      className +=  currentTheme.gray ;
    } else if (wrongChars.includes(index)) {
      // Wrong chars
      className += currentTheme.red;
    } else {
      // Correct typed chars
      className +=  currentTheme.white ;
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
              <span className={`char-wrapper `}   style={{whiteSpace : "nowrap" ,  }}
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
                                                         // number of elements should be colored -> ( wordHistoryIndexing.end -  wordHistoryIndexing.lastTypedIndex) ;
                                                          // q 0 + [numberof elements shold be colored = 4] = 4 # length // should not be colored stays eather white or red 

                                                          // u 1 + [numberof elements shold be colored = 4] = 5 === length  -> start coloring from thisi index so on //gray     
                                                          // i 2 + [numberof elements shold be colored = 4]   // gray        
                                                          // c 3 + [numberof elements shold be colored = 4]    // gray        
                                                          // k 4 + [numberof elements shold be colored = 4]    // gray        
                            
                    if (wordHistoryIndexing) {
                      const remaining = wordHistoryIndexing.end - wordHistoryIndexing.lastTypedIndex;
                      const grayStart = wordlen - remaining - 1;

                      if (charIndex >= grayStart) {
                          compactedwordColor = currentTheme.gray;
                      }

                    }
                  const globalCharIndex = range.start + charIndex;
                  return (
                    // the compacted words the ones who are underlined also the untyped ones
                    <span
                      key={charIndex}
                      className={`char-spa inline-block ${compactedwordColor}  ${wrongChars.includes(globalCharIndex) ? currentTheme.red : ''} `}
                      style={{whiteSpace : "nowrap"  }}
                      
                    
                    >
                      {char}
                    </span>
                  );
                })}
              </span>

           
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
            <span className={`trach-word inline-block  ${currentTheme.darkRed} `} 
            
            style={{ whiteSpace : "nowrap"  }} 
            >
              {trachWord.join("")}
            </span>
          )}
         {/* original text chars */}
         
         { 
         


        <span key={index} style={{ whiteSpace : "nowrap"   }} className={`px-[1px inline-block   ${className} ${indicator} ${isTypingActive ? 'stop-animation' : ''}`}
        
        >
          {char === " " ? "\u00A0" : char}
        </span>
          
         }
        </React.Fragment>
    );
  });
};
