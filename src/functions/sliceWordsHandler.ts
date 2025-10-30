import { sampleTexts } from './../data/texts';





export const sliceWordsHandler = (textArrayStartIndex:number ,wordsCount:number) => {
     const slicedTxt = sampleTexts[0].split(" ").slice(textArrayStartIndex , textArrayStartIndex + wordsCount + 1).join(' ') ; 
     return slicedTxt ;
}
