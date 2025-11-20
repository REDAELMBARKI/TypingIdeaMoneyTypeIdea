import React, { useEffect, useRef } from "react";
import { sliceWordsHandler } from "../functions/sliceWordsHandler";
import { containerWordsRangeFitHandler } from "../functions/containerWordsRangeFitHandler";
import { useTypingSessionStateContext } from "../contextHooks/useTypingSessionStateContext";
import { parametersTypes } from "../types/experementTyping";
import { useTextTransformer } from "../functions/textTransform";
import useLiveDataContext from "../contextHooks/useLiveDataContext";


interface textRawsSlicerProps {
     containerWidth : number
     containerRef :React.RefObject<HTMLDivElement | null> 
     textSliceStartIndex : number
     setDynamicTextRange : React.Dispatch<React.SetStateAction<number>> // the words count that can fit in the container raws
      dynamicTextRange ?: number
      line3YRef : React.RefObject<{top : number } | null>
      sessionWordsCount : number
    
}


const useTextRawsSlicer = ({sessionWordsCount ,line3YRef , containerWidth , containerRef   , textSliceStartIndex , setDynamicTextRange ,dynamicTextRange} : textRawsSlicerProps) => {
      
      const wordsCountAllowed = useRef<number | undefined>(undefined);
      const {isTypingEnds , selectedParameters} = useTypingSessionStateContext() ; 
      const {setCurrentText} = useLiveDataContext()
      const {addNumbersToText , addPunctuationToText} =  useTextTransformer()

       useEffect(() => {
            if(isTypingEnds) return ; 
            if(! containerRef.current) return ;
            //if the session eds stod executing this
           
            wordsCountAllowed.current = containerWordsRangeFitHandler({containerRef , line3YRef} ) || 0 ;
            setDynamicTextRange(wordsCountAllowed.current!)
            
            const text = sliceWordsHandler(textSliceStartIndex , wordsCountAllowed.current! , sessionWordsCount) ; 
          
            setCurrentText(text)
            
            if(selectedParameters.includes(parametersTypes.numbers)){
                  addNumbersToText()
                  
            }
            if(selectedParameters.includes(parametersTypes.punctuation)){
                 addPunctuationToText()
            } 

            
      }, [containerWidth , dynamicTextRange]);



      

            
}

export default useTextRawsSlicer ; 