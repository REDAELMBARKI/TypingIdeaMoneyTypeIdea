import { useRef, useState } from "react";
import { ContainerAndFontContext } from "../contexts/ContainerAndFontContext";




const ContainerAndFontContextProvider = ({children}:{children : React.ReactNode}) => {
// text container
  const containerRef = useRef<HTMLDivElement | null>(null);
  // text font size ref
  const fontSizeRef = useRef<number>(40);
  // containerWidth
   const [containerWidth, setContainerWidth] = useState<number>(0);

    return (
        <ContainerAndFontContext.Provider value={{containerRef , fontSizeRef , containerWidth, setContainerWidth}}>
            {children}          
        </ContainerAndFontContext.Provider>
    )
}

export default ContainerAndFontContextProvider ;