import type { currentLetterType } from "../types/maintyping";

interface TextRenderProps {
  currentLetter: currentLetterType;
  currentText: string;
  setCurrentLetter : React.Dispatch<React.SetStateAction<{
    index: number;
    letter: string;
    indexBeforeError:number|null ;
}>>,
   wrongChars : number[];
   setWrongChars : React.Dispatch<React.SetStateAction<number[]>>
}


function useCharacterDeleteHook({currentText , currentLetter , setCurrentLetter , wrongChars , setWrongChars}:TextRenderProps) {
  return function () {
            if (currentLetter.index > 0) {
             // check if this charactre was wrong already if wrong remove it from wrongindexes 
             console.log( 'current index ' , currentLetter.index ) ;
             console.log( ' wrongs ' , wrongChars ) ;
             console.log('eexists' , wrongChars.includes(currentLetter.index) )


             if(wrongChars.includes(currentLetter.index - 1)){
                  const newArrayOfWrongs = wrongChars.filter((i) => i !== currentLetter.index - 1)
                  setWrongChars(newArrayOfWrongs)
             }
                  
                  setCurrentLetter(prev => ({
                     index: prev.index -1,
                     letter: currentText[prev.index -1] || '',
                     indexBeforeError: null
                  }));
       }

      
  }
}

export default useCharacterDeleteHook