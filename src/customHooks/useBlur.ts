import { useEffect, useState  , useRef} from "react";
import type { currentLetterType } from "../types/maintyping";


 interface BlureType {
    hiddenInputRef : React.RefObject<HTMLInputElement | null> ;
    wrongChars : number[] ;
    currentLetter : currentLetterType ;
    setCurrentLetter :React.Dispatch<React.SetStateAction<currentLetterType>>  ;
    currentText : string ;
    trachChars : string[];
    setTrachChars : React.Dispatch<React.SetStateAction<string[]>> ;
    setIsWrongWord : React.Dispatch<React.SetStateAction<boolean>>;
     setRightMargen:React.Dispatch<React.SetStateAction<number>> ;
     setInputValue : React.Dispatch<React.SetStateAction<string>>
 }

 const useBlur = ({ wrongChars , hiddenInputRef ,currentLetter ,setCurrentLetter , currentText , setTrachChars ,setIsWrongWord , setRightMargen , setInputValue}:BlureType) => {
    // this collects the extra trach chars and make a word of them
  const [trachWord, setTrachWord] = useState<string[]>([]);
const trachWordRef = useRef<string[]>([]);
const currentLetterRef = useRef(currentLetter);

// keep refs in sync with latest state
useEffect(() => {
  trachWordRef.current = trachWord;
}, [trachWord]);

useEffect(() => {
  currentLetterRef.current = currentLetter;
}, [currentLetter]);

useEffect(() => {
  if (
    !hiddenInputRef.current ||
    wrongChars.length <= 0 ||
    currentText[currentLetter.index + 1] !== ' '
  ) {
    return;
  }

  setIsWrongWord(true);
  setCurrentLetter(prev => ({ ...prev, indexBeforeError: prev.index }));

  const handleBlurChange = (e: KeyboardEvent) => {
    if (e.key === ' ') {
      const word = trachWordRef.current.join('');

      setCurrentLetter(prev => ({
        ...prev,
        index: prev.indexBeforeError!,
      }));

      setInputValue(prev => prev.replace(word, ''));
      setIsWrongWord(false);
      setTrachChars(prev => [...prev, word]);
    //   setTrachWord([]); // reset UI
      setRightMargen(0);
    } 
    else if (e.key !== 'Backspace') {
      setTrachWord(prev => [...prev, e.key]);
      setRightMargen(prev => prev + 6);
    }
  };

  window.addEventListener('keydown', handleBlurChange);
  return () => window.removeEventListener('keydown', handleBlurChange);
}, [wrongChars]); 
// ⬆️ note: no trachWord, no currentLetter


 }



 export default useBlur ;