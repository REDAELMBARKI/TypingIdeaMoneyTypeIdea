import { sampleTexts } from './../data/texts';





export const sliceWordsHandler = (textArrayStartIndex:number ,wordsCount:number) => {
     console.log('from' , textArrayStartIndex , 'end' , wordsCount)
     return sampleTexts[0].split(" ").slice(textArrayStartIndex , textArrayStartIndex + wordsCount + 1).join(' ') ;
}
