import { sampleTexts } from './../data/texts';





export const sliceWordsHandler = (textArrayStartIndex: number, wordsCount: number, sessionWordsCount: number) => {
  const initText = sampleTexts[0].split(' ').slice(0, sessionWordsCount).join(' ')
 
  const textArray = initText.split(/(\s+)/);
  
  const startIndex = textArrayStartIndex * 2;
  const endIndex = (textArrayStartIndex + wordsCount) * 2 + 1; // *2 becuse spapces allso included spaces are words also 

  
  const slicedArray = textArray.slice(startIndex, endIndex);
  
  const result = slicedArray.join('');
  
  return result;
}