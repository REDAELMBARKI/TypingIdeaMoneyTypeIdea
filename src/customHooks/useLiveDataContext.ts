import { useContext } from "react";
import { CurrentLiveDataContext } from "../contexts/CurrentLiveDataContext";



const useLiveDataContext = () => {

const context = useContext(CurrentLiveDataContext);

if(!context) throw new Error("useLiveDataContext must be used within a CurrentLiveDataProvider");
return context;

}


export default useLiveDataContext;