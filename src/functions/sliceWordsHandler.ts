import { sampleTexts } from './../data/texts';





export const sliceWordsHandler = (textArrayStartIndex:number,wordsCount:number) => {

     return sampleTexts[0].split(" ").slice(textArrayStartIndex , wordsCount + 1).join(' ') ;
}
