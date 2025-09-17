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
       if(currentLetter.index > 0){
             // check if this charactre was wrong already if wrong remove it from wrongindexes 
             if(wrongChars.includes(currentLetter.index)){
                  const newArrayOfWrongs = wrongChars.filter((i) => i !== currentLetter.index)
                  setWrongChars(newArrayOfWrongs)
             }
             setCurrentLetter({
                index: currentLetter.index - 1,
                letter: currentText[currentLetter.index - 1],
                indexBeforeError:null
              });
       }
  }
}

export default useCharacterDeleteHook