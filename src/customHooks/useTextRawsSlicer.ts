import React, { useEffect, useRef } from "react";
import { sliceWordsHandler } from "../functions/sliceWordsHandler";
import { containerWordsRangeFitHanlder } from "../functions/containerWordsRangeFitHanlder";

interface textRawsSlicerProps {
     containerWidth : number
     containerRef :React.RefObject<HTMLDivElement | null> 
     setCurrentText : React.Dispatch<React.SetStateAction<string>>
     textSliceStartIndex : number
     setDynamicTextRange : React.Dispatch<React.SetStateAction<number>> // the words count that can fit in the container raws
      dynamicTextRange ?: number
      line3YRef : React.RefObject<{top : number , wordIndex : number} | null>
      isShiftFirstLine : boolean ;
      typedWordsAmount : number 
}


const useTextRawsSlicer = ({isShiftFirstLine ,typedWordsAmount ,  line3YRef , containerWidth , containerRef  , setCurrentText  , textSliceStartIndex , setDynamicTextRange ,dynamicTextRange} : textRawsSlicerProps) => {
      
      const wordsCountAllowed = useRef<number | null>(null);
      useEffect(() => {
            
            if(! containerRef.current ) return ;
         
             wordsCountAllowed.current = containerWordsRangeFitHanlder({containerRef , line3YRef} ) ;
            setDynamicTextRange(wordsCountAllowed.current)
            setCurrentText(sliceWordsHandler(textSliceStartIndex , wordsCountAllowed.current))
      }, [containerWidth , dynamicTextRange]);




      useEffect(() => {
        if(!wordsCountAllowed.current) return ; 
        setCurrentText(sliceWordsHandler(typedWordsAmount , wordsCountAllowed.current))
      }, [isShiftFirstLine])
      


      
}

export default useTextRawsSlicer ; 