import { createContext } from "react";

 type ReplayDataContextType ={
    isRecordPanelOpen: boolean 
    isRecordActive: boolean 

    setIsRecordActive: React.Dispatch<React.SetStateAction<boolean>>
    setIsRecordPanelOpen: React.Dispatch<React.SetStateAction<boolean>>

}
export const ReplayDataContext = createContext<ReplayDataContextType | undefined>(undefined) ;