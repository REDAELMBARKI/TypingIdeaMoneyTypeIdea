import { useRef } from "react";
import { ContainerAndFontContext } from "../contexts/ContainerAndFontContext";




const ContainerAndFontContextProvider = ({children}:{children : React.ReactNode}) => {
// text container
  const containerRef = useRef<HTMLDivElement | null>(null);
  // text font size ref
  const fontSizeRef = useRef<number>(40);
  // underline ref
    return (
        <ContainerAndFontContext.Provider value={{containerRef , fontSizeRef}}>
            {children}          
        </ContainerAndFontContext.Provider>
    )
}

export default ContainerAndFontContextProvider ;