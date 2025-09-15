
import React, { useEffect , useState } from "react";
import useThemeHook from "./useThemeHook";

interface TextRenderProps {
  currentLetter: {index:number , letter:string};
  currentText: string;
  inputValue : string
}


export const useTextRender = ({currentText , currentLetter , inputValue}:TextRenderProps) => {
    const [lastIndexReached , setLastIndexReached] = React.useState<number>(currentLetter.index);
    const [wrongChars , setWrongChars] = useState<number[]>([]);


    const {isDarkMode} = useThemeHook();

    useEffect(() => {
        setLastIndexReached(currentLetter.index);
    }, [currentLetter]);
    
    useEffect(()=>{
           if(inputValue === '') return ;
           if(currentLetter.letter !== currentText[currentLetter.index] ){
                setWrongChars(prev => {
                if (prev.includes(currentLetter.index)) return prev;
                return [...prev, currentLetter.index];
                
              });
           }
    },[currentLetter])
  
    return currentText.split('').map((char, index) => {
      let className = 'transition-all duration-150 ';
      
      
      if (index === currentLetter.index) {
        // Current letter highlighting (placeholder logic)
        if(char === currentLetter.letter){
            // className += isDarkMode 
            //   ? 'bg-yellow-500 text-white rounded-sm' 
            //   : 'bg-yellow-500 text-white rounded-sm';
        }
        if(char !== currentLetter.letter && inputValue !== '' ){
          
            className += isDarkMode 
              ? 'text-red-500  rounded-sm' 
              : 'text-red-500  rounded-sm';
        }
      }
  
      if (index > lastIndexReached || inputValue === '') {
              // Untyped letters
              className += isDarkMode 
                ? 'text-gray-400' 
                : 'text-gray-600';
          }else{
 
                if(wrongChars.includes(index)){
                     className +="text-red-500"
                }
          }
      
  
      return (
        <span key={index} className={`px-[1px] ${className} ${
          inputValue !== '' &&
          index === currentLetter.index + 1 ? 

          'display-indicator' : inputValue === '' ?  index === currentLetter.index ? 'display-indicator' : '' : ''  }` }>
          {char === ' ' ? '\u00A0' :  char}
        </span>
      )

     
    });
  };