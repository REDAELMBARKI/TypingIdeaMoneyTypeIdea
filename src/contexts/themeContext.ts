

import React from "react";

interface themeType {
    isDarkMode: boolean;
    setIsDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}


export const ThemeContext =  React.createContext<themeType | undefined >(undefined);

