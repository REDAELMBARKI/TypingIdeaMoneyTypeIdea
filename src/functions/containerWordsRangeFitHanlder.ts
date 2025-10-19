
// export const containerWordsRangeFitHanlder = 
// (containerRef:React.RefObject<HTMLDivElement | null >
//     ) => {

//     let wordsCountAllowed:number = 0 ;
//           let currentLine = 1 ;
      
//           const spans = containerRef.current?.querySelectorAll('span') || [] ;
//           if (spans.length === 0) return 0;
//           let prevY = spans[0].getBoundingClientRect().top ;
//           let line3Y = null ; // the last laine Y

//           for (let i = 0; i < spans.length; i++) {
//                 const span = spans[i] ;
//                 const currentY = span.getBoundingClientRect().top;
//                  if(currentY != prevY ) {
//                         currentLine++ ;
//                         prevY = currentY;
                       

//                   }
//                   if (currentLine > 3 ) break ;


                
//                 if(currentLine === 3 && line3Y === null ) {
//                     line3Y = currentY ;
//                 }

                
//                 if(span.textContent == "\u00A0") {
//                   const lastCharIndex = i - 1;
//                   const lastCharY = spans[lastCharIndex].getBoundingClientRect().top;
      
//                   if (line3Y === null || lastCharY <= line3Y) {
//                   wordsCountAllowed++;
//                   } else {
//                   // Last char is on line 4, stop counting
//                   break;
//                   }
//                 }



               
//           }
 
//           return wordsCountAllowed ;
// }



export const containerWordsRangeFitHanlder = 
(containerRef:React.RefObject<HTMLDivElement | null > , 
      containerWidth : number
    ) => {

   let wordsCountAllowed = 0;
let currentLine = 1;
let sizeCum = 0;

const spans = containerRef.current?.querySelectorAll('span') || [];
if (spans.length === 0) return 0;

let prevY = spans[0].getBoundingClientRect().top;
let line3Y = null;

// Calculate the longest word width as buffer
let longestWordWidth = 0;
let currentWordWidth = 0;

for (let i = 0; i < spans.length; i++) {
  const span = spans[i];
  
  if (span.textContent === "\u00A0") {
    // End of word, check if it's the longest
    if (currentWordWidth > longestWordWidth) {
      longestWordWidth = currentWordWidth;
    }
    currentWordWidth = 0;
  } else {
    currentWordWidth += span.offsetWidth;
  }
}

// Now do your main loop with dynamic buffer
for (let i = 0; i < spans.length; i++) {
  const span = spans[i];
  const currentY = span.getBoundingClientRect().top;
  
  if (currentY !== prevY) {
    currentLine++;
    prevY = currentY;
  }
  
  if (currentLine > 3) break;
  
  if (currentLine === 3 && line3Y === null) {
    line3Y = currentY;
  }
  
  if (currentLine === 3) {
    sizeCum += span.offsetWidth;
  }
  
  if (span.textContent === "\u00A0" && sizeCum < containerWidth - longestWordWidth) {
    wordsCountAllowed++;
  }
}

return wordsCountAllowed;
}