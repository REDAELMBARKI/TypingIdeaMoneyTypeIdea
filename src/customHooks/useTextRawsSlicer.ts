import React, { useEffect } from "react";
import { sliceWordsHandler } from "../functions/sliceWordsHandler";

interface textRawsSlicerProps {
     containerWidth : number
     containerRef :React.RefObject<HTMLDivElement | null> 
     setCurrentText : React.Dispatch<React.SetStateAction<string>>
}


const useTextRawsSlicer = ({containerWidth , containerRef  , setCurrentText  } : textRawsSlicerProps) => {



      useEffect(() => {
         
          if(! containerRef.current ) return ;
          let wordsCountAllowed = 0 ;
          let maxRaws = 3 ;
          let prevY = containerRef.current?.querySelector('span')?.getBoundingClientRect().top ;

          containerRef.current?.querySelectorAll('span').forEach(span => {
                 if(maxRaws === 0 ) return;
                 if(span.getBoundingClientRect().top  != prevY ) {
                        maxRaws-- ;
                        prevY = span.getBoundingClientRect().top ;
                  }

                if(span.textContent == "\u00A0") {
                wordsCountAllowed++
                }
               
          })

          setCurrentText(sliceWordsHandler(wordsCountAllowed))
      }, [containerWidth]);
}

export default useTextRawsSlicer ; 