export interface currentLetterType  {
    index:number , 
    letter:string , 
    
}


export type WordHistoryItem = {
  start: number;          // start index of the word
  lastTypedIndex: number; // where the user left off
  end : number ;  // the end index of the word 
};



export type Mode = "time" | "words"  ;


export interface ThemeColors {
  id:number
  isDarkModed : boolean
  name :string
  border:string
  page_bg : string
  red : string
  white  : string
  gray : string
  darkRed : string
  colors : string[] 
    // Button colors
  buttonPrimary: string;
  buttonSecondary: string;
  buttonHover: string;
  buttonDisabled: string;
  // Special colors
  accent: string;
  success: string;
  warning: string;
  info: string;
}


export type soundOptions = 'sound' | 'errorSound' ; 


export type globalStatetype = {
     wrongChars: number[]
     wrongWords: { start: number; end: number }[]
    wordHistory: WordHistoryItem[]
  }



  export type KeyRecord = {

  timestamp: number; // ms relative to session start
  currentLetterIndex: number ;
  isWrong : boolean ;
  isTyped : boolean ;
  isDelete? : boolean ;
};


export interface typingOverModalProps {
  handleReset : () => void ;
  nextText : () => void ;
   wpmFinal: number ; 
   setIsRecordPanelOpen : React.Dispatch<React.SetStateAction<boolean>> ;
    globalState: globalStatetype ;
    setGlobalState: React.Dispatch<React.SetStateAction<globalStatetype>>
    wordHistoryCopyRef: React.RefObject<WordHistoryItem[]>
}