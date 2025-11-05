
interface containerWordsProps  {
     containerRef:React.RefObject<HTMLDivElement | null > 
      line3YRef : React.RefObject<{top : number } | null>
    }
export const containerWordsRangeFitHandler = ({containerRef , line3YRef}:containerWordsProps ) => {

   let wordsCountAllowed = 0;
let currentLine = 1;

const words = containerRef.current?.querySelectorAll('.word') || [];

if (words.length === 0) return 0;

let prevY = words[0].getBoundingClientRect().top;
let line3Y = null;


// Now do your main loop with dynamic buffer
for (let i = 0; i < words.length; i++) {
  const word = words[i];
  const currentY = word.getBoundingClientRect().top;
  

  if (currentY !== prevY) {
    currentLine++;
    prevY = currentY;
  }
  
  if (currentLine > 3) break;
  
  if (currentLine === 3 && line3Y === null) {
    
    line3Y = currentY;
    line3YRef.current = {top : line3Y } ;
    
  }

  wordsCountAllowed++;
  
}

return wordsCountAllowed;
}