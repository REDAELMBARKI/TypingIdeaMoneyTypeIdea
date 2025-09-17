import { useEffect, useState } from "react";
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
 }

 const useBlur = ({ wrongChars , hiddenInputRef ,currentLetter ,setCurrentLetter , currentText , setTrachChars ,setIsWrongWord , setRightMargen}:BlureType) => {
    // this collects the extra trach chars and make a word of them
    const [trachWord ,setTrachWord] = useState<string[]>([])
    useEffect(() => {
            
            if (! hiddenInputRef.current 
                ||  wrongChars.length <= 0
                ||  currentText[currentLetter.index + 1] !== ' '
               ) {
                   
                  return ;
            }
           
            // wrong word
            setIsWrongWord(true) ;
           // here we preserve the last index where we reach in the linup 
           
            setCurrentLetter({
              ...currentLetter ,
               indexBeforeError:currentLetter.index
            })
         
            const handleBlurChange = (e:KeyboardEvent) => {
               
                if((e.key === ' ') ) {
                    // space click continue jump to next word
                    console.log('go to the next ')
                     setCurrentLetter({
                    ...currentLetter ,
                    index:currentLetter.indexBeforeError
                    })
                   
                    setIsWrongWord(false)
                    setTrachChars((prev) => [...prev , trachWord.join('')])
                    // emtpty the aarray for new word
                    setTrachWord([])
                    setRightMargen(0);
                }
                else if(e.key !== ' ' && e.key !== 'Backspace') {
                     // gather the wrong chars 
                     setTrachWord((prev) =>[ ...prev , e.key]) ;
                     setRightMargen((prev)=> prev + 6)
                     
                }
               
               
              
            }
           
            window.addEventListener('keydown' , handleBlurChange)



            return () => window.removeEventListener('keydown' , handleBlurChange)

        }, [wrongChars]);

 }



 export default useBlur ;