interface TextRenderProps {
  currentLetter: {index:number , letter:string};
  currentText: string;
  setCurrentLetter : React.Dispatch<React.SetStateAction<{
    index: number;
    letter: string;
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
              });
       }
  }
}

export default useCharacterDeleteHook