
import React from "react";
import { ThemeContext } from "./themeContext";
import type { ThemeColors } from "../types/experementTyping";
import { colorThemes } from "../data/themColors";

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {   
    const [selectedTheme, setSelectedTheme] = React.useState<ThemeColors>(localStorage.getItem("selectedTheme") ? 
           JSON.parse(localStorage.getItem("selectedTheme") as string) : colorThemes[0] );
     // theme confirmation boo
   const [ isThemeConfirmed , setIsThemeConfirmed] =  React.useState<boolean>(false) ;
   const [previewTheme , setPreviewTheme] =  React.useState<ThemeColors | null>(null) ;
   const [ isPreviewTheme , setIsPreviewTheme] =  React.useState<boolean>(false) ;
  const [currentTheme , setCurrentTheme] =  React.useState<ThemeColors>(previewTheme ?? selectedTheme) ;
   


    return (
        <ThemeContext.Provider value={{ currentTheme,setCurrentTheme,isPreviewTheme , setIsPreviewTheme ,selectedTheme, setSelectedTheme , isThemeConfirmed , setIsThemeConfirmed , previewTheme , setPreviewTheme}} >
                {children}
        </ThemeContext.Provider>
    )
}


