import { useState } from "react";
import { ReplayDataContext } from "../contexts/ReplayDataContext";


const ReplayDataContextProvider: React.FC<{children: React.ReactNode}> = ({children}) => {

     // recorded session typing modal
  const [isRecordPanelOpen,setIsRecordPanelOpen] = useState<boolean>(false);
  const [isRecordActive,setIsRecordActive] =  useState<boolean>(false);

    return (
        <ReplayDataContext.Provider value={{ isRecordPanelOpen, setIsRecordPanelOpen, isRecordActive, setIsRecordActive  }}>
            {children}
        </ReplayDataContext.Provider>
    )
}

export default ReplayDataContextProvider;