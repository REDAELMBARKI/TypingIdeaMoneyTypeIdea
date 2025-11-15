import { useContext } from "react";
import { ReplayDataContext } from "../contexts/ReplayDataContext";


const useReplayDataContext = () => {
    const context = useContext(ReplayDataContext);
    if (!context) {
        throw new Error("useReplayDataContext must be used within a ReplayDataContextProvider");
    }


    return context;
    
}


export default useReplayDataContext;