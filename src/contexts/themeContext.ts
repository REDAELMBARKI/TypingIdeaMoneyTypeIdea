

import React from "react";
import type { ThemeColors } from "../types/experementTyping";

interface themeType {
    selectedTheme: ThemeColors ;
    setSelectedTheme : React.Dispatch<React.SetStateAction<ThemeColors>>
}


export const ThemeContext =  React.createContext<themeType | undefined >(undefined);

