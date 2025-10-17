import { sampleTexts } from './../data/texts';





export const sliceWordsHandler = (wordsCount:number) => {
    
     return sampleTexts[0].split(" ").slice(0 , wordsCount + 1).join(' ') ;
}
