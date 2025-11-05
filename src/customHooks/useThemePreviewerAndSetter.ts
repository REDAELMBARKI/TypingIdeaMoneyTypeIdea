import { useEffect } from "react";
import useThemeHook from "./useThemeHook";



const useThemePreviewerAndSetter = () => {
   const { selectedTheme , isThemeConfirmed , previewTheme  , setCurrentTheme  ,currentTheme } = useThemeHook(); 
  
  useEffect(() => {
    setCurrentTheme(previewTheme ?? selectedTheme) ;
  }, [previewTheme]);
 /// theme setter   
  useEffect(() => {
    if(!selectedTheme) return ;
    if(! isThemeConfirmed) return ;
    if(previewTheme) return ;
    setCurrentTheme(selectedTheme);
    localStorage.setItem("selectedTheme", JSON.stringify(selectedTheme))
  }, [selectedTheme , isThemeConfirmed]);


   useEffect(() => {
    if (currentTheme.isDarkModed) {
      document.documentElement.style.removeProperty("color-scheme");
    } else {
      document.documentElement.style.setProperty("color-scheme", "normal");
    }
  }, [currentTheme.isDarkModed]);


}

export default useThemePreviewerAndSetter ;