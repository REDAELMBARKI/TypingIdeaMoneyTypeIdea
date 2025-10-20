
export const containerWordsRangeFitHanlder = 
(containerRef:React.RefObject<HTMLDivElement | null > 
    ) => {

   let wordsCountAllowed = 0;
let currentLine = 1;

const spans = containerRef.current?.querySelectorAll('span') || [];
if (spans.length === 0) return 0;

let prevY = spans[0].getBoundingClientRect().top;
let line3Y = null;



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
  
  if (span.textContent === "\u00A0" ) {
    wordsCountAllowed++;
  }
}

return wordsCountAllowed;
}