import { useRef, useEffect } from "react";
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
  setTypedWordsAmount: React.Dispatch<React.SetStateAction<number>>;
  typedWordsAmount: number;
}

function useCharacterDeleteHookV2({
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
  setTypedWordsAmount,
  typedWordsAmount,
}: TextRenderProps) {
  // Store the latest state values in a ref
  const stateRef = useRef({
    currentLetter,
    wrongChars,
    trachWord,
    wrongWords,
    wordHistory,
    typedWordsAmount,
  });

  // Keep ref synchronized with latest props
  useEffect(() => {
    stateRef.current = {
      currentLetter,
      wrongChars,
      trachWord,
      wrongWords,
      wordHistory,
      typedWordsAmount,
    };
  });

  const handleDeleteChar = () => {
    // Get fresh state from ref
    const current = stateRef.current;
    const currentIndex = current.currentLetter.index;

    // Early return: can't delete at position 0
    if (currentIndex === 0) return;

    // Early return: prevent deletion if we're at a space and previous word was correct
    const isPreviousWordWrong =
      current.wrongWords[current.wrongWords.length - 1]?.end === currentIndex - 2;

    if (currentText[currentIndex - 1] === " " && !isPreviousWordWrong) {
      return;
    }

    // Case 1: Deleting extra characters (trachWord)
    if (current.trachWord.length > 0) {
      const newTrachWord = current.trachWord.slice(0, -1);
      setTrachWord(newTrachWord);
      stateRef.current.trachWord = newTrachWord;
      return;
    }

    // Calculate new values
    let newIndex = currentIndex - 1;
    let newWrongChars = [...current.wrongChars];
    let newWrongWords = [...current.wrongWords];
    let newWordHistory = [...current.wordHistory];
    let newTypedWordsAmount = current.typedWordsAmount;

    // Remove current index from wrong chars if it was marked wrong
    if (newWrongChars.includes(currentIndex - 1)) {
      newWrongChars = newWrongChars.filter((i) => i !== currentIndex - 1);
    }

    // Case 2: Restoring from word history (going back to a skipped word)
    // Only trigger when we're at a space boundary
    if (
      current.wordHistory.length > 0 &&
      currentText[currentIndex - 1] === " "
    ) {
      const lastBreakedWord = newWordHistory[newWordHistory.length - 1];

      // Only restore if this space is right after a skipped word
      // Check if the space we're at is immediately after the last broken word
      if (
        lastBreakedWord &&
        currentIndex - 1 === lastBreakedWord.end + 1
      ) {
        // Restore index to where we left off in that word
        newIndex = lastBreakedWord.lastTypedIndex;

        // Remove the word from history
        newWordHistory.pop();

        // Remove overlapping wrong words
        newWrongWords = newWrongWords.filter(
          (el) => !(el.start <= lastBreakedWord.end && el.end >= lastBreakedWord.start)
        );

        // Reduce typed words count
        newTypedWordsAmount = Math.max(0, newTypedWordsAmount - 1);

        // Apply all updates
        setCurrentLetter({
          index: newIndex,
          letter: currentText[newIndex] || "",
        });
        setWrongWords(newWrongWords);
        setWordHistory(newWordHistory);
        setTypedWordsAmount(newTypedWordsAmount);

        // Update ref immediately
        stateRef.current = {
          currentLetter: { index: newIndex, letter: currentText[newIndex] || "" },
          wrongChars: newWrongChars,
          trachWord: current.trachWord,
          wrongWords: newWrongWords,
          wordHistory: newWordHistory,
          typedWordsAmount: newTypedWordsAmount,
        };

        return;
      }
    }

    // Case 3: Normal deletion flow

    // Remove wrong word if we're deleting back into it
    newWrongWords = newWrongWords.filter((el) => el.end + 1 !== currentIndex - 1);

    // Clean up any wrong words that are ahead of current position (mis-popped words)
    const misPopedWrongWords = newWrongWords.filter((el) => el.start >= currentIndex);
    if (misPopedWrongWords.length > 0) {
      newWrongWords = newWrongWords.filter(
        (el) => !misPopedWrongWords.some((misPoped) => misPoped.start === el.start)
      );
    }

    // Reduce typed words count if we're deleting a space
    if (currentText[currentIndex - 1] === " ") {
      newTypedWordsAmount = Math.max(0, newTypedWordsAmount - 1);
    }

    // Apply all updates
    setCurrentLetter({
      index: newIndex,
      letter: currentText[newIndex],
    });
    setWrongChars(newWrongChars);
    setWrongWords(newWrongWords);
    setTypedWordsAmount(newTypedWordsAmount);

    // Update ref immediately for rapid successive deletes
    stateRef.current = {
      currentLetter: { index: newIndex, letter: currentText[newIndex] },
      wrongChars: newWrongChars,
      trachWord: current.trachWord,
      wrongWords: newWrongWords,
      wordHistory: newWordHistory,
      typedWordsAmount: newTypedWordsAmount,
    };
  };

  return handleDeleteChar;
}

export default useCharacterDeleteHookV2;