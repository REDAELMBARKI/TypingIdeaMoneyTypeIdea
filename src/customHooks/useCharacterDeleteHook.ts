import type { currentLetterType, WordHistoryItem } from "../types/maintyping";

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
  setWrongWords: React.Dispatch<React.SetStateAction<{start: number;end: number;}[]>>
  wrongWords :{start: number;end: number;}[];
   wordHistory: WordHistoryItem[] ;
  setWordHistory : React.Dispatch<React.SetStateAction<WordHistoryItem[]>>

}

function useCharacterDeleteHook({
  currentText,
  currentLetter,
  setCurrentLetter,
  wrongChars,
  setWrongChars,
  trachWord ,
  setTrachWord ,
  setWrongWords ,
  wrongWords ,
  wordHistory ,
  setWordHistory
}: TextRenderProps) {
   const handleDeleteChar = () => {
       // pprevent deletin if we pass to next word (no go back if the previous word wass correct )
       //currentText[currentLetter.index - 2] is the last char in previous if that last char index === the last wrongWord then ppreviuos word is wrong 
     
      const isPreviousWordWrong =  wrongWords[wrongWords.length - 1]?.end === currentLetter.index - 2;
   
      
      if((currentText[currentLetter.index - 1] === " " && ! isPreviousWordWrong )|| currentLetter.index === 0 ) return ;
      
     
      
      if(trachWord.length > 0){
        // check if this charactre was wrong already if wrong remove it from wrongindexes
        
        setTrachWord( prev =>prev.slice(0,-1))
        
        return ;
      }
      
     
  
      if (wrongChars.includes(currentLetter.index - 1)) {
          setWrongChars(prev => prev.filter(
            (i) => i !== currentLetter.index - 1
          ));
      }


      // go back to index where we left off the previous word
      if (wordHistory.length > 0 &&
     (currentText[currentLetter.index - 1] === " " ||
      currentLetter.index === wordHistory[wordHistory.length - 1].lastTypedIndex)) {
        setWordHistory(prev => {
          const copy = [...prev] 
          const lastBreakedWord = copy.pop();

          if(  lastBreakedWord &&
        currentLetter.index !== lastBreakedWord.lastTypedIndex &&
        currentLetter.index !== lastBreakedWord.lastTypedIndex + 1){
            setCurrentLetter({
                  index: lastBreakedWord!.lastTypedIndex,
                  letter: currentText[lastBreakedWord!.lastTypedIndex]  || ""
                  });
                
              
            // removes the word from wrong words as its now the current word
           
             
            setWrongWords(prev => prev.filter(el => !(el.start <= lastBreakedWord!.lastTypedIndex && el.end >=  lastBreakedWord!.lastTypedIndex)) )
            
            
           
            return copy;
          }
          
          return copy ;
          
        })
       
      
        return;
      }

      
       
          
      // is thihs ok adding this layer so the lefted or upoped onse be poped here i m afraid this to be a bad code 
        const misPopedWrongWords =  wrongWords.filter(el => el.start >= currentLetter.index ) ;
            
              if(misPopedWrongWords.length > 0){
                  setWrongWords(prev => prev.filter(el => ! (misPopedWrongWords.some(misPoped => misPoped.start === el.start )) ))
              }
  
      
      setCurrentLetter((prev) => ({
        index: prev.index - 1,
        letter: currentText[prev.index - 1] 
        }));
      
       // removes the word from wrong words as its now the current word
      setWrongWords(prev => prev.filter(el => el.end + 1 !== currentLetter.index - 1))
    
          
  };

  


  return handleDeleteChar ; 
}

export default useCharacterDeleteHook;
