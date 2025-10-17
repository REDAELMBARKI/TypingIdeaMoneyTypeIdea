import { useEffect } from "react";
import type { currentLetterType } from "../types/experementTyping";

interface textRawsSlicerProps {
     currentLetter: currentLetterType
}


const useTextRawsSlicer = ({currentLetter} : textRawsSlicerProps) => {



      useEffect(() => {
          // container width
          // font 
          // char size 
          // render from 0 to thre lines first after completing that thre lines splice agian the text sarting from that current index
          
      }, [currentLetter.index]);
}

export default useTextRawsSlicer ; 