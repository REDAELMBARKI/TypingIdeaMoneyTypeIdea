import { useRef, useState, type JSX } from "react";
import { ReplayDataContext } from "../contexts/ReplayDataContext";
import { replayTextRenderer } from "../functions/replayTextTRenderer";
import useLiveDataContext from "../contextHooks/useLiveDataContext";
import useThemeHook from "../customHooks/useThemeHook";



const ReplayDataContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

     // recorded session typing modal
  const [isRecordPanelOpen,setIsRecordPanelOpen] = useState<boolean>(false);
  const [isRecordActive,setIsRecordActive] =  useState<boolean>(false);
  // rendered text 
  const {currentText} = useLiveDataContext() ;
  const {currentTheme} = useThemeHook()  ;
  const replayRenderedTextRef = useRef<JSX.Element[]>(replayTextRenderer({currentText , currentTheme}) as JSX.Element[]) ;
    return (
        <ReplayDataContext.Provider value={{ isRecordPanelOpen, setIsRecordPanelOpen, isRecordActive, setIsRecordActive  , replayRenderedTextRef}}>
            {children}
        </ReplayDataContext.Provider>
    )
}

export default ReplayDataContextProvider;