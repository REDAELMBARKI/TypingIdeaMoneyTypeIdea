import { createContext, type JSX } from "react";

 type ReplayDataContextType ={
    isRecordPanelOpen: boolean 
    isRecordActive: boolean 

    setIsRecordActive: React.Dispatch<React.SetStateAction<boolean>>
    setIsRecordPanelOpen: React.Dispatch<React.SetStateAction<boolean>>
    replayRenderedTextRef: React.RefObject<JSX.Element[]>

}
export const ReplayDataContext = createContext<ReplayDataContextType | undefined>(undefined) ;