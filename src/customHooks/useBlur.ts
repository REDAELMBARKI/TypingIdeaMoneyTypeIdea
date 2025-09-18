import React, { useEffect  , useRef} from "react";
import type { currentLetterType } from "../types/maintyping";

 interface BlureType {
    hiddenInputRef : React.RefObject<HTMLInputElement | null> ;
    wrongChars : number[] ;
    currentLetter : currentLetterType ;
    currentText : string ;
    trachChars : string[];
    setTrachChars : React.Dispatch<React.SetStateAction<string[]>> ;
    setIsWrongWord : React.Dispatch<React.SetStateAction<boolean>>;
     setRightMargen:React.Dispatch<React.SetStateAction<number>> ;
     setInputValue : React.Dispatch<React.SetStateAction<string>>;
      trachWord :string[] ;
      setTrachWord : React.Dispatch<React.SetStateAction<string[]>> ;
 }

 const useBlur = ({ wrongChars , hiddenInputRef ,currentLetter , currentText , setTrachChars ,setIsWrongWord , setRightMargen , setInputValue , trachWord, setTrachWord}:BlureType) => {
    // this collects the extra trach chars and make a word of them

const trachWordRef = useRef<string[]>([]);
const currentLetterRef = useRef(currentLetter);
// keep refs in sync with latest state
useEffect(() => {
  trachWordRef.current = trachWord;
}, [trachWord]);

useEffect(() => {
  currentLetterRef.current = currentLetter;
}, [currentLetter]);



const handleBlurChange = (e: KeyboardEvent) => {
    if (e.key === ' ') {

      setIsWrongWord(false);
      // this ref for add theis trached words to a state in case i wanna keep the trach in every word in before
      const word = trachWordRef.current.join('');
    

      setInputValue(prev => prev.replace(word, ''));
      
      setTrachChars(prev => [...prev, word]);
      
      setTrachWord([]); 
      

      setRightMargen(0);
    } 


    if(e.key === 'Backspace'){
         setIsWrongWord(false);

    }
    else{
      setTrachWord(prev => [...prev, e.key]);
      setRightMargen(prev => prev + 6);
    }
  };


useEffect(() => {
  if (
    !hiddenInputRef.current ||
    wrongChars.length === 0 ||
    currentText[currentLetter.index] !== ' '
  ) {
    return;
  }
  
  // here we the indicator | sets on space before next word and there is wrong chars in before
 
  setIsWrongWord(true);

  
  window.addEventListener('keydown', handleBlurChange);
  return () => window.removeEventListener('keydown', handleBlurChange);
}, [wrongChars,setIsWrongWord,currentLetter]); 
 


 }



 export default useBlur ;