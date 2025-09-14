import { Indent } from "lucide-react";
import useThemeHook from "./useThemeHook";






interface TextRenderProps {
  currentLetter: {index:number , letter:string};
  currentText: string;
}
export const useTextRender = ({currentText , currentLetter}:TextRenderProps) => {

    const {isDarkMode} = useThemeHook();
    return currentText.split('').map((char, index) => {
      let className = 'transition-all duration-150 ';
      console.log( 'CURRENT LETTER INDEX' , currentLetter.index);
      console.log( 'char INDEX' ,index);

      const parralelIndex = currentText.indexOf(currentLetter.letter) ;

      if (parralelIndex === currentLetter.index) {
        // Current letter highlighting (placeholder logic)
        if(char === currentLetter.letter){
            className += isDarkMode 
              ? 'text-green-500 text-white rounded-sm' 
              : 'text-green-500 text-white rounded-sm';
        }
        
     
      } else if (index < currentLetter.index) {
        // Typed letters (placeholder logic)
        className += isDarkMode 
          ? 'text-green-400' 
          : 'text-green-600';
      } else {
        // Untyped letters
        className += isDarkMode 
          ? 'text-gray-400' 
          : 'text-gray-600';
      }

      return (
        <span key={index} className={className}>
          {char === ' ' ? '\u00A0' : char}
        </span>
      );
    });
  };