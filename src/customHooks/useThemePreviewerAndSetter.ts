import { useEffect } from "react";
import useThemeHook from "./useThemeHook";



const useThemePreviewerAndSetter = () => {
   const { selectedTheme , isThemeConfirmed , previewTheme  , setCurrentTheme  } = useThemeHook(); 
  
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

}

export default useThemePreviewerAndSetter ;