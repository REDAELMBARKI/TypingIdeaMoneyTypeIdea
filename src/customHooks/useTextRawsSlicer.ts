import React, { useEffect, useRef } from "react";
import { sliceWordsHandler } from "../functions/sliceWordsHandler";
import { containerWordsRangeFitHandler } from "../functions/containerWordsRangeFitHandler";


interface textRawsSlicerProps {
     containerWidth : number
     containerRef :React.RefObject<HTMLDivElement | null> 
     setCurrentText : React.Dispatch<React.SetStateAction<string>>
     textSliceStartIndex : number
     setDynamicTextRange : React.Dispatch<React.SetStateAction<number>> // the words count that can fit in the container raws
      dynamicTextRange ?: number
      line3YRef : React.RefObject<{top : number } | null>
      isShiftFirstLine : boolean ;
      sessionWordsCount : number
      typedWordsAmount : number
}


const useTextRawsSlicer = ({sessionWordsCount ,typedWordsAmount ,  isShiftFirstLine ,  line3YRef , containerWidth , containerRef  , setCurrentText  , textSliceStartIndex , setDynamicTextRange ,dynamicTextRange} : textRawsSlicerProps) => {
      
      const wordsCountAllowed = useRef<number | undefined>(undefined);
      useEffect(() => {
            
            if(! containerRef.current ) return ;
         
           
            wordsCountAllowed.current = containerWordsRangeFitHandler({containerRef , line3YRef} ) || 0 ;
            setDynamicTextRange(wordsCountAllowed.current!)
            
            const text = sliceWordsHandler(textSliceStartIndex , wordsCountAllowed.current! , sessionWordsCount) ; 
            setCurrentText(text)
      }, [containerWidth , dynamicTextRange]);


       // shift the text once we hit the line 3
        // firstIndexInSecondLIne in the first word indenx in the second line 
      useEffect(() => {
        if(!wordsCountAllowed.current) return ; 
        const firstIndexInSecondLIne = typedWordsAmount ;
        setCurrentText(sliceWordsHandler(firstIndexInSecondLIne , wordsCountAllowed.current ,sessionWordsCount ))
      }, [isShiftFirstLine])
      

            
}

export default useTextRawsSlicer ; 