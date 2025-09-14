interface TextRenderProps {
  currentLetter: {index:number , letter:string};
  currentText: string;
  setCurrentLetter : React.Dispatch<React.SetStateAction<{
    index: number;
    letter: string;
}>>
}


function useCharacterDeleteHook({currentText , currentLetter , setCurrentLetter}:TextRenderProps) {
 
  
  return function () {
       if(currentLetter.index > 0){
             setCurrentLetter({
                index: currentLetter.index - 1,
                letter: currentText[currentLetter.index - 1],
              });
       }
  }
}

export default useCharacterDeleteHook