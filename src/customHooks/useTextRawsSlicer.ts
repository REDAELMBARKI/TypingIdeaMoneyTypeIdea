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
      line3YRef : React.RefObject<{top : number , wordIndex : number} | null>
      isShiftFirstLine : boolean ;
      typedWordsAmount : number 
}


const useTextRawsSlicer = ({isShiftFirstLine ,typedWordsAmount ,  line3YRef , containerWidth , containerRef  , setCurrentText  , textSliceStartIndex , setDynamicTextRange ,dynamicTextRange} : textRawsSlicerProps) => {
      
      const wordsCountAllowed = useRef<number | null>(null);
      useEffect(() => {
            
            if(! containerRef.current ) return ;
         
             wordsCountAllowed.current = containerWordsRangeFitHandler({containerRef , line3YRef} ) || 0 ;
            setDynamicTextRange(wordsCountAllowed.current!)
            const text = sliceWordsHandler(textSliceStartIndex , wordsCountAllowed.current!) ; 
            setCurrentText(text)
      }, [containerWidth , dynamicTextRange]);




      useEffect(() => {
        if(!wordsCountAllowed.current) return ; 
        setCurrentText(sliceWordsHandler(typedWordsAmount , wordsCountAllowed.current))
      }, [isShiftFirstLine])
      

      useEffect(() => {
        setTimeout(() => {
             const text = sliceWordsHandler(15 , 30) ; 
             setCurrentText(text)
        },8000)
      },[])
            
}

export default useTextRawsSlicer ; 