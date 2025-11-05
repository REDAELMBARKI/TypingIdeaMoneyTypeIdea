

import  { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";



export default function useThemeHook(){
      const selectedTheme = useContext(ThemeContext) ;


      

      if(!selectedTheme){
        throw new Error("selectedThem  must be used within a themContextProvider");
      }


      return selectedTheme;
}