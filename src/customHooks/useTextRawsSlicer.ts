import React, { useEffect } from "react";
import { sliceWordsHandler } from "../functions/sliceWordsHandler";
import { containerWordsRangeFitHanlder } from "../functions/containerWordsRangeFitHanlder";

interface textRawsSlicerProps {
     containerWidth : number
     containerRef :React.RefObject<HTMLDivElement | null> 
     setCurrentText : React.Dispatch<React.SetStateAction<string>>
     textSliceStartIndex : number
     setDynamicTextRange : React.Dispatch<React.SetStateAction<number>> // the words count that can fit in the container raws
      dynamicTextRange ?: number
      line3YRef : React.RefObject<number | null>
}


const useTextRawsSlicer = ({line3YRef , containerWidth , containerRef  , setCurrentText  , textSliceStartIndex , setDynamicTextRange , dynamicTextRange } : textRawsSlicerProps) => {



      useEffect(() => {
         
          if(! containerRef.current ) return ;
          const wordsCountAllowed = containerWordsRangeFitHanlder({containerRef , line3YRef} ) ;
         
          setDynamicTextRange(wordsCountAllowed) ;
          setCurrentText(sliceWordsHandler(textSliceStartIndex , wordsCountAllowed))
      }, [containerWidth , textSliceStartIndex , dynamicTextRange ]);
}

export default useTextRawsSlicer ; 