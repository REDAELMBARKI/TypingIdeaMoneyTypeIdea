
import type { currentLetterType, WordHistoryItem } from "../types/experementTyping";

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
  trachWord: string[];
  setTrachWord: React.Dispatch<React.SetStateAction<string[]>>;
  setWrongWords: React.Dispatch<
    React.SetStateAction<{ start: number; end: number }[]>
  >;
  wrongWords: { start: number; end: number }[];
  wordHistory: WordHistoryItem[];
  setWordHistory: React.Dispatch<React.SetStateAction<WordHistoryItem[]>>;
  setTypedWordsAmount : React.Dispatch<React.SetStateAction<number>>;
}

function useCharacterDeleteHook({
  currentText,
  currentLetter,
  setCurrentLetter,
  wrongChars,
  setWrongChars,
  trachWord,
  setTrachWord,
  setWrongWords,
  wrongWords,
  wordHistory,
  setWordHistory,
  setTypedWordsAmount
}: TextRenderProps) {
  const handleDeleteChar = () => {
    // pprevent deletin if we pass to next word (no go back if the previous word wass correct )
    //currentText[currentLetter.index - 2] is the last char in previous if that last char index === the last wrongWord then ppreviuos word is wrong

    const isPreviousWordWrong =
      wrongWords[wrongWords.length - 1]?.end === currentLetter.index - 2;

    if (
      (currentText[currentLetter.index - 1] === " " && !isPreviousWordWrong) ||
      currentLetter.index === 0
    )
      return;

    if (trachWord.length > 0) {
      // check if this charactre was wrong already if wrong remove it from wrongindexes

      setTrachWord((prev) => prev.slice(0, -1));

      return;
    }

    // delete the word from wrong chars (the chars indexes the char by char) ;
    if (wrongChars.includes(currentLetter.index - 1)) {
      setWrongChars((prev) =>
        prev.filter((i) => i !== currentLetter.index - 1)
      );
    }

    // go back to index where we left off the previous word (delete from wrong words the histored wourds or the words that gets jumped )
    if (
      wordHistory.length > 0 &&
      (currentText[currentLetter.index - 1] === " " ||
        currentLetter.index ===
          wordHistory[wordHistory.length - 1].lastTypedIndex)
    ) {

      // brestorete the typed words -- 
          // reduce the amount of typed words 
            if(currentText[currentLetter.index - 1] == " "){
              setTypedWordsAmount((prev) =>   Math.max(0 , prev - 1 ) )    
            }

      
      // remove the word from history avoiding mutation here and copy the old array an pop from the copy and set the state again 
      setWordHistory((prev) => {
        const copy = [...prev];
        const lastBreakedWord = copy.pop();

        if (
          lastBreakedWord &&
          currentLetter.index !== lastBreakedWord.lastTypedIndex &&
          currentLetter.index !== lastBreakedWord.lastTypedIndex + 1
        ) {
 

   


          // set the index cursor to theindex we stored (the last index before jumpping to next word )
          setCurrentLetter(() => {
            
            return {

            index: lastBreakedWord!.lastTypedIndex,
            letter: currentText[lastBreakedWord!.lastTypedIndex] || "",
          }
          }
        );

          
          
          // removes the word from wrong words as its now the current word
          // remove any wrongWords that overlap the popped word
          setWrongWords(prevWrong => 
            // fresh overlap removal
           ( prevWrong.filter(
              (el) => !(el.start <= lastBreakedWord.end && el.end >= lastBreakedWord.start)
            ))

       
          );

          

          return copy;
        }

        return copy;
      });

      return;
    }

    // removes the word from wrong words as its now the current word (normal flow the word is not in history words it fully typed by the user )
    setWrongWords((prev) =>
      prev.filter((el) => el.end + 1 !== currentLetter.index - 1)
    );

    // this is an other layaer deletes the wrongs chars tha did not get pop up in cases of long delete clicks (just fo)
    const misPopedWrongWords =  wrongWords.filter(el => el.start >= currentLetter.index ) ;

    if(misPopedWrongWords.length > 0){
        setWrongWords(prev => prev.filter(el => ! (misPopedWrongWords.some(misPoped => misPoped.start === el.start )) ))
    }
    //////////////////////////////////////////////////////////////////////////

    setCurrentLetter((prev) => {   
      return { 
      index: prev.index - 1,
      letter: currentText[prev.index - 1],
     }
  
    });
   
    
    // // reduce the amount of typed words 
    if(currentText[currentLetter.index - 1] == " "){
      setTypedWordsAmount((prev) =>   Math.max(0 , prev - 1 ) )    
    }
  


   
  };

  return handleDeleteChar;
}

export default useCharacterDeleteHook;
