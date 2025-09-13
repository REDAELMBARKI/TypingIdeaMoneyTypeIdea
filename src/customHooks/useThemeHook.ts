

import  { useContext } from "react";
import { ThemeContext } from "../contexts/themeContext";



export default function useThemeHook(){
      const theme = useContext(ThemeContext) ;


      if(!theme){
        throw new Error("useThemeContext must be used within a ThemeProvider");
      }


        return theme;
}