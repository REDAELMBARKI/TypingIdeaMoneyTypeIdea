import { createContext } from "react";



type ContainerAndFontContextType = {
    containerRef: React.RefObject<HTMLDivElement | null> ; 
    fontSizeRef: React.RefObject<number> 
    setContainerWidth: React.Dispatch<React.SetStateAction<number>> 
    containerWidth: number
}
export const ContainerAndFontContext = createContext<ContainerAndFontContextType | undefined>(undefined) ;  
