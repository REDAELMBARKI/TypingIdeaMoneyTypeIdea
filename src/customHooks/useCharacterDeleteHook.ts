import useLiveDataContext from "../contextHooks/useLiveDataContext";

interface TextRenderProps {
   
  trachWord: string[];
  setTrachWord: React.Dispatch<React.SetStateAction<string[]>>;
  setTypedWordsAmount: React.Dispatch<React.SetStateAction<number>>;
}

function useCharacterDeleteHook({

  trachWord,
  setTrachWord,
  
  setTypedWordsAmount,
}: TextRenderProps) {
  const {globalState , globalState : {wrongChars, wrongWords, wordHistory } , currentLetter  , currentText  , setGlobalState ,setCurrentLetter } =  useLiveDataContext() ;
  
  
  const handleDeleteChar = () => {
    const currentIndex = currentLetter.index;

    // Early return: can't delete at position 0
    if (currentIndex === 0) return;

    // Early return: prevent deletion if we're at a space and previous word was correct
    const isPreviousWordWrong =
      wrongWords[wrongWords.length - 1]?.end === currentIndex - 2;

    if (currentText[currentIndex - 1] === " " && !isPreviousWordWrong) {
      return;
    }

    // Case 1: Deleting extra characters (trachWord)
    if (trachWord.length > 0) {
      setTrachWord((prev) => prev.slice(0, -1));
      return;
    }

    // Case 2: Word history restoration logic
    if (
      wordHistory.length > 0 &&
      (currentText[currentIndex - 1] === " " ||
        currentIndex === wordHistory[wordHistory.length - 1].lastTypedIndex)
    ) {
      // Reduce typed words if at space
      if (currentText[currentIndex - 1] === " ") {
        setTypedWordsAmount((prev) => Math.max(0, prev - 1));
      }

      // Calculate all changes in one go
      const historyCopy = [...wordHistory];
      const lastBreakedWord = historyCopy.pop();

      if (
        lastBreakedWord &&
        currentIndex !== lastBreakedWord.lastTypedIndex &&
        currentIndex !== lastBreakedWord.lastTypedIndex + 1
      ) {
        // Restore cursor to the saved position
        setCurrentLetter({
          index: lastBreakedWord.lastTypedIndex,
          letter: currentText[lastBreakedWord.lastTypedIndex] || "",
        });

        // Update global state with both history and wrongWords
        setGlobalState({
          ...globalState,
          wordHistory: historyCopy,
          wrongWords: wrongWords.filter(
            (el) => !(el.start <= lastBreakedWord.end && el.end >= lastBreakedWord.start)
          ),
        });

        return;
      }

      // Just pop from history without cursor restoration
      setGlobalState({
        ...globalState,
        wordHistory: historyCopy,
      });

      return;
    }

    // Case 3: Normal deletion - CALCULATE EVERYTHING FIRST, UPDATE ONCE
    let newWrongChars = [...wrongChars];
    let newWrongWords = [...wrongWords];

    // Remove current index from wrong chars if it was marked wrong
    if (newWrongChars.includes(currentIndex - 1)) {
      newWrongChars = newWrongChars.filter((i) => i !== currentIndex - 1);
    }

    // Remove wrong word if we're deleting back into it
    newWrongWords = newWrongWords.filter((el) => el.end + 1 !== currentIndex - 1);

    // Clean up mis-popped wrong words (ahead of current position)
    const misPopedWrongWords = newWrongWords.filter((el) => el.start >= currentIndex);
    if (misPopedWrongWords.length > 0) {
      newWrongWords = newWrongWords.filter(
        (el) => !misPopedWrongWords.some((misPoped) => misPoped.start === el.start)
      );
    }

    // Update global state with all changes at once
    setGlobalState({
      ...globalState,
      wrongChars: newWrongChars,
      wrongWords: newWrongWords,
    });

    // Update cursor position
    setCurrentLetter({
      index: currentIndex - 1,
      letter: currentText[currentIndex - 1],
    });

    // Reduce typed words count if deleting a space
    if (currentText[currentIndex - 1] === " ") {
      setTypedWordsAmount((prev) => Math.max(0, prev - 1));
    }
  };

  return handleDeleteChar;
}

export default useCharacterDeleteHook;