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
  setTrachWord:React.Dispatch<React.SetStateAction<string[]>>
}

function useCharacterDeleteHook({
  currentText,
  currentLetter,
  setCurrentLetter,
  wrongChars,
  setWrongChars,
  trachWord ,
  setTrachWord
}: TextRenderProps) {
   const handleDeleteChar = () => {
    if (currentLetter.index > 0) {
      // check if this charactre was wrong already if wrong remove it from wrongindexes
      
      //  console.log("calling delee func")
       if(trachWord.length > 0){

        setTrachWord( prev =>prev.slice(0,-1))

        return ;
      }
  

      if (wrongChars.includes(currentLetter.index - 1)) {
        
        const newArrayOfWrongs = wrongChars.filter(
          (i) => i !== currentLetter.index - 1
        );
        setWrongChars(newArrayOfWrongs);


        
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
