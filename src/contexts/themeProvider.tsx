
import React from "react";
import { ThemeContext } from "./themeContext";
import type { ThemeColors } from "../types/experementTyping";
import { colorThemes } from "../data/themColors";

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {   
    const [selectedTheme, setSelectedTheme] = React.useState<ThemeColors>(colorThemes[5]);


    return (
        <ThemeContext.Provider value={{selectedTheme, setSelectedTheme}} >
                {children}
        </ThemeContext.Provider>
    )
}


