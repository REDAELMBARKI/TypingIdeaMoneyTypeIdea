import type { currentLetterType } from "../types/maintyping";

interface CheckFuncPropsType {
    currentLetter:currentLetterType ;
    currentText : string;
    wrongChars:number[];
}
export const checkIfPreviousWordHasError = ({currentLetter , currentText , wrongChars}:CheckFuncPropsType) => {
  let i = currentLetter.index - 1;
  const wordIndexes: number[] = [];

  // collect all indexes of the previous word
  while (i >= 0 && currentText[i] !== ' ') {
    wordIndexes.push(i);
    i--;
  }

  console.log(wordIndexes.some(index => wrongChars.includes(index)))
  // check if any index is in wrongChars
  return wordIndexes.some(index => wrongChars.includes(index));
};