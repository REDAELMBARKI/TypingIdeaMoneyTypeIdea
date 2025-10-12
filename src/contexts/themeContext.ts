

import React from "react";
import type { ThemeColors } from "../types/experementTyping";

interface themeType {
    selectedTheme: ThemeColors ;
    setSelectedTheme : React.Dispatch<React.SetStateAction<ThemeColors>>
    setIsThemeConfirmed: React.Dispatch<React.SetStateAction<boolean>>
    isThemeConfirmed : boolean ;
    setPreviewTheme: React.Dispatch<React.SetStateAction<ThemeColors | null>> 
    previewTheme : ThemeColors | null ;
    isPreviewTheme : boolean ;
    setIsPreviewTheme : React.Dispatch<React.SetStateAction<boolean>>
    setCurrentTheme: React.Dispatch<React.SetStateAction<ThemeColors>>
    currentTheme : ThemeColors
}


export const ThemeContext =  React.createContext<themeType | undefined >(undefined);

