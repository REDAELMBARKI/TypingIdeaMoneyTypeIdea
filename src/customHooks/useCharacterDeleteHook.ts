import type { currentLetterType } from "../types/maintyping";

interface TextRenderProps {
  currentLetter: currentLetterType;
  currentText: string;
  setCurrentLetter: React.Dispatch<
    React.SetStateAction<{
      index: number;
      letter: string;
      indexBeforeError: number | null;
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
    if (currentLetter.index > 0) {
      // check if this charactre was wrong already if wrong remove it from wrongindexes
      
       if(trachWord.length > 0){

        setTrachWord( prev =>prev.slice(0,-1))

        return ;
      }
   
      
      
      setWrongWords(prev => prev.filter(el => el.end + 1 !== currentLetter.index - 1))
      
      
      if (wrongChars.includes(currentLetter.index - 1)) {
        setWrongChars(prev => prev.filter(
          (i) => i !== currentLetter.index - 1
        ));
      }
       

      setCurrentLetter((prev) => ({
      index: prev.index - 1,
      letter: currentText[prev.index - 1] || "",
      indexBeforeError: null,
      }));
      
      

     
    }
  };

  


  return handleDeleteChar ; 
}

export default useCharacterDeleteHook;
