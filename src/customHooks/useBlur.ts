import { useEffect } from "react";


 interface BlureType {
    hiddenInputRef : React.RefObject<HTMLInputElement | null> ;
    wrongChars : number[] ;
    currentLetter : {index:number , letter:string} ;
    currentText : string ;
    trachChars : string[];
    setTrachChars : React.Dispatch<React.SetStateAction<string[]>>
 }

 const useBlur = ({ wrongChars , hiddenInputRef ,currentLetter , currentText ,trachChars, setTrachChars}:BlureType) => {

    useEffect(() => {

           if (hiddenInputRef.current 
                && wrongChars.length > 0
                && currentText[currentLetter.index + 1] === ' '
               ) {
                   
                   // here we shhoud puch to trachchrs
                   setTrachChars()
                  
            }
 

            const handleBlurChange = (e:KeyboardEvent) => {
                if(e.key === ' ' && isBlured) {
                    console.log(wrongChars)
                    // hiddenInputRef.current?.focus()
                }
                if(e.key === 'Backspace' && isBlured){
                    // hiddenInputRef.current?.focus()
                }

                
              
            }
           
            window.addEventListener('keydown' , handleBlurChange)



            return () => window.removeEventListener('keydown' , handleBlurChange)

        }, [wrongChars]);

 }



 export default useBlur ;