import React from "react";
import type { currentLetterType, globalStatetype, ThemeColors } from "../types/experementTyping";

interface TextRenderProps {
  currentLetter: currentLetterType;
  currentText: string;
  inputValue: string;
  isTypingActive :boolean ;
  isWrongWord: boolean;
  trachWord: string[];
  currentTheme: ThemeColors ;
  globalState : globalStatetype ;
  firstRowLastIndexRef: React.RefObject<number>
}

export const textRender = ({
  currentText,
  currentLetter, 
  inputValue,
  trachWord,
  globalState : {wrongChars, wrongWords ,wordHistory},
  isTypingActive ,
  currentTheme ,
  firstRowLastIndexRef 
}: TextRenderProps) => {
  




  let globalIndex = 0; 
   
   return  currentText.split(/(\s+)/).map((word , wordIndex) => {
    //  if(isShiftFirstLine ) console.log({'global index' : globalIndex , 'lastindex' : firstRowLastIndexRef.current}) ;
      // if(word === 'stood'){console.log("ksdfhksd" , globalIndex + word.length + 1)}
     const wordEndIndex = globalIndex;
    
      return (    <span 
      
      key={wordIndex} 
      className={`word inline-block`} 

      style={(currentLetter.index > 0 && firstRowLastIndexRef.current > 0  && wordEndIndex < firstRowLastIndexRef.current) ? {display:"none"} : {}}
       >
        
        {word.split("").map((char) => {


      const index = globalIndex++;

      let charStyle = "";
    
      if (index > currentLetter.index - 1) {
        // Untyped letters
        charStyle +=  currentTheme.gray ;
      } else if (wrongChars.includes(index)) {
        // Wrong chars
        charStyle += currentTheme.red;
      } else {
        // Correct typed chars
        charStyle += currentTheme.white ;
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
                className="underLineBefore parent" 
                style={{ display: "", position: "relative", whiteSpace: "nowrap" ,  ["--underlineColor" as string] : currentTheme.red }}
              >
                <span className={`char-wrapper `}   style={{whiteSpace : "nowrap"}}
                        >
                  {word.split("").map((wordCompacted, charIndex) => {
                      let compactedwordColor = '' ;          
                              
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
                        className={`char-spa  transition-all duration-150 letter ${isTypingActive ? 'stop-animation' : ''}`}
                        style={{
                          whiteSpace: "nowrap",
                          color: wrongChars.includes(globalCharIndex) 
                            ? currentTheme.red 
                            : compactedwordColor
                        }}
                        
                      
                      >
                        {wordCompacted}
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
            trachWord.length > 0 && trachWord.map(char => {
                return ( <label className={`trach-word inline-block` }  
              
              style={{ whiteSpace : "nowrap" ,color : currentTheme.darkRed }} 
              >
                {char}
              </label>)
            })
            
            }
          {/* original text chars */}
          
          { 
          
          
          <span key={index} style={{  color : charStyle  ,  textWrap : char === " " ?  'nowrap' : 'balance' }} className={`letter  transition-all duration-150   ${indicator} ${isTypingActive ? 'stop-animation' : ''}`}>
            { char === " " ?  "\u00A0" :  char } 
          </span>
            
          }
          </React.Fragment>
      );
    })}
    </span>
  ) // inner looop ending

  }); // outer loop ending 


  
};


