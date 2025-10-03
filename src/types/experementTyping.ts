export interface currentLetterType  {
    index:number , 
    letter:string , 
    
}


export type WordHistoryItem = {
  start: number;          // start index of the word
  lastTypedIndex: number; // where the user left off
  end : number ;  // the end index of the word 
};



export type Mode = "time" | "words";
