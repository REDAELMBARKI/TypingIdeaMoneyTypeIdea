import { sampleTexts } from './../data/texts';





export const sliceWordsHandler = (textArrayStartIndex:number,wordsCount:number) => {
     // console.log("slicing from ",textArrayStartIndex," to ",wordsCount) ;
     return sampleTexts[0].split(" ").slice(textArrayStartIndex , wordsCount + 1).join(' ') ;
}
