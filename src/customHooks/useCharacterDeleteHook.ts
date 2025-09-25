import type { currentLetterType } from "../types/maintyping";

interface TextRenderProps {
  currentLetter: currentLetterType;
  currentText: string;
  setCurrentLetter: React.Dispatch<
    React.SetStateAction<{
      index: number;
      letter: string;
    }>
  >;
  wrongChars: number[];
  setWrongChars: React.Dispatch<React.SetStateAction<number[]>>;
  trachWord:string[] ;
  setTrachWord:React.Dispatch<React.SetStateAction<string[]>> ;
  setWrongWords: React.Dispatch<React.SetStateAction<{
    start: number;
    end: number;
}[]>>
}

function useCharacterDeleteHook({
  currentText,
  currentLetter,
  setCurrentLetter,
  wrongChars,
  setWrongChars,
  trachWord ,
  setTrachWord ,
  setWrongWords
}: TextRenderProps) {
   const handleDeleteChar = () => {
      if (currentLetter.index <= 0) return ;
    
      if(trachWord.length > 0){
        // check if this charactre was wrong already if wrong remove it from wrongindexes
        setTrachWord( prev =>prev.slice(0,-1))

        return ;
      }
   

      // removes the word from wrog words as its now the current word
      setWrongWords(prev => prev.filter(el => el.end + 1 !== currentLetter.index - 1))
      
      
      if (wrongChars.includes(currentLetter.index - 1)) {
        setWrongChars(prev => prev.filter(
          (i) => i !== currentLetter.index - 1
        ));
      }
       
      setCurrentLetter((prev) => ({
      index: prev.index - 1,
      letter: currentText[prev.index - 1] 
      }));
      
    
  };

  


  return handleDeleteChar ; 
}

export default useCharacterDeleteHook;
