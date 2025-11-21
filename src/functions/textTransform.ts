import { getRandomNumber } from "./getRandomNumber";

export const useTextTransformer = () => {
    

// numbers 
const addNumbersToText = (prevTxt: string) => {
    const transformArray = prevTxt.split(/(\s+)/);
    
    // get indices of actual words (no whitespace)
    const wordIndices: number[] = [];
    transformArray.forEach((item, index) => {
        if (!/^\s*$/.test(item)) wordIndices.push(index);
    });

    // Pick how many numbers to insert upp to 10% to 20%
    const numberOfInsertions = Math.floor(wordIndices.length * (Math.random() * 0.2 + 0.1));

    // Shuffle and pick random positions
    const shuffled = wordIndices.sort(() => Math.random() - 0.5);
    const selectedIndices = shuffled.slice(0, numberOfInsertions);

    // Add numbers at those positions
    selectedIndices.forEach(i => {
        const number = getRandomNumber()
        transformArray[i] = transformArray[i] + " " + number;
    });

    return transformArray.join("");
}

const removeNumbersFromText = (prevTxt:string) => { 
  return prevTxt.replace(/\s+\d+/g, '');
} 

// end numbers 

// puctuation
const addPunctuationToText = (prevTxt: string) => {
    const textArray = prevTxt.split(/(\s+)/);

    for (let i = 0; i < textArray.length; i++) {
        if (/^\s*$/.test(textArray[i])) continue;

        // 15% chance to capitalize each word
        if (Math.random() < 0.15) {
            textArray[i] = textArray[i].replace(/^[a-z]/, (match) => match.toUpperCase());
        }
    }

    return textArray.join('');
}

const removePunctuationFromText =  (prevTxt:string) => {
return prevTxt.replace(/[A-Z]/g , (match)=> match.toLowerCase() )
    
}

// end punctuation

// quotation 
const addQuotesToText = (prevTxt: string) => {
    const textArray = prevTxt.split(/(\s+)/);
    const quotes = ['.', ','];
    const quotes2 = ['"', "'"] ;
    
    // Get actual word count
    const wordIndices = textArray
        .map((item, index) => (/^\s*$/.test(item) ? -1 : index))
        .filter(i => i !== -1);

    if (wordIndices.length === 0) return prevTxt;

    // Guarantee at least 3 quote for short texts
    const minQuotes = Math.floor(Math.random() * 3 ) + 3 ;
    const maxQuotes = Math.max(minQuotes, Math.floor(wordIndices.length * 0.15));
    const numQuotes = Math.floor(Math.random() * (maxQuotes - minQuotes + 1)) + minQuotes;

    // Pick random word positions
    const shuffled = [...wordIndices].sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, numQuotes);

    selected.forEach(i => {
        let randomQuote = ''
        const roll = Math.random() ;
        if(roll < 0.5){
          randomQuote =  quotes[Math.floor(Math.random() * quotes.length)];
        }else{
           randomQuote =  quotes2[Math.floor(Math.random() * quotes2.length)];
        }
        textArray[i] = textArray[i] + randomQuote;
    });

    return textArray.join('');
}


const removeQuotesFromText =  (prevTxt:string) => {
  return   prevTxt.replace(/[,.?!'"`]/g , '' )

}
// end quotation 



// const addSymbolsToText : (currentText:string) => string = (currentText:string) => {

// return ''

// } 

return {addNumbersToText , removeNumbersFromText , 
       addPunctuationToText , removePunctuationFromText ,
       addQuotesToText , removeQuotesFromText
       }












}