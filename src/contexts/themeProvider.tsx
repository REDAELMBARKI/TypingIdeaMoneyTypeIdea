
import React from "react";
import { ThemeContext } from "./themeContext";

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({children}) => {   
    const [isDarkMode, setIsDarkMode] = React.useState<boolean>(false);


    return (
        <ThemeContext.Provider value={{isDarkMode, setIsDarkMode}} >
                {children}
        </ThemeContext.Provider>
    )
}


